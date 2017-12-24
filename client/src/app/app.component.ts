import { Component, OnInit } from '@angular/core';
import { AppState } from './app.store';
import { Account, Authentication, MonzoError } from './monzo/monzo.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { CheckAuthentication } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly $accounts: Observable<Account[]>;
  readonly $authentication: Observable<Authentication>;
  readonly $monzoError: Observable<MonzoError>;

  constructor(private store: Store<AppState>) {
    this.$accounts = store.select('accounts');
    this.$authentication = store.select('authentication');
    this.$monzoError = store.select('monzoError');
    this.$authentication.subscribe(
      (authentication: Authentication) => {
        console.log(authentication);
        console.log('Logged in');
      }
    );
  }

  ngOnInit(): void {
    this.store.dispatch(new CheckAuthentication());
  }
}
