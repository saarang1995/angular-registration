import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { DatabaseService } from 'src/app/services/database.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

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
    private router: Router
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
    this.databaseService.setUserDetails({
      email: this.signUpFormGroup.controls.email.value,
      password: this.signUpFormGroup.controls.password.value
    });

    if (!this.helperService.getRedirectUrl) {
      this.router.navigateByUrl("");
    }
    else {
      this.helperService.performRedirectIfAny();
    }
  }
}
