import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Accounts } from './monzo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const BASE_URL = 'https://api.monzo.com';

@Injectable()
export class MonzoService {

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Accounts> {
    return this.http.get<Accounts>(`${BASE_URL}/accounts`);
  }
}
