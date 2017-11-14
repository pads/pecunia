import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  getAuthorizationHeader(): string {
    // TODO: replace with call to server to get the access token
    return 'Bearer xxx';
  }
}
