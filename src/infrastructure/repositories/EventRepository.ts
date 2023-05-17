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

  async getEventById(id: string): Promise<Event | null> {
    const event = await this.client.event.findFirst({
      where: { id: id },
    })
    if (!event) return null
    return EventFactory.createFromPrisma(event)
  }

  async update(id: string, event: Event): Promise<Event | null> {
    const eventUpdated = await this.client.event.update({
      where: { id: id },
      data: {
        title: event.snapshot.title,
        description: event.snapshot.description,
        start_time: event.snapshot.start_time,
        end_time: event.snapshot.end_time,
        location: event.snapshot.location,
      },
    })
    return EventFactory.createFromPrisma(eventUpdated)
  }
}
