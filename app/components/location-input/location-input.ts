import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import {Geolocator} from '../../services/geolocator';
import {Location} from '../../models/location';
import {LocationView} from '../location-view/location-view';

@Component({
  selector: 'asb-location-input',
  templateUrl: 'build/components/location-input/location-input.html',
  directives: [IONIC_DIRECTIVES, ANGULAR2_GOOGLE_MAPS_DIRECTIVES, LocationView]
})
export class LocationInput {
  @Input() location: Location;
  @Output() locationChange: EventEmitter<Location> = new EventEmitter<Location>();
  ui = {
    loading: false
  };

  constructor(
    private geolocator: Geolocator
    ) {
  }

  locateMe() {
    this.ui.loading = true;
    this.geolocator
      .locateMe()
      .subscribe(l => {
      this.updateLocation(l)
      this.ui.loading = false;
    });
  }

  onMarkerDrag(location: Location) {
    this.updateLocation(location);
  }

  onLocationSearch(address: string) {
    this.ui.loading = true;
    this.geolocator
      .searchLocation(address)
      .subscribe(l => {
      this.ui.loading = false;
      this.updateLocation(l)
    });
  }

  private updateLocation(location: Location) {
    console.log('INNER CHANGE')
    this.location = location;
    this.locationChange.emit(location);
  }
}
