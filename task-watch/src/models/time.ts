type Period = 'seconds' | 'minutes' | 'hours'

export class Time {
  seconds = 0
  minutes = 0
  hours = 0

  public constructor(hours: number, minutes: number, seconds: number) {
    this.hours = hours
    this.minutes = minutes
    this.seconds = seconds
  }


  // setSeconds(seconds: number): Time {
  //   this.seconds = seconds
  //   return this
  // }

  // setMinutes(minutes: number): Time {
  //   this.minutes = minutes
  //   return this
  // }

  // setHours(hours: number): Time {
  //   this.hours = hours
  //   return this
  // }

  addSeconds(secondsToAdd: number): Time {
    const secondsAdded = this.seconds + secondsToAdd
    const secondsPassed = secondsAdded - 60
    if (secondsPassed < 0) {
      this.seconds = secondsAdded
    } else if (secondsPassed === 0) {
      this.seconds = 0
      this.addMinutes(1)
    } else {
      this.seconds = 0
    }
    return this
  }

  addMinutes(minutesToAdd: number): Time {
    this.addPeriod(minutesToAdd, 'minutes', (value) => this.addPeriod(value, 'hours', () => { }))
    return this
  }

  private addPeriod(minutesToAdd: number, period: Period, addPeriodFunction: (periodValue: number) => void) {
    const secondsAdded = this[period] + minutesToAdd
    const secondsPassed = secondsAdded - 60
    if (secondsPassed < 0) {
      this[period] = secondsAdded
    } else if (secondsPassed === 0) {
      this[period] = 0
      addPeriodFunction(1)
    } else {
      this[period] = 0
    }
  }

  addHours(minutesToAdd: number): void {

  }

  getTotalSeconds(): number {
    return 0
  }

  display(): string {
    return `${this.padStart(this.hours)}:${this.padStart(this.minutes)}:${this.padStart(this.seconds)}`
  }

  private padStart(period: number): string {
    return period.toString().padStart(2, '0')
  }
}