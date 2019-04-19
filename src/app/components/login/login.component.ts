import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
import { UserDetailsIntf } from 'src/app/interfaces/user-details-intf';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userDetails: UserDetailsIntf;
  error: string;
  constructor(
    private databaseService: DatabaseService,
    private helperService: HelperService,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  private initializeLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl("", [
        Validators.required,
      ])
    });
  }

  submitForm() {
    this.apiService.signIn({
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    }).subscribe((data: { success: boolean, token: string }) => {
      if (data.success) {
        this.databaseService.setAuthenticationToken(data.token);
        if (!this.helperService.getRedirectUrl()) {
          this.router.navigateByUrl("");
        }
        else {
          this.helperService.performRedirectIfAny();
        }
      }
      else {
        alert('incorrect credentials entered');
      }

    });
  }
}
