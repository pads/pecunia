import OauthController from '@src/controllers/oauth';
import OauthService from '@src/services/oauth';
import { Authorization } from '@src/types/oauth';

import { expect, use } from 'chai';
import { createStubInstance, spy } from 'sinon';
import * as sinonChai from 'sinon-chai';

describe('Oauth controller', () => {
  use(sinonChai);

  let controller: OauthController;
  let serviceStub: any;
  let fakeSession: any;

  beforeEach(() => {
    serviceStub = createStubInstance(OauthService);
    fakeSession = {};
    controller = new OauthController(serviceStub);
  });

  describe('successful action', () => {
    it('should call the oauth service with the given code', () => {
      const authorization = {
        code: 'abc',
        state: '123',
      } as Authorization;

      controller.action(authorization, fakeSession);

      expect(serviceStub.getToken)
        .to.have.been.calledWith(authorization.code);
    });

    it('should save the access token to the session', async () => {
      const expectedToken = 'MY_TOKEN';
      const authorization = {
        code: 'abc',
        state: '123',
      } as Authorization;

      serviceStub.getToken.returns(expectedToken);

      await controller.action(authorization, fakeSession);

      expect(fakeSession.access_token).to.equal(expectedToken);
    });
  });
});
