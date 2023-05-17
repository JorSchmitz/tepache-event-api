import { PrismaClient } from '@prisma/client'
import { Event } from '../../model/event/Event'
import { EventRepository } from '../../infrastructure/repositories/EventRepository'

type BaseInput = {
  prisma: PrismaClient
}

export const events = async ({ prisma }: BaseInput): Promise<Event[]> => {
  const eventRepository = new EventRepository(prisma)
  const events = await eventRepository.getEvents()
  return events
}
