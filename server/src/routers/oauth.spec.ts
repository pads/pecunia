import CallbackController from '@src/controllers/oauth/callback';
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

  beforeEach(() => {
    stubServer = createStubInstance(Server);
    stubServer.app = {
      get: spy(),
    };
    stubCallbackController = createStubInstance(CallbackController);

    router = new OauthRouter([stubCallbackController]);
  });

  it('should assign the callback controller to the correct path', () => {
    router.configure(stubServer);

    expect(stubServer.app.get).to.have.been.calledWith('/oauth/callback');
  });
});
