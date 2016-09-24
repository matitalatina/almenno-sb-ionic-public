import {DayHours} from './day-hours'

export class Office {
  constructor(
    public id: string,
    public name: string,
    public phone: string,
    public dayHours: DayHours[],
    public description?: string,
    public email?: string
    ) { }
}
