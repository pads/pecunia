import { Component, OnInit } from '@angular/core';
import { AppState } from './app.store';
import { GetAccounts} from './app.actions';
import { Account } from './monzo/monzo.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly $accounts: Observable<Account[]>;

  constructor(private store: Store<AppState>) {
    this.$accounts = store.select('accounts');
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAccounts());
  }
}
