import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/profile/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: [ './user-login.component.scss' ]
})
export class UserLoginComponent implements OnInit {

  public loginForm: FormGroup;
  public errorMessage: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [ '', [ Validators.required ] ],
      password: [ '', [ Validators.required ] ]
    });
  }

  validateUser() {
    const credentials = this.loginForm.getRawValue();
    this.userService.getUser(credentials.username)
      .then(user => {
        if (!user) {
          this.errorMessage = 'Username is invalid!';
        } else if (user && user.password !== credentials.password) {
          this.errorMessage = 'Password is invalid!';
        } else {
          this.errorMessage = '';
          this.userService.setActiveUser(user.username);
          this.router.navigate([ '/products' ]);
        }
      }).catch(err => {
        console.log(err);
      });
  }

}
