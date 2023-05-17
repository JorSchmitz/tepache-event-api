import { PrismaClient } from '@prisma/client'
import { EventRepository } from '../../infrastructure/repositories/EventRepository'
import { EventFactory } from '../../infrastructure/factories/EventFactory'
import { Event } from '../../model/event/Event'

type updateEventInput = {
  prisma: PrismaClient
  id: string
  title?: string | null
  description?: string | null
  start_time?: Date | null
  end_time?: Date | null
  location?: string | null
}

export const updateEvent = async ({
  prisma,
  id,
  title,
  description,
  start_time,
  end_time,
  location,
}: updateEventInput): Promise<Event | null> => {
  const eventRepository = new EventRepository(prisma)
  const event = await eventRepository.getEventById(id)

  const updateE = EventFactory.createFromMinimalInputs({
    title,
    description,
    start_time,
    end_time,
    location,
  })

  if (!event) throw new Error('Event not found')

  const eventUpdated = await eventRepository.update(id, updateE)

  return eventUpdated
}
