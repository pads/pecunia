import OauthController from '@src/controllers/oauth';
import OauthService from '@src/services/oauth';
import { Authorization } from '@src/types/oauth';

import { expect, use } from 'chai';
import { createStubInstance } from 'sinon';
import * as sinonChai from 'sinon-chai';

describe('Oauth controller', () => {
  use(sinonChai);

  let controller: OauthController;
  let serviceStub: any;

  beforeEach(() => {
    serviceStub = createStubInstance(OauthService);
    controller = new OauthController(serviceStub);
  });

  describe('successful access token acquisition', () => {
    it('correctly calls the oauth service', () => {
      const authorization = {
        code: 'abc',
        state: '123',
      } as Authorization;

      controller.action(authorization);

      expect(serviceStub.getToken)
        .to.have.been.calledWith(authorization.code);
    });
  });
});
