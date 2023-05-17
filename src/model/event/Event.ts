import { iEntity } from '../../infrastructure/iEntity'
import { EventSnapshot } from './EventSnapshot'

export class Event implements iEntity {
  private id: string
  private createdAt: Date
  private updatedAt: Date
  private title: string
  private description?: string | null
  private start_time: Date
  private end_time: Date
  private location?: string | null

  constructor(data: {
    id: string
    createdAt: Date
    updatedAt: Date
    title: string
    description?: string | null
    start_time: Date
    end_time: Date
    location?: string | null
  }) {
    this.id = data.id
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.title = data.title
    this.description = data.description
    this.start_time = data.start_time
    this.end_time = data.end_time
    this.location = data.location
  }

  get snapshot(): EventSnapshot {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      title: this.title,
      description: this.description,
      start_time: this.start_time,
      end_time: this.end_time,
      location: this.location,
    }
  }
}
