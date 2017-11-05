import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class AppActions {
  static GET_ACCOUNTS = 'GET_ACCOUNTS';

  getAccounts(): Action {
    return { type: AppActions.GET_ACCOUNTS };
  }
}
