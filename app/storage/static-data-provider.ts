import {Injectable} from 'angular2/core'
import {StaticData} from '../models/static-data'
import {Http, Response} from 'angular2/http'
import {Observable}     from 'rxjs/Observable'
import {Config} from '../config/config'

@Injectable()
export class StaticDataProvider{
     constructor(
        private http: Http,
        private config: Config
    ) { }

    get(): Observable<StaticData> {
        return this.http
            .get(this.config.staticDataPath)
            .map(res => <StaticData>res.json())
            .catch(this.handleError)
    }

    private handleError(error: Response) {
        console.log(error)
        return Observable.throw(error.json().error || 'Server error');
    }
}
