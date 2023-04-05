import { Time } from './time'

export class Task {
  description: string = ''
  timeElapsed: Time
  timePlanned: Time

  constructor() {
    this.timeElapsed = new Time(0, 0, 0)
    this.timePlanned = new Time(0, 0, 0)
  }
}