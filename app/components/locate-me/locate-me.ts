import {Component, Output, EventEmitter, OnInit} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {Location, LatLng} from '../../models/location';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import {Geolocator} from '../../services/geolocator';

@Component({
  selector: 'asb-locate-me',
  templateUrl: 'build/components/locate-me/locate-me.html',
  directives: [IONIC_DIRECTIVES, ANGULAR2_GOOGLE_MAPS_DIRECTIVES] // makes all Ionic directives available to your component
})
export class LocateMe implements OnInit {
  @Output() onLocate: EventEmitter<Location> = new EventEmitter<Location>();
  constructor(private geolocator: Geolocator) {
  }

  myLocation: Location

  ngOnInit() {
    this.geolocator.locateMe().subscribe((location) => {
      this.myLocation = location;
      this.onLocate.emit(location)
    });
  }
}
