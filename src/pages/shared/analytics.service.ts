import { Injectable                                } from '@angular/core';
import { Observable                                } from 'rxjs';
import { Http, RequestOptionsArgs, URLSearchParams } from '@angular/http';

import { ENV } from '../../environments/environment';


@Injectable()
export class AnalyticsService {

  constructor(private http: Http) { }

}
