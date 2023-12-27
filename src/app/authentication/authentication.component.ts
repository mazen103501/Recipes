import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from "../store/app.reducer"
import * as AuthActions from "./store/auth.actions"
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit,OnDestroy {
  loading: boolean = false;
  inLoginMode: boolean = true;
  error: string = null;
  authForm: FormGroup;

  private storeSub :Subscription
  constructor(private authService: AuthService, private router: Router, private store:Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.initForm();
    this.storeSub = this.store.select("auth").subscribe(authData=>{
      // console.log(authData);
      this.loading = authData.loading;
      if(authData.authFail){
        this.error = authData.authFail;
      }
      if(authData.user){
        this.router.navigate(["/recipes"])
      }
    })
  }
  initForm() {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }
  onSubmit() {
    this.loading = true;
    let email = this.authForm.value.email;
    let password = this.authForm.value.password;
    // console.log(this.authForm.value);
    if (this.inLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({email,password}))
      // this.authService.login(email, password).subscribe(
      //   (res) => {
      //     this.loading = false;
      //     // console.log('redirected');
      //     this.router.navigate(['/recipes']);
      //   },
      //   (err) => {
      //     this.loading = false;
      //     // console.log(err);
      //     this.error = err;
      //   }
      // );
    } else {
      this.store.dispatch(new AuthActions.SignUpStart({email,password}))
      // this.authService.signup(email, password).subscribe(
      //   (resData) => {
      //     this.loading = false;
      //     console.log(resData);
      //     this.router.navigate(['/recipes']);
      //   },
      //   (err) => {
      //     this.loading = false;
      //     this.error = err;
      //   }
      // );
    }
    this.authForm.reset();
  }

  switchMode() {
    this.inLoginMode = !this.inLoginMode;
  }
  ngOnDestroy(): void {
    this.storeSub.unsubscribe()
  }
}
