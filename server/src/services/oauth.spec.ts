import OauthService from '@src/services/oauth';
import { Login } from '@src/types/oauth';

import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as nock from 'nock';

describe('Oauth service', () => {
  use(chaiAsPromised);

  /* tslint:disable-next-line:max-line-length */
  const LOGIN_URI_REGEX = /^https:\/\/auth\.getmondo\.co\.uk\/\?client_id=clientId&redirect_uri=http%3A%2F%2Fredirect&response_type=code&state=.*$/;
  const UUID_V4_REGEX = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  let service: OauthService;

  beforeEach(() => {
    nock.disableNetConnect();

    service = new OauthService('clientId', 'clientSecret', 'http://redirect');
  });

  describe('Logging in', () => {
    let login: Login;

    beforeEach(() => {
      login = service.getLogin();
    });

    it('returns a valid login object containing the login URI', () => {
      expect(login.uri.toString()).to.match(LOGIN_URI_REGEX);
    });

    it('returns a valid login object containing a generated state', () => {
      expect(login.state).to.match(UUID_V4_REGEX);
    });
  });

  describe('Obtaining access tokens', () => {
    describe('successfully', () => {
      it('should return a valid token', async () => {
        nock('https://api.monzo.com')
          .post('/oauth2/token')
          .reply(201, {
            access_token: 'MY_TOKEN',
            client_id: 'my_client_id',
            expires_in: 21600,
            refresh_token: 'my_refresh_token',
            token_type: 'Bearer',
            user_id: 'my_user_id',
          });

        const token = await service.getToken('auth_code');

        expect(token).to.equal('MY_TOKEN');
      });
    });

    describe('unsuccessfully', () => {
      it('should return null upon receiving a 401', async () => {
        nock('https://api.monzo.com')
          .post('/oauth2/token')
          .reply(401);

        const token = await service.getToken('bad_auth_code');

        expect(token).to.equal(null);
      });

      it('should throw an error given a server error', () => {
        nock('https://api.monzo.com')
          .post('/oauth2/token')
          .reply(500);

        return expect(service.getToken('auth_code'))
          .to.be.rejectedWith(Error);
      });
    });
  });
});
