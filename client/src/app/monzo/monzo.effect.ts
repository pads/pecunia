import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  GET_ACCOUNTS,
  AccountsResolved,
  AccountsFailed
} from '../app.actions';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import { Accounts } from './monzo.model';

const BASE_URL = 'https://api.monzo.com';

@Injectable()
export class MonzoEffect {

  constructor(private http: HttpClient,
              private $actions: Actions) { }

  @Effect() $getAccounts: Observable<Action> = this.$actions.ofType(GET_ACCOUNTS)
    .mergeMap(action =>
      this.http.get<Accounts>(`${BASE_URL}/accounts`)
        .map(data => (new AccountsResolved(data.accounts)))
        .catch(data => of(new AccountsFailed(data.error.message))) // TODO prompt login on 401
    );
}
