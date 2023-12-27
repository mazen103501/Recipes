import { HttpClient } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthEffect {
  @Effect()
  authSignup =  this.actions$.pipe(ofType(AuthActions.SIGNUP_START),switchMap((authData:AuthActions.SignUpStart)=>{
    return this.http
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCiMgYjgIahTe0k2s2QPzwWcuMQ89xS-HQ",
        {
          email:authData.payload.email,
          password : authData.payload.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        map(
          (resData: {
            email: string;
            localId: string;
            idToken: string;
            expiresIn: string;
          }) => {
            let expDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            const user = {
              email: resData.email,
              userId: resData.localId,
              tokenId:  resData.idToken,
              expiresDate: expDate
            };
            localStorage.setItem('userData', JSON.stringify(user));
            return new AuthActions.AuthSuccess(user);
        }),
        catchError((errRes) => {
          return of(new AuthActions.AuthFail(errRes.error.error.message))
        }))
      }));
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCiMgYjgIahTe0k2s2QPzwWcuMQ89xS-HQ',
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((resData:{
            email: string;
            localId: string;
            idToken: string;
            expiresdIn: string;
          }) => {

            let expDate = new Date(
              new Date().getTime() + +resData.expiresdIn * 1000
            );
            const user = {
              email: resData.email,
              userId: resData.localId,
              tokenId:  resData.idToken,
              expiresDate: expDate
            };
            localStorage.setItem('userData', JSON.stringify(user));
            return new AuthActions.AuthSuccess(user);
          }),
          catchError(errRes => {
            return  of(new AuthActions.AuthFail(errRes.error.error.message));
          }),

        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
export interface AuthResponseData{
  email: string;
  userId: string;
  tokenId: string;
  expiresDate: Date;
}
