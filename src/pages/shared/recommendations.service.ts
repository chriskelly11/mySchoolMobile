import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http       } from '@angular/http';

import { ENV } from '../../environments/environment';


@Injectable()
export class RecommendationsService {

  constructor(private http: Http) { }

  getNewStudents(schoolId: number, amount: number = 3): Observable<any> {
    const params = { amount: amount };

    return this.http.get(ENV.API_URL + `recommendations/${schoolId}/new_students`, {
      params: params
    })
    .map(res => {
      return res.json().data || [];
    })
    .catch(err => {
      return Observable.throw(err.json().message || 'unable to get students');
    });
  }

}
