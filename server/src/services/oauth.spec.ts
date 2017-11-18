import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as nock from 'nock';
import OauthService from './oauth';

describe('Oauth service', () => {
  use(chaiAsPromised);

  let service: OauthService;

  beforeEach(() => {
    nock.disableNetConnect();

    service = new OauthService('clientId', 'clientSecret', 'http://redirect');
  });

  describe('successfully obtaining tokens', () => {
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

  describe('unsuccessfully obtaining tokens', () => {
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
