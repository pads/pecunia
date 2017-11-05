import { Account } from './monzo/monzo';
import { Action } from '@ngrx/store';
import { AppActions } from './app.actions';

export interface AppState {
  accounts: Account[];
}

export function rootReducer(lastState = [], action: Action): Account[] {
  const fakeAccount = {
    id: 'fake',
    type: 'uk_retail',
    description: 'Fake Account',
    created: 'today'
  };
  switch (action.type) {
    case AppActions.GET_ACCOUNTS: return [fakeAccount] as Account[];
  }

  return lastState;
}
