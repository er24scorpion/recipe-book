import { Action, createAction, props } from "@ngrx/store";

export const loginStart = createAction(
  "[Auth] Login Start",
  props<{
    email: string;
    password: string;
  }>()
);

export const signupStart = createAction(
  "[Auth] Signup Start",
  props<{
    email: string;
    password: string;
  }>()
);

export const authenticateSuccess = createAction(
  "[Auth] Authenticate Success",
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
    redirect: boolean;
  }>()
);

export const authenticateFail = createAction(
  "[Auth] Authenticate Fail",
  props<{
    errorMessage: string;
  }>()
);

export const clearError = createAction("[Auth] Clear Error");

export const autoLogin = createAction("[Auth] Auto Login");

export const logout = createAction("[Auth] Logout");

// old style

export const LOGIN_START = "[Auth] Login Start";
export const LOGIN = "[Auth] Login";
export const LOGOUT = "[Auth] Logout";
export class Login implements Action {
  readonly type: string = LOGIN;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      exprirationDate: Date;
    }
  ) {}
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
}

export class LoginStart implements Action {
  readonly type: string = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export type AuthActions = Login | Logout;
