export class Location {
  constructor(
    public coords: LatLng,
    public name: string
    ) { }
}

export class LatLng {
  constructor(
    public lat: number,
    public lng: number
    ) { }
}
