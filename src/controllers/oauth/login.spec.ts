import LoginController from '@src/controllers/oauth/login';
import OauthService from '@src/services/oauth';

import { expect, use } from 'chai';
import { createStubInstance, spy } from 'sinon';
import * as sinonChai from 'sinon-chai';

describe('Oauth login controller', () => {
  use(sinonChai);

  let controller: LoginController;
  let fakeSession: any;
  let serviceStub: any;

  beforeEach(() => {
    serviceStub = createStubInstance(OauthService);
    fakeSession = {
      access_token: 'MY_TOKEN',
    };
    controller = new LoginController(serviceStub);
  });

  describe('successful action', () => {
    it('should return the access token from the session', async () => {
      const token = await controller.action(fakeSession);

      expect(token).to.equal(fakeSession.access_token);
    });
  });

  describe('unsuccessful action', () => {
    it('should reject when there is no access token in the session', () => {
      fakeSession = {};

      return expect(controller.action(fakeSession))
        .to.be.rejectedWith('No token');
    });
  });
});
