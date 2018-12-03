import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/profile/services/user.service';
import { Router } from '@angular/router';
import { MessagesComponent } from 'src/app/core/messages/messages.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: [ './user-registration.component.scss' ]
})
export class UserRegistrationComponent implements OnInit {

  public registrationForm: FormGroup;
  public errorMessage = '';
  public successMessage = '';

  constructor(private userService: UserService, private formBuilder: FormBuilder, public router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.registrationForm = this.createForm();
  }

  createForm() {
    const group = this.formBuilder.group({
      firstName: [ '', [ Validators.required ] ],
      lastName: [ '', [ Validators.required ] ],
      username: [ '', [ Validators.required ] ],
      password: [ '', [ Validators.required, Validators.minLength(5) ] ],
      confirmPassword: [ '', [ Validators.required, Validators.minLength(5) ] ],
      email: [ '', [ Validators.required ] ],
      mobileNumber: [ '', [
        Validators.required,
        Validators.min(1000000000),
        Validators.max(9999999999)
      ] ],
    });
    return group;
  }

  registerUser() {
    this.errorMessage = '';
    const newUser = this.registrationForm.getRawValue();
    if (newUser.password !== newUser.confirmPassword) {
      this.errorMessage = 'Password and Confirm Password do not match';
    } else {
      this.userService.getUser(newUser.username)
        .then(user => {
          if (user) {
            this.errorMessage = 'Username already exists. Please enter a different username';
          } else {
            this.userService.getUserByEmail(newUser.email)
              .then(userbyEmail => {
                if (userbyEmail) {
                  this.errorMessage = 'Email already exists. Please enter a different email address';
                  const dialogConfig = new MatDialogConfig();
                  dialogConfig.data = this.errorMessage;
                  let dialogRef = this.dialog.open(MessagesComponent, dialogConfig);
                  dialogRef.afterClosed().subscribe(
                    data => {
                    }
                  );
                } else {
                  this.errorMessage = '';
                  this.userService.create(newUser).then(response => {
                    if (response === 'success') {
                      this.successMessage = 'Congratulations! Welcome to Ekart!';
                      const dialogConfig = new MatDialogConfig();
                      dialogConfig.data = this.successMessage;
                      let dialogRef = this.dialog.open(MessagesComponent, dialogConfig);
                      dialogRef.afterClosed().subscribe(
                        data => {
                          this.router.navigate([ './user/login' ]);
                        }
                      );
                    }
                  });
                }
              });
          }
        });
    }
  }

}
