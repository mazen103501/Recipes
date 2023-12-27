import { Action } from '@ngrx/store';
import { UserType } from '../../app.component';

export const AUTH_SUCCESS = '[Auth] Auth Success';
export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;
  constructor(public payload: UserType){}

}

export const LOGOUT = '[Auth] Logout';
export class Logout implements Action {
  readonly type = LOGOUT;
}

export const LOGIN_START = '[Auth] Login Start';
export class LoginStart implements Action{
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}


export const AUTH_FAIL = "[Auth] Auth Fail";
export class AuthFail implements Action{
  readonly type = AUTH_FAIL
  constructor(public payload:string){}
}

export const SIGNUP_START = "[Auth] SignUp Start";
export class SignUpStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload:{email: string; password: string }){}
}


export type AuthActionsType = AuthSuccess | Logout | LoginStart | AuthFail | SignUpStart;
