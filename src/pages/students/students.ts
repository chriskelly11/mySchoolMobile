import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserService     } from '../shared/user/user.service';
import { StudentsService } from '../shared/students.service';

/**
 * Generated class for the StudentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-students',
  templateUrl: 'students.html',
	styleUrls: ['./students.scss']
})
export class StudentsPage {
	@ViewChild('searchName') searchName: ElementRef;
	@ViewChild('paginator') paginator:	 any;

  user:       any;
  schoolInfo: any[];
  students: {
    all:       any[],
    total:     number,
    searching: boolean
  };
  studentsFilter: StudentsFilter;

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
	  private userService:     UserService,
    private studentsService: StudentsService
  ) {
    this.students = {
      all:       [],
      total:     0,
      searching: false
    };

    this.studentsFilter = {
      name:           null,
      majors:         [],
      minors:         [],
      concentrations: []
    };
  }

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.getStudents(user.school_id, user.type);
      this.getSchoolInfo(user.school_id);
    });
  }

  modifyStudentsFilter(key: string, val: any): void {
    const index: number = this.studentsFilter[key].indexOf(val);

    (index === -1) ?
      this.studentsFilter[key].push(val) :
      this.studentsFilter[key].splice(index, 1);

    this.getStudents(
      this.user.school_id,
      this.user.type,
      0,
      this.paginator.pageSize,
      this.searchName.nativeElement.value,
      this.studentsFilter.majors.join(','),
      this.studentsFilter.minors.join(','),
      this.studentsFilter.concentrations.join(',')
    );
  }

  onSearchStudentsInput(): void {
    const name: string = this.searchName.nativeElement.value;
    const pageSize: number = this.paginator.pageSize;

    if (this.students.searching) {
      return;
    }
    else if (name === '') {
      this.getStudents(this.user.school_id, this.user.type, 0, pageSize);
      return;
    }

    this.students.searching = true;

    setTimeout(() => {
      this.getStudents(this.user.school_id, this.user.type, 0, pageSize, name);
      this.students.searching = false;
    }, 250);
  }

  getStudents(
    schoolId:       number,
    userType:       string,
    pageIndex:      number = 0,
    pageSize:       number = 30,
    name?:          string,
   major?:         string,
    minor?:         string,
    concentration?: string,
    schoolYear?:    string
  ): void {
    this.students.searching = true;

    this.userService.getUsers(
      schoolId,
      userType,
      pageIndex,
      pageSize,
      name,
      major,
      minor,
      concentration,
      schoolYear
    )
    .subscribe(
      (res) => {
        if (res) {
          this.students.all = res.students;
          this.students.total = res.total_students;
        }

        this.students.searching = false;
      },
      (err) => this.students.searching = false
    );
  }

  getSchoolInfo(schoolId: number): void {
    this.studentsService.getSchoolInfo(schoolId)
      .subscribe(schoolInfo => this.schoolInfo = schoolInfo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentsPage');
  }

}

interface StudentsFilter {
  name:           string;
  majors:         string[];
  minors:         string[];
  concentrations: string[];
}
