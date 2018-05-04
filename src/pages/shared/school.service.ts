import { Injectable                           } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Http, URLSearchParams                } from '@angular/http';

import { ENV } from '../../environments/environment';


@Injectable()
export class SchoolService {

  constructor(private http: Http) { }

  getSchool(schoolId: number): Observable<any> {
    return this.http.get(ENV.API_URL + `schools/${schoolId}`)
      .map(res => {
        return res.json().data;
      })
      .catch(err => {
        return Observable.throw(err.json().message || 'unable to retrieve school');
      });
  }

}
