import CallbackController from '@src/controllers/oauth/callback';
import OauthService from '@src/services/oauth';
import { Authorization } from '@src/types/oauth';

import { expect, use } from 'chai';
import { createStubInstance, spy } from 'sinon';
import * as sinonChai from 'sinon-chai';

describe('Oauth callback controller', () => {
  use(sinonChai);

  let controller: CallbackController;
  let authorization: Authorization;
  let fakeSession: any;
  let serviceStub: any;

  beforeEach(() => {
    serviceStub = createStubInstance(OauthService);
    fakeSession = {
      state: '123',
    };
    controller = new CallbackController(serviceStub);
  });

  describe('successful action', () => {
    beforeEach(() => {
      authorization = {
        code: 'abc',
        state: '123',
      };
    });

    it('should call the oauth service with the given code', () => {
      controller.action(authorization, fakeSession);

      expect(serviceStub.getToken)
        .to.have.been.calledWith(authorization.code);
    });

    it('should save the access token to the session', async () => {
      const expectedToken = 'MY_TOKEN';

      serviceStub.getToken.returns(expectedToken);

      await controller.action(authorization, fakeSession);

      expect(fakeSession.access_token).to.equal(expectedToken);
    });
  });

  describe('unsuccessful action', () => {
    it('should reject when the state does not match', () => {
      fakeSession.state = 'not_matching';

      return expect(controller.action(authorization, fakeSession))
        .to.be.rejectedWith('Invalid state');
    });
  });
});
