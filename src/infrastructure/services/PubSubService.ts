import { GooglePubSub } from '@axelspringer/graphql-google-pubsub';
import { PubSub } from '@google-cloud/pubsub';
import logger from '../../infrastructure/Logger';
import { getStage } from '../utils';

type SubscriptionMessage = {
  data: any; // eslint-disable-line
  mutationType?: string;
  updatedFiels?: string[];
}

type ConsumerMessage = {
  id: string
  data: any // eslint-disable-line
  received: number
}

type MessageHandler = (message: ConsumerMessage, att: any) => void; // eslint-disable-line

export class PubSubService {
  private projectId: string;
  private pubSubClient: PubSub;
  private googlePubSubClient: GooglePubSub;

  constructor() {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) throw Error('No google credentials for google pub/sub');
    this.projectId = process.env.PROJECT_ID || 'inplace-dev';
    this.pubSubClient = new PubSub();
    this.googlePubSubClient = new GooglePubSub();
  }
  async createTopic(topic: string, opts?: { createSubscription?: true, subscriptionName?: string }): Promise<void> {
    const topicWithPrefix = this.prefixTopic(topic);
    const completeTopicName = `projects/${this.projectId}/topics/${topicWithPrefix}`;
    try {
      await this.pubSubClient.createTopic(completeTopicName);
      logger.info(`The topic ${completeTopicName} was created successfully.`);
      if (opts?.createSubscription) this.createSubscription(topic, topic);
    } catch (e) {
      logger.info(`The topic ${completeTopicName} was not created.`);
    }
  }
  async publish(name: string, event: any): Promise<void> { // eslint-disable-line
    try {
      const topic = event.constructName();
      const messageAtts = event.getAttributes() || {};
      const atts = { eventName: name, ...messageAtts };
      const publishedEvent = await this.googlePubSubClient.publish(topic, event, atts);
      logger.info(`Event ${publishedEvent} published. Topic ${topic}.`);
    } catch(e) {
      logger.error('Error', e);
    }
  }
  static messageToJson(message: any): SubscriptionMessage { // eslint-disable-line
    const msg: SubscriptionMessage = { data: {} };
    if (!message.data) return msg;
    const val = JSON.parse(Buffer.from(message.data, 'base64').toString());
    msg.data = val.data;
    msg.mutationType = val.mutationType || 'CREATED';
    msg.updatedFiels = val.updatedFiels || [];
    return msg;
  }
  static getFormatedTopicName(topic: string): string {
    return `${getStage()}-${topic}`;
  }
  async subscriptionExists(topic: string): Promise<boolean> {
    const topicWithPrefix = this.prefixTopic(topic);
    try {
      const [metadata] = await this.pubSubClient.subscription(topicWithPrefix).getMetadata();
      return !!metadata;
    } catch(e) {
      return false;
    }
  }
  private prefixTopic(topic: string): string {
    return `${getStage()}-${topic}`;
  }
  private prefixSubscription(subscriptionName: string): string {
    return `${getStage()}-${subscriptionName}`;
  }
  async createSubscription(topic: string, subscriptionName: string): Promise<void> {
    const topicWithPrefix = this.prefixTopic(topic);
    const subscriptionNameWithPrefix = this.prefixSubscription(subscriptionName);
    const exists = await this.subscriptionExists(subscriptionNameWithPrefix);
    if (exists) {
      logger.info(`Subscription ${subscriptionNameWithPrefix} to topic ${topicWithPrefix} already exists`);
      return;
    }
    try {
      await this.pubSubClient.topic(topicWithPrefix).createSubscription(subscriptionNameWithPrefix, {
        deadLetterPolicy: {
          deadLetterTopic: `projects/${this.projectId}/topics/${topicWithPrefix}`,
          maxDeliveryAttempts: 10,
        },
      });
      logger.info(`Subscription ${subscriptionNameWithPrefix} to topic ${topicWithPrefix} was created successfully`);
    } catch(e) {
      if (e.code === 5 || e.code === 3) {
        await this.createTopic(`${topic}-deadletter`);
        await this.createTopic(topic, { createSubscription: true });
      } else {
        logger.error('Error creating subscription', e.message);
      }
    }
  }
  async subscribeToTopic(topic: string, handler: MessageHandler) : Promise<void> {
    const topicWithPrefix = this.prefixTopic(topic);
    const subscriberOptions = {
      flowControl: {
        maxMessages: 5,
      },
    };
    const subscription = this.pubSubClient.subscription(
      topicWithPrefix,
      subscriberOptions
    );
    const mainHandler = async (message: any): Promise<void>=> { // eslint-disable-line
      try {
        logger.info(`Message recived: ${message.id || 'no-id'}`);
        let val = message.data ? Buffer.from(message.data, 'base64').toString() : {};
        if (typeof val === 'string') val = JSON.parse(val);
        const att = message.attributes;
        message.ack();
        await handler({
          data: val,
          id: message.id,
          received: message.received
        }, att);
      } catch(e) {
        logger.error(`Error: ${e.message}`);
        message.nack();
      }
    };
    
    subscription.on('message', mainHandler);
    subscription.on('error', error => {
      logger.error(`Error subscribing to ${topicWithPrefix}. ${error}`);
    });
    logger.info(`Subscribed to topic ${topicWithPrefix}.`);
  }
}
