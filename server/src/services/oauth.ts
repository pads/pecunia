import { Login } from '@src/types/oauth';

import { UriOptions } from 'request';
import * as request from 'request-promise-native';
import { RequestPromiseOptions } from 'request-promise-native';
import * as URI from 'urijs';
import * as uuid from 'uuid';

export default class OauthService {
  public clientId: string;
  public clientSecret: string;
  public redirectUri: string;

  constructor(clientId: string, clientSecret: string, redirectUri: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
  }

  public getLogin(): Login {
    const state = uuid();

    const uri = URI('https://auth.getmondo.co.uk')
      .search({
        client_id: this.clientId,
        redirect_uri: this.redirectUri,
        response_type: 'code',
        state,
      });

    return { state, uri };
  }

  public async getToken(authCode: string): Promise<string | null> {
    const options = {
      method: 'POST',
      uri: 'https://api.monzo.com/oauth2/token',
      json: true,
      formData: {
        grant_type: 'authorization_code',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUri,
        code: authCode,
      },
    } as UriOptions & RequestPromiseOptions;

    try {
      const response = await request(options);
      return Promise.resolve(response.access_token);
    } catch (error) {
      if (error.statusCode >= 500) {
        return Promise.reject(error);
      }
      return Promise.resolve(null);
    }
  }
}
