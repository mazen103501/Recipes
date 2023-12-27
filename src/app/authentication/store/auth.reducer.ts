import { User } from '../user.module';
import * as AuthActions from './auth.actions';
export interface State {
  user: User;
  authFail:string,
  loading:boolean
}

const initialState = {
  user: null,
  authFail: null,
  loading: false
};
export function AuthReducer(
  state = initialState,
  action: AuthActions.AuthActionsType
) {
  switch (action.type) {
    case AuthActions.AUTH_SUCCESS:
      const data = action.payload;
      const user = new User(
        data.email,
        data.userId,
        data.tokenId,
        data.expiresDate
      );
      return {
        ...state,
        user,
        loading:false,
        authFail:null
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,

      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        loading:true,
        authFail:null
      }
    case AuthActions.AUTH_FAIL:
      return {
        ...state,
        loading:false,
        authFail: action.payload,
        user:null,
      }
    default:
      return state;
  }
}
