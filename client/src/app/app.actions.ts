import { Action } from '@ngrx/store';
import { Account } from './monzo/monzo.model';
import { CheckAuthentication, CheckAuthenticationFailed, CheckAuthenticationResolved } from './auth/auth.actions';

export const GET_ACCOUNTS = 'GET_ACCOUNTS';
export const GET_ACCOUNTS_RESOLVED = 'GET_ACCOUNTS_RESOLVED';
export const GET_ACCOUNTS_FAIlED = 'GET_ACCOUNTS_FAIlED';

export class GetAccounts implements Action {
  readonly type = GET_ACCOUNTS;
}

export class AccountsResolved implements Action {
  readonly type = GET_ACCOUNTS_RESOLVED;

  constructor(public payload: Account[]) { }
}

export class AccountsFailed implements Action {
  readonly type = GET_ACCOUNTS_FAIlED;

  constructor(public payload?: string) { }
}

export type AuthAction = CheckAuthentication | CheckAuthenticationResolved | CheckAuthenticationFailed;

export type AppAction = AuthAction | GetAccounts | AccountsResolved | AccountsFailed;
