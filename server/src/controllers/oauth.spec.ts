import { expect, use } from 'chai';
import { createStubInstance } from 'sinon';
import * as sinonChai from 'sinon-chai';
import OauthService from '../services/oauth';
import { Authorization } from '../types/oauth';
import OauthController from './oauth';

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
