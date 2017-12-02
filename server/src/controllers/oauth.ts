import OauthService from '@src/services/oauth';
import { Authorization } from '@src/types/oauth';

import { Request, Response } from 'express';

export default class OauthController {
  public oauthService: OauthService;

  constructor(oauthService: OauthService) {
    this.oauthService = oauthService;
  }

  public async handle(request: Request, response: Response) {
    const authorization = {
      code: request.query.code,
      state: request.query.state,
    } as Authorization;

    await this.action(authorization, request.session);

    response.redirect('/');
  }

  public async action(authorization: Authorization, session: Express.Session) {
    const token = await this.oauthService.getToken(authorization.code);
    session.access_token = token;
  }
}
