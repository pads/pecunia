import { Action } from '@ngrx/store';
import { Authentication, MonzoError } from '../monzo/monzo.model';

export const CHECK_AUTHENTICATION = 'CHECK_AUTHENTICATION';
export const CHECK_AUTHENTICATION_RESOLVED = 'CHECK_AUTHENTICATION_RESOLVED';
export const CHECK_AUTHENTICATION_FAILED = 'CHECK_AUTHENTICATION_FAILED';

export class CheckAuthentication implements Action {
  readonly type = CHECK_AUTHENTICATION;
}

export class CheckAuthenticationResolved implements Action {
  readonly type = CHECK_AUTHENTICATION_RESOLVED;

  constructor(public payload: Authentication) { }
}

export class CheckAuthenticationFailed implements Action {
  readonly type = CHECK_AUTHENTICATION_FAILED;

  constructor(public payload: MonzoError) { }
}
