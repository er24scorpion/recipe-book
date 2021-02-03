import { Action, createReducer, on } from "@ngrx/store";
import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

const _authReducer = createReducer(
  initialState,

  on(AuthActions.loginStart, AuthActions.signupStart, (state) => ({
    ...state,
    authError: null,
    loading: true,
  })),

  on(AuthActions.authenticateSuccess, (state, action) => ({
    ...state,
    authError: null,
    loading: false,
    user: new User(
      action.email,
      action.userId,
      action.token,
      action.expirationDate
    ),
  })),

  on(AuthActions.authenticateFail, (state, action) => ({
    ...state,
    user: null,
    authError: action.errorMessage,
    loading: false,
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
  })),

  on(AuthActions.clearError, (state) => ({
    ...state,
    authError: null,
  }))
);

export function authReducer(state: State, action: Action) {
  return _authReducer(state, action);
}

// old style before angular 8:
// import * as AuthActions from "./auth.actions";
// import { User } from "../user.model";

// export interface State {
//   user: User;
// }

// const initialState: State = {
//   user: null,
// };

// export function authReducer(
//   state: State = initialState,
//   action: AuthActions.AuthActions
// ) {
//   switch (action.type) {
//     case AuthActions.LOGIN:
//       const payload = (action as AuthActions.Login).payload;
//       const user = new User(
//         payload.email,
//         payload.userId,
//         payload.token,
//         payload.exprirationDate
//       );

//       return {
//         ...state,
//         user: user,
//       };

//     case AuthActions.LOGOUT:
//       return { ...state, user: null };
//     default:
//       return state;
//   }
// }
