import {Location} from './location';

export class Flag {
  constructor(
    public flagType: 'road' | 'school',
    public location?: Location
    ) { }
}
