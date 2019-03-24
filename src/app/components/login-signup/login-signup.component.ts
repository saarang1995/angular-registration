import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDetailsIntf } from 'src/app/interfaces/user-details-intf';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent implements OnInit {
  loginFormGroup: FormGroup;

  constructor(
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  private initializeLoginForm() {
    this.loginFormGroup = new FormGroup({
      nameControl: new FormControl("",[
        Validators.required
      ]),
      emailControl: new FormControl("", [
        Validators.required
      ]),
      passwordControl: new FormControl("", [
        Validators.required
      ])
    });
  }

  submitForm() {
    this.databaseService.setUserDetails({
      email: this.loginFormGroup.controls.emailControl.value,
      name: this.loginFormGroup.controls.nameControl.value,
      password: this.loginFormGroup.controls.passwordControl.value
    });
  }
}
