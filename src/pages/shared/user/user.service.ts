import { Injectable                           } from '@angular/core';
import { Http, URLSearchParams                } from '@angular/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { ENV       } from '../../../environments/environment';
import { UserModel } from '../user/user.model';
import { Course    } from '../models/course.model';

@Injectable()
export class UserService {
  public userModel: Subject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http:   Http,
    private db:     AngularFireDatabase,
  ) { }

  getUser(): Subject<any> {
    return this.userModel;
  }

  setUser(user: any): void {
    this.userModel.next(new UserModel(user));
  }
 	getUsers(
  	schoolId:      number,
    userType:      string,
    pageIndex:     number = 0,
    pageSize:      number = 30,
    name:          string = '',
    major:         string = '',
    minor:         string = '',
    concentration: string = '',
    schoolYear:    string = ''
  ): Observable<any> {
    if (!schoolId || !userType) return;

    const params = {
      school_id:     schoolId,
      page_index:    pageIndex,
      page_size:     pageSize,
      user_type:     userType,
      name:          name,
      major:         major,
      minor:         minor,
      concentration: concentration,
      school_year:   schoolYear
    };

    return this.http.get(ENV.API_URL + 'users', {params: params})
      .map(res => {
        return res.json().data || {};
      })
      .catch(err => {
        return Observable.throw(err.json().message || 'no students found');
      });
  }

 getUserById(userId: number, schoolId: number): Observable<any> {
    const params = { school_id: schoolId };

    return this.http.get(ENV.API_URL + `users/${userId}`, {params: params})
      .map(res => {
        return res.json().data || {};
      })
      .catch(err => {
        return Observable.throw(err.json().message || 'no students found');
      });
  }

  updateAccount(userId: number, accountInfo: any): Observable<any> {
    const body = {
      first_name:    accountInfo.firstName,
      last_name:     accountInfo.lastName,
      gender:        accountInfo.gender,
      birthdate:     accountInfo.birthdate,
      major1:        accountInfo.major1,
      major2:        accountInfo.major2,
      minor:         accountInfo.minor,
      concentration: accountInfo.concentration,
      school_year:   accountInfo.schoolYear,
      phone_number:  accountInfo.phoneNumber,
      bio:           accountInfo.bio,
      user_type:     accountInfo.userType,
      study_group:   accountInfo.studyGroup
    };

    return this.http.patch(ENV.API_URL + `users/${userId}/update_account`, body)
      .map(res => {
        return res.json().data;
      })
      .catch(err => {
        return Observable.throw(err.json().message || 'unable to update account');
      });
  }

  updateAvatar(userId: number, image: File): Observable<any> {
    let formData = new FormData();
    formData.append('user_id', userId.toString());
    formData.append('image',   image);

    return this.http.post(ENV.API_URL + `users/${userId}/avatar`, formData)
      .map(res => {
        return res.json().data;
      })
      .catch(err => {
        return Observable.throw(err.json().message || 'unable to update avatar');
      });
  }

  updatePassword(
    userId:          number,
    currentPassword: string,
    newPassword:     string
  ): Observable<any> {
    const body = {
      current_password: currentPassword,
      new_password:     newPassword
    };

    return this.http.put(ENV.API_URL + `users/${userId}/update_password`, body)
      .map(res => {
        return res.json().message;
      })
      .catch(err => {
        return Observable.throw(err.json().message || 'unable to update password');
      });
  }

  updateCourses(userId: number, courses: Course[]): Observable<any> {
    const body = { courses: courses };

    return this.http.post(ENV.API_URL + `users/${userId}/courses`, body)
      .map(res => {
        return res.json().data || {};
      })
      .catch(err => {
        return Observable.throw(err.json().message || 'unable to update avatar');
      });
  }

}



