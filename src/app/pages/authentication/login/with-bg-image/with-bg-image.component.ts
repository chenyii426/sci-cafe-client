import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService, AuthenticationService } from '../../../../services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-with-bg-image',
  templateUrl: './with-bg-image.component.html',
  styleUrls: ['./with-bg-image.component.css']
})
export class WithBgImageComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loginFail = false;
  inactive = false;
  returnUrl: string;
  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
  ) {
  }

  get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.logout();

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data['jwt']);
          if (data['jwt'] == 'inactive') {
            this.inactive = true;
            this.submitted = false;
            this.loginFail = false;
            console.log(data['jwt']);
          } else {
            // location.reload();
            this.loginFail = false;
            this.inactive = false;
            this.router.navigate(['/home']);
          }

        },
        error => {
          this.submitted = false;
          this.loginFail = true;
          this.inactive = false;
          console.log("login failed");
          this.alertService.error(error);
        });
  }
}
