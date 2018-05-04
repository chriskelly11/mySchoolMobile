import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Title             } from '@angular/platform-browser';
import { UserService            } from '../shared/user/user.service';
import { SchoolService          } from '../shared/school.service';
import { RecommendationsService } from '../shared/recommendations.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
	styleUrls: ['./home.scss']
})
export class HomePage implements OnInit{
	user:				any;
	userSchool: any;
	recommendations: {newStudents: any[]};

  constructor(public navCtrl: NavController) {
		private title:            Title,
    private userService:      UserService,
    private schoolService:    SchoolService,
    private recsService:      RecommendationsService
  ) {
    this.recommendations = {
      newStudents: []
    };
  }

	ngOnInit() {
    this.title.setTitle('mySchool - Home');

    this.userService.getUser().subscribe(user => {
      this.user = user;

      this.schoolService.getSchool(user.school_id).subscribe(school => {
        this.userSchool = school;
      });
      this.getNewStudents(3);
    });
  }

  getNewStudents(amount: number): void {
    this.recsService.getNewStudents(this.user.school_id, amount).subscribe(students => {
      if (students) this.recommendations.newStudents = students;
    })
  }

}
