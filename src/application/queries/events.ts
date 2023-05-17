import { PrismaClient } from '@prisma/client'
import { Event } from '../../model/event/Event'
import { EventRepository } from '../../infrastructure/repositories/EventRepository'

type BaseInput = {
  prisma: PrismaClient
}

type GetByIdInput = {
  prisma: PrismaClient
  id: string
}

export const events = async ({ prisma }: BaseInput): Promise<Event[]> => {
  const eventRepository = new EventRepository(prisma)
  const events = await eventRepository.getEvents()
  return events
}

export const event = async ({
  prisma,
  id,
}: GetByIdInput): Promise<Event | null> => {
  const eventRepository = new EventRepository(prisma)
  const event = await eventRepository.getEventById(id)
  return event
}
