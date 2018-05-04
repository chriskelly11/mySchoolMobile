import { Injectable     } from '@angular/core';
import { Http           } from '@angular/http';
import { Observable     } from 'rxjs';

import { ENV } from '../../environments/environment';
import { StudyGroupsFilter } from './models/study-group.model';


@Injectable()
export class StudyGroupsService {

  constructor(private http: Http) { }

  getStudyGroups(schoolId: number, filter: StudyGroupsFilter): Observable<any> {
    const params = {
      page_size:       filter.pageSize,
      page_index:      filter.pageIndex,
      meeting_on:      filter.meetingOn,
      meeting_at:      filter.meetingAt,
      professor:       filter.professor,
      course_code:     filter.courseCode.join(','),
      course_name:     filter.courseName.join(','),
      available_spots: filter.availableSpots
    };

    return this.http.get(ENV.API_URL + `schools/${schoolId}/study_groups`, {
      params: params
    })
    .map(res => {
      return res.json().data || [];
    })
    .catch(err => {
      return Observable.throw(err.json().message || 'unable to get study groups');
    });
  }

  getUserStudyGroups(userId: number): Observable<any> {
    return this.http.get(ENV.API_URL + `users/${userId}/study_groups`)
      .map(res => {
        return res.json().data || [];
      })
      .catch(err => {
        return Observable.throw(err.json().message || 'unable to get study groups');
      });
  }

  joinOrLeaveStudyGroup(
    studyGroupId: number,
    userId:       number,
    schoolId:     number,
    method:       string,
  ): Observable<any> {
    const body = {
      id:      studyGroupId,
      user_id: userId,
      method:  method
    };

    return this.http.patch(ENV.API_URL + `schools/${schoolId}/study_groups/${studyGroupId}`,
      body
    )
    .map(res => {
      return res.json().data || [];
    })
    .catch(err => {
      return Observable.throw(err.json().message || 'unable to get join groups');
    });
  }

  updateStudyGroup(userId: number, studyGroup: any): Observable<any> {
    const body = {
      id:          studyGroup.id,
      name:        studyGroup.name,
      members:     studyGroup.members,
      members_cap: studyGroup.membersCap,
      meeting_on:  studyGroup.meetingOn || null,
      meeting_at:  studyGroup.meetingAt || null,
      course:      studyGroup.course,
      professor:   studyGroup.professor || null,
      details:     studyGroup.details,
      is_open:     studyGroup.isOpen
    };

    return this.http.patch(ENV.API_URL + `users/${userId}/study_groups`,
      body
    )
    .map(res => {
      return res.json().data || [];
    })
    .catch(err => {
      return Observable.throw(err.json().message || 'unable to get join groups');
    });
  }

}
