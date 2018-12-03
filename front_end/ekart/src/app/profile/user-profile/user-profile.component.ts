import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [ './user-profile.component.scss' ]
})
export class UserProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public userInfo = { username: '', password: '', email: '', mobileNumber: null };
  public activeUser: string;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.activeUser = this.userService.getActiveUser();
    this.profileForm = this.createForm();
    this.userService.getUser(this.activeUser).then(response => {
      this.userInfo = response;
      this.setValues();
    });
  }

  createForm() {
    const group = this.formBuilder.group({
      username: [ '', [ Validators.required ] ],
      password: [ '', [ Validators.required, Validators.minLength(5) ] ],
      email: [ '', [ Validators.required ] ],
      mobileNumber: [ '', [
        Validators.required,
        Validators.min(1000000000),
        Validators.max(9999999999)
      ] ],
    });
    return group;
  }

  setValues() {
    this.profileForm.get('username').setValue(this.userInfo.username);
    this.profileForm.get('password').setValue(this.userInfo.password);
    this.profileForm.get('email').setValue(this.userInfo.email);
    this.profileForm.get('mobileNumber').setValue(this.userInfo.mobileNumber);
  }


  updateUser() {
    const user = this.profileForm.getRawValue();
    this.userInfo = user;
    this.userService.update(user);
  }

  reset() {
    this.profileForm.get('username').setValue(this.userInfo.username);
    this.profileForm.get('password').setValue(this.userInfo.password);
    this.profileForm.get('email').setValue(this.userInfo.email);
    this.profileForm.get('mobileNumber').setValue(this.userInfo.mobileNumber);
  }
}
