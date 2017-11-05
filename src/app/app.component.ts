import { Component, OnInit } from '@angular/core';
import { AppState } from './app.store';
import { AppActions } from './app.actions';
import { Account } from './monzo/monzo';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly $accounts: Observable<Account[]>;

  constructor(private store: Store<AppState>,
              private appActions: AppActions) {
    this.$accounts = store.select('accounts');
  }

  ngOnInit(): void {
    this.store.dispatch(this.appActions.getAccounts());
  }
}
