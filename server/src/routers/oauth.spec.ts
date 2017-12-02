import CallbackController from '@src/controllers/oauth/callback';
import LoginController from '@src/controllers/oauth/login';
import OauthRouter from '@src/routers/oauth';
import Server from '@src/server';

import { expect, use } from 'chai';
import { createStubInstance, spy } from 'sinon';
import * as sinonChai from 'sinon-chai';

describe('Oauth routes', () => {
  use(sinonChai);

  let router: OauthRouter;
  let stubServer: any;
  let stubCallbackController: any;
  let stubLoginController: any;

  beforeEach(() => {
    stubServer = createStubInstance(Server);
    stubServer.app = {
      get: spy(),
    };
    stubCallbackController = createStubInstance(CallbackController);
    stubLoginController = createStubInstance(LoginController);

    router = new OauthRouter([
      stubCallbackController,
      stubLoginController,
    ]);

    router.configure(stubServer);
  });

  it('should assign the callback controller to the correct path', () => {
    expect(stubServer.app.get).to.have.been.calledWith('/oauth/callback');
  });

  it('should assign the login controller to the correct path', () => {
    expect(stubServer.app.get).to.have.been.calledWith('/oauth/login');
  });
});
