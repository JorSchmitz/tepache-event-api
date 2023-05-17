import { PrismaClient } from '@prisma/client'
import { EventRepository } from '../../infrastructure/repositories/EventRepository'
import { EventFactory } from '../../infrastructure/factories/EventFactory'
import { Event } from '../../model/event/Event'

type newEventInput = {
  prisma: PrismaClient
  title: string
  description?: string | null
  start_time: Date
  end_time: Date
  location?: string | null
}

export const createEvent = async ({
  prisma,
  title,
  description,
  start_time,
  end_time,
  location,
}: newEventInput): Promise<Event> => {
  const eventRepository = new EventRepository(prisma)

  const event = EventFactory.createFromMinimalInputs({
    title,
    description,
    start_time,
    end_time,
    location,
  })
  const eventCreated = await eventRepository.create(event)

  return eventCreated
}
