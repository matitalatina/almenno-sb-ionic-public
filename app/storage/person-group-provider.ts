import {NamedGroup} from '../models/named-group';
import {Person} from '../models/person';
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {Config} from '../config/config';
import {StaticDataProvider} from './static-data-provider';

@Injectable()
export class PersonGroupProvider {
  constructor(
    private staticDataProvider: StaticDataProvider
    ) { }

  get(id: string): Observable<NamedGroup<Person>> {
    return this
      .list()
      .map(groups => _.find(groups, g => g.id === id) || Observable.throw('Server error'))
  }

  list(): Observable<NamedGroup<Person>[]> {
    return this.staticDataProvider.get()
      .map(res => res.personGroups)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
