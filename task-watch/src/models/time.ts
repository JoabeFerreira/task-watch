export class Time{
    seconds = 0
    minutes = 0
    hours = 0

    addSeconds(secondsToAdd: number){
        const secondsAdded = this.seconds + secondsToAdd
        const secondsPassed = secondsAdded - 60
        if(secondsPassed < 0){
            this.seconds = secondsAdded 
        }else if(secondsPassed === 0){
            this.seconds = 0
            this.addMinutes(1)
        }else{
            this.seconds = 0
        }
    }

    addMinutes(minutesToAdd: number): void{

    }
    
    addHours(minutesToAdd: number): void{

    }

    getTotalSeconds(): number{
        return 0
    }

    display(): string {
        return `${this.hours}:${this.minutes}:${this.seconds}`
    }
}