import { Account } from './monzo/monzo.model';
import {
  AppAction, GET_ACCOUNTS_FAIlED,
  GET_ACCOUNTS_RESOLVED
} from './app.actions';

export interface AppState {
  accounts: Account[];
}

export function rootReducer(lastState = [], action: AppAction): Account[] {
  switch (action.type) {
    case GET_ACCOUNTS_RESOLVED:
      return action.payload;
    case GET_ACCOUNTS_FAIlED:
      console.log(action.payload);
  }

  return lastState;
}
