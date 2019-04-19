import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { DatabaseService } from 'src/app/services/database.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpFormGroup: FormGroup;

  constructor(
    private databaseService: DatabaseService,
    private helperService: HelperService,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.initializeSignUpForm();
  }

  private initializeSignUpForm() {
    this.signUpFormGroup = new FormGroup({
      name: new FormControl("", [
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
    this.apiService.signUp({
      name: this.signUpFormGroup.controls.name.value,
      email: this.signUpFormGroup.controls.email.value,
      password: this.signUpFormGroup.controls.password.value
    }).subscribe((response) => {
      console.log(response);
    });
    // this.databaseService.setUserDetails({
    //   email: this.signUpFormGroup.controls.email.value,
    //   password: this.signUpFormGroup.controls.password.value
    // });

    if (!!this.helperService.getRedirectUrl) {
      this.router.navigateByUrl("");
    }
    else {
      this.helperService.performRedirectIfAny();
    }
  }
}
