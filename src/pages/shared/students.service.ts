import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';

import { ENV } from '../../environments/environment';


@Injectable()
export class StudentsService {

  constructor(private http: Http) { }

  getSchoolInfo(schoolId: number): Observable<any> {
    return this.http.get(ENV.API_URL + `students/${schoolId}/describe`)
      .map(res => {
        return res.json().data || {};
      })
      .catch(err => {
        return Observable.throw(err.json().message);
      });
  }

}
