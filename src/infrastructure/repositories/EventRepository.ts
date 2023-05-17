import { iRepository } from '../iRepository'
import { Event } from '../../model/event/Event'
import { EventFactory } from '../factories/EventFactory'

export class EventRepository {
  private readonly client: iRepository

  constructor(client: iRepository) {
    this.client = client
  }

  async getEvents(): Promise<Event[]> {
    const events = await this.client.event.findMany()
    return events.map((event) => EventFactory.createFromPrisma(event))
  }

  async create(event: Event): Promise<Event> {
    const eventCreated = await this.client.event.create({
      data: {
        title: event.snapshot.title,
        description: event.snapshot.description,
        start_time: event.snapshot.start_time,
        end_time: event.snapshot.end_time,
        location: event.snapshot.location,
      },
    })
    return EventFactory.createFromPrisma(eventCreated)
  }
}
