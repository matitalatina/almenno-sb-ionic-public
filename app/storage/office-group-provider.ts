import {NamedGroup} from '../models/named-group';
import {Office} from '../models/office';
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {Config} from '../config/config';
import {StaticDataProvider} from './static-data-provider';
import * as _ from 'lodash';

@Injectable()
export class OfficeGroupProvider {
  constructor(
    private staticDataProvider: StaticDataProvider
    ) { }

  get(id: string): Observable<NamedGroup<Office>> {
    return this
      .list()
      .map(groups => _.find(groups, g => g.id === id) || Observable.throw('Server error'))
  }

  list(): Observable<NamedGroup<Office>[]> {
    return this.staticDataProvider.get()
      .map(res => res.officeGroups)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
