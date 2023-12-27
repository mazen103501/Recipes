import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.module';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromAuthActions from '../authentication/store/auth.actions';
import * as fromApp from '../store/app.reducer';
@Injectable({ providedIn: 'root' })
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  timer: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  signup(email: string, password: string) {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCiMgYjgIahTe0k2s2QPzwWcuMQ89xS-HQ',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errRes) => {
          let errorMsg = 'UnKnown Error!';
          if (!errRes.error || !errRes.error.error) {
            return throwError(errorMsg);
          }
          switch (errRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMsg = 'This Email Exists';
          }
          return throwError(errorMsg);
        }),
        tap(
          (resData: {
            email: string;
            localId: string;
            idToken: string;
            expiresdIn: string;
          }) => {
            let expDate = new Date(
              new Date().getTime() + +resData.expiresdIn * 1000
            );
            const user = new User(
              resData.email,
              resData.localId,
              resData.idToken,
              expDate
            );
            // this.user.next(user);
            console.log('ssssss');

            this.store.dispatch(
              new fromAuthActions.AuthSuccess({
                email: resData.email,
                userId: resData.localId,
                tokenId: resData.idToken,
                expiresDate: expDate,
              })
            );
            this.autoLogout(expDate.getTime() * 1000);
            localStorage.setItem('userData', JSON.stringify(user));
          }
        )
      );
  }

  login(email: string, password: string) {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCiMgYjgIahTe0k2s2QPzwWcuMQ89xS-HQ',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errRes) => {
          let errorMsg = 'UnKnown Error!';
          if (!errRes.error || !errRes.error.error) {
            return throwError(errorMsg);
          }
          switch (errRes.error.error.message) {
            case 'INVALID_PASSWORD':
              errorMsg = 'Wrong Password';
          }
          return throwError(errorMsg);
        }),
        tap(
          (resData: {
            email: string;
            localId: string;
            idToken: string;
            expiresIn: string;
          }) => {
            let expDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            const user = new User(
              resData.email,
              resData.localId,
              resData.idToken,
              expDate
            );
            // this.user.next(user);
            this.store.dispatch(
              new fromAuthActions.AuthSuccess({
                email: resData.email,
                userId: resData.localId,
                tokenId: resData.idToken,
                expiresDate: expDate,
              })
            );
            // console.log(resData.expiresIn, expDate, resData);
            // this.autoLogout(expDate.getTime());
            localStorage.setItem('userData', JSON.stringify(user));
          }
        )
      );
  }
  autoLogin() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    // console.log(userData);
    if (!userData) {
      return;
    }
    let localStorageUser = new User(
      userData.email,
      userData.id,
      userData.theToken,
      userData.tokenExpDate
    );
    if (localStorageUser.token) {
      let expDate =
        new Date(localStorageUser.tokenExpDate).getTime() -
        new Date().getTime();

      let expiresDate = new Date(
        new Date(localStorageUser.tokenExpDate).getTime() - new Date().getTime()
      );
      // this.user.next(localStorageUser);
      this.store.dispatch(
        new fromAuthActions.AuthSuccess({
          email: userData.email,
          userId: userData.localId,
          tokenId: userData.idToken,
          expiresDate,
        })
      );
      this.autoLogout(expDate);
    }
  }
  logout() {
    // this.user.next(null);
    this.store.dispatch(new fromAuthActions.Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    clearTimeout(this.timer);
  }
  autoLogout(expDuration: number) {
    console.log(expDuration);

    this.timer = setTimeout(() => {
      this.logout();
    }, expDuration);
  }
}
