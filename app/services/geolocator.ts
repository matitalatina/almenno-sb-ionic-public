import {NamedGroup} from '../models/named-group';
import {Office} from '../models/office';
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Config} from '../config/config';
import {Location, LatLng} from '../models/location';
import {Geolocation} from 'ionic-native';
import {Observable, Observer} from 'rxjs';
import * as _ from 'lodash';

export interface IGeolocator {
  locateMe(): Observable<Location>
  searchLocation(location: String): Observable<Location>
}

@Injectable()
export class Geolocator implements IGeolocator {
  locateMe(): Observable<Location> {
    return Observable.fromPromise(
      Geolocation.getCurrentPosition().then((resp) => {
        return new Location(new LatLng(resp.coords.latitude, resp.coords.longitude), '');
      }));
  }

  searchLocation(location: string): Observable<Location> {
    return Observable.create((observer: Observer<Location>) => {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: location }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const geom = results[0].geometry;
          const latLng = new LatLng(geom.location.lat(), geom.location.lng());
          const locationFound = new Location(latLng, location);
          observer.next(locationFound);
        } else {
          observer.error('Geocode was not successful for the following reason: ' + status);
        }
      });
    });
  }
}
