import { v4 } from 'uuid'
import { Event } from '../../model/event/Event'
import { Event as PrismaEvent } from '@prisma/client'

export class EventFactory {
  static createFromPrisma(data: PrismaEvent): Event {
    return new Event({
      id: data.id,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      title: data.title,
      description: data.description,
      start_time: data.start_time,
      end_time: data.end_time,
      location: data.location,
    })
  }

  static createFromMinimalInputs(data: {
    title: string
    description?: string | null
    start_time: Date
    end_time: Date
    location?: string | null
  }): Event {
    return new Event({
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      title: data.title,
      description: data.description,
      start_time: data.start_time,
      end_time: data.end_time,
      location: data.location,
    })
  }
}
