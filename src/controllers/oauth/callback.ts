import BaseController from '@src/controllers/base';
import OauthService from '@src/services/oauth';
import { Authorization } from '@src/types/oauth';

import { Request, Response } from 'express';

export default class CallbackController extends BaseController {
  private oauthService: OauthService;

  constructor(oauthService: OauthService) {
    super();
    this.oauthService = oauthService;
  }

  public async handle(request: Request, response: Response) {
    const authorization = {
      code: request.query.code,
      state: request.query.state,
    } as Authorization;

    try {
      await this.action(authorization, request.session);
      response.redirect('/');
    } catch (error) {
      /** @todo friendly error page */
      response.status(401).end();
    }
  }

  public async action(authorization: Authorization, session: Express.Session) {
    if (authorization.state !== session.state) {
      return Promise.reject('Invalid state');
    }

    const token = await this.oauthService.getToken(authorization.code);
    /* @todo consider using immutable js */
    session.access_token = token;
    delete session.state;
  }
}
