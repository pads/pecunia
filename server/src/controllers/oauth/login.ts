import BaseController from '@src/controllers/base';
import OauthService from '@src/services/oauth';

import { Request, Response } from 'express';
import * as URI from 'urijs';
import * as uuid from 'uuid';

export default class LoginController extends BaseController {
  private oauthService: OauthService;

  constructor(oauthService: OauthService) {
    super();
    this.oauthService = oauthService;
  }

  public async handle(request: Request, response: Response) {
    try {
      const token = await this.action(request.session);
      response.json({ token });
    } catch (error) {
      const login = this.oauthService.getLogin();
      request.session.state = login.state;
      response.redirect(login.uri.toString());
    }
  }

  public async action(session: Express.Session) {
    if (!session.access_token) {
      return Promise.reject('No token');
    }
    return session.access_token;
  }
}
