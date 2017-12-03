import LogoutController from '@src/controllers/oauth/logout';
import OauthService from '@src/services/oauth';

import { expect, use } from 'chai';
import { createStubInstance, stub } from 'sinon';
import * as sinonChai from 'sinon-chai';

describe('Oauth logout controller', () => {
  use(sinonChai);

  let controller: LogoutController;
  let sessionDestroyStub: any;
  let fakeSession: any;

  beforeEach(() => {
    fakeSession = {
      destroy: () => {},
    };
    sessionDestroyStub = stub(fakeSession, 'destroy');

    controller = new LogoutController();
  });

  describe('successful action', () => {
    it('should destroy the session', async () => {
      sessionDestroyStub.yields();

      await controller.action(fakeSession);

      expect(sessionDestroyStub.called).to.equal(true);
    });
  });

  describe('unsuccessful action', () => {
    it('should reject when session destruction fails', () => {
      sessionDestroyStub.yields('Failed to destroy session');

      return expect(controller.action(fakeSession))
        .to.be.rejectedWith('Failed to destroy session');
    });
  });
});
