import { Action } from '@ngrx/store';
import { Account } from './monzo/monzo.model';

export const GET_ACCOUNTS_TYPE = 'GET_ACCOUNTS';
export const GET_ACCOUNTS_RESOLVED = 'GET_ACCOUNTS_RESOLVED';
export const GET_ACCOUNTS_FAIlED = 'GET_ACCOUNTS_FAIlED';

export class GetAccounts implements Action {
  readonly type = GET_ACCOUNTS_TYPE;
}

export class AccountsResolved implements Action {
  readonly type = GET_ACCOUNTS_RESOLVED;

  constructor(public payload: Account[]) { }
}

export class AccountsFailed implements Action {
  readonly type = GET_ACCOUNTS_FAIlED;

  constructor(public payload?: string) { }
}

export type AppAction = GetAccounts | AccountsResolved | AccountsFailed;
