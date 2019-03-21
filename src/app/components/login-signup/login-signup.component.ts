import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent implements OnInit {
  loginFormGroup: FormGroup;
  constructor() { }

  
 

  ngOnInit(): void {
    this.initialiseLoginForm();
  }

  private initialiseLoginForm() {
    this.loginFormGroup = new FormGroup({
      emailFormControl: new FormControl("",[
        Validators.required
      ]),
      passwordFormControl: new FormControl("",[
        Validators.required
      ])
    });
  }
}
