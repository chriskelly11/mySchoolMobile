//import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { NgForm            } from '@angular/forms';
//import { Router            } from '@angular/router';
import { Title             } from '@angular/platform-browser';
//import { NgProgress        } from 'ngx-progressbar';

//import { AuthService } from '../shared/auth.service';
//import { UserService } from '../shared/user/user.service';

//import { SCHOOL_YEARS } from '../shared/utils';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
 // styleUrls: ['./login.scss']
})
export class LoginPage {
  loginErr:        boolean = false;
  loginErrMsg:     string  = '';
  signupErr:       boolean = false;
  signupErrMsg:    string  = '';
  creatingAccount: boolean = false;
  schoolYears:     string[];

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
//		private router:      Router,
    	private title:       Title,
//    	private progress:    NgProgress,
//    	private authService: AuthService,
//    	private userService: UserService
) {
//		this.schoolYears = SCHOOL_YEARS;
  }

  ngOnInit() {
    this.title.setTitle('mySchool - Login');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
/**
   * Validates login form and sends credentials to authService.login()
   * @param {NgForm} form - login form
   **/
/*
  login(form: NgForm): void {
    const email = form.value.email;
    const password = form.value.password;

    this.progress.start();
    this.authService.login(email, password)
      .subscribe(
        (user)  => {
          this.userService.setUser(user);
          this.authService.loggedIn.next(true);
          this.router.navigate(['/home']);
        },
        (err)  => {
          this.progress.done()
          this.loginErr = true;
          this.loginErrMsg = err;

          setTimeout(() => {
            this.loginErr = false;
            this.loginErrMsg = '';
          }, 2000);
        },
        () => this.progress.done());
  }

 /**
   * Validates new account form and sends email to authService.signup()
   * @param {NgForm} form - new accountform
  signup(form: NgForm): void {
    const accountInfo: any = {...form.value};

    this.progress.start();
    this.authService.signup(accountInfo)
      .subscribe(
        (user)  => {
          this.login(form);
        },
        (err)  => {
          this.progress.done();
          this.signupErr = true;
          this.signupErrMsg = err;

          setTimeout(() => {
            this.signupErr = false;
            this.signupErrMsg = '';
          }, 2000);
        },
        () => this.progress.done());
  }

   **/
}
