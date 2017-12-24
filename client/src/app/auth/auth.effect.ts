import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { CHECK_AUTHENTICATION, CheckAuthenticationFailed, CheckAuthenticationResolved } from './auth.actions';
import { Authentication } from '../monzo/monzo.model';
import { of } from 'rxjs/observable/of';

const BASE_URL = 'https://api.monzo.com';

@Injectable()
export class AuthEffect {

  constructor(private http: HttpClient,
              private $actions: Actions) { }

  @Effect() $checkAuthentication: Observable<Action> = this.$actions.ofType(CHECK_AUTHENTICATION)
    .mergeMap(action =>
      this.http.get<Authentication>(`${BASE_URL}/ping/whoami`)
        .map(data => (new CheckAuthenticationResolved(data)))
        .catch(data => of(new CheckAuthenticationFailed(data.error)))
    );
}
