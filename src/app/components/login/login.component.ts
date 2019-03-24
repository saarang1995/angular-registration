import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
import { UserDetailsIntf } from 'src/app/interfaces/user-details-intf';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  userDetails: UserDetailsIntf;
  error: string;
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
      email: new FormControl("", [
        Validators.required
      ]),
      password: new FormControl("", [
        Validators.required
      ])
    });
  }

  submitForm() {
    const response = this.databaseService.isExistingUser({
      email: this.loginFormGroup.controls.email.value,
      password: this.loginFormGroup.controls.password.value
    });

    if(response.status == "Authorized"){
      if (!this.helperService.getRedirectUrl) {
        this.router.navigateByUrl("");
      }
      else {
        this.helperService.performRedirectIfAny();
      }
    }
    else {
      this.error = response.status;
    }   
  }
}
