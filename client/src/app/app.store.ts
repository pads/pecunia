import { Account, Authentication, MonzoError } from './monzo/monzo.model';
import {
  AppAction, AuthAction, GET_ACCOUNTS_FAIlED,
  GET_ACCOUNTS_RESOLVED
} from './app.actions';
import { CHECK_AUTHENTICATION_FAILED, CHECK_AUTHENTICATION_RESOLVED } from './auth/auth.actions';

export interface AppState {
  authentication: Authentication;
  accounts: Account[];
  monzoError: MonzoError;
}

export function accountsReducer(lastState = [], action: AppAction): Account[] {
  switch (action.type) {
    case GET_ACCOUNTS_RESOLVED:
      return action.payload;
    case GET_ACCOUNTS_FAIlED:
      console.log(action.payload);
  }

  return lastState;
}

export function authenticationReducer(lastState, action: AuthAction): Authentication {
  switch (action.type) {
    case CHECK_AUTHENTICATION_RESOLVED:
      return action.payload;
  }
}

export function monzoErrorReducer(lastState, action: AuthAction): MonzoError {
  switch (action.type) {
    case CHECK_AUTHENTICATION_FAILED:
      return action.payload;
  }
}
