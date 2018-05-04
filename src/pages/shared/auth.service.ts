import { Injectable                  } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Http                        } from '@angular/http';

import { ENV } from '../../environments/environment';


@Injectable()
export class AuthService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http:   Http,
  ) { }

  /**
   * Signs student in
   * @param {string} schoolEmail - student's school email
   * @param {string} password - student's password
   * @return {Observable} any - http post
   **/
  signIn(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };

    return this.http.post(ENV.API_URL + 'login', body)
      .map(res => {
        //this.signInWithFirebase(email, password);
        // this.createFirebaseUser(email, password, res.json().data);
        return res.json().data;
      })
      .catch(err => {
        return Observable.throw(err.json().message || 'unable to login');
      });
  }

  /**
   * Creates new account
   * @param {string} schoolEmail - student's school email
   * @return {Observable} any - http post
   **/
 signUp(accountInfo: any): Observable<any> {
    const body = {
      email:            accountInfo.email,
      password:         accountInfo.password,
      password_confirm: accountInfo.passwordConfirm,
      first_name:       accountInfo.firstName,
      last_name:        accountInfo.lastName,
      major1:           accountInfo.major,
      school_year:      accountInfo.schoolYear,
      user_type:        'Student' // only user type allowed
    };

    return this.http.post(ENV.API_URL + 'signup', body)
      .map(res => {
        const user = res.json().data;
        //this.createFirebaseUser(accountInfo.email, accountInfo.password, user);

        return user;
      })
      .catch(err => {
        return Observable.throw(err.json().message || 'unable to sign up');
      });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }

}
