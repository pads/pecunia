import CallbackController from '@src/controllers/oauth/callback';
import LoginController from '@src/controllers/oauth/login';
import LogoutController from '@src/controllers/oauth/logout';
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
  let stubLogoutController: any;

  beforeEach(() => {
    stubServer = createStubInstance(Server);
    stubServer.app = {
      get: spy(),
    };
    stubCallbackController = createStubInstance(CallbackController);
    stubLoginController = createStubInstance(LoginController);
    stubLogoutController = createStubInstance(LogoutController);

    router = new OauthRouter([
      stubCallbackController,
      stubLoginController,
      stubLogoutController,
    ]);

    router.configure(stubServer);
  });

  it('should assign the callback controller to the correct path', () => {
    expect(stubServer.app.get).to.have.been.calledWith('/oauth/callback');
  });

  it('should assign the login controller to the correct path', () => {
    expect(stubServer.app.get).to.have.been.calledWith('/oauth/login');
  });

  it('should assign the logout controller to the correct path', () => {
    expect(stubServer.app.get).to.have.been.calledWith('/oauth/logout');
  });
});
