import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDetailsIntf } from 'src/app/interfaces/user-details-intf';
import { DatabaseService } from 'src/app/services/database.service';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent implements OnInit {
  loginFormGroup: FormGroup;

  constructor(
    private databaseService: DatabaseService,
    private helperService: HelperService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  private initializeLoginForm() {
    this.loginFormGroup = new FormGroup({
      name: new FormControl("",[
        Validators.required
      ]),
      email: new FormControl("", [
        Validators.required
      ]),
      password: new FormControl("", [
        Validators.required
      ])
    });
  }

  submitForm() {
    this.databaseService.setUserDetails({
      email: this.loginFormGroup.controls.email.value,
      name: this.loginFormGroup.controls.name.value,
      password: this.loginFormGroup.controls.password.value
    });

    if(!this.helperService.getRedirectUrl){
      this.router.navigateByUrl("");
    }
    else {
      this.helperService.performRedirectIfAny();
    }
  }
}
