import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import {Location, LatLng} from '../../models/location';

@Component({
  selector: 'asb-location-view',
  templateUrl: 'build/components/location-view/location-view.html',
  directives: [IONIC_DIRECTIVES, ANGULAR2_GOOGLE_MAPS_DIRECTIVES]
})
export class LocationView {
  @Input() location: Location;
  @Input() markerDraggable: boolean;
  @Output() onMarkerDrag: EventEmitter<Location> = new EventEmitter<Location>();
  constructor() {
  }

  ngOnInit() {
  }

  markerDragEnd(coordsObj) {
    this.location.coords = coordsObj.coords;
    this.onMarkerDrag.emit(this.location);
  }
}
