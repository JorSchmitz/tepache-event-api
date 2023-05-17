import { iSnapshot } from '../../infrastructure/iSnapshot'

export type EventSnapshot = iSnapshot & {
  title: string
  description?: string | null
  start_time: Date
  end_time: Date
  location?: string | null
}
