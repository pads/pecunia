import { Request, Response } from 'express';
import OauthService from '../services/oauth';
import { Authorization } from '../types/oauth';

export default class OauthController {
  public oauthService: OauthService;

  constructor(oauthService: OauthService) {
    this.oauthService = oauthService;
  }

  public async callback(request: Request, response: Response) {
    const authorization = {
      code: request.query.code,
      state: request.query.state,
    } as Authorization;

    const token = await this.action(authorization);

    request.session.access_token = token;

    response.json(token);
  }

  public async action(authorization: Authorization) {
    return await this.oauthService.getToken(authorization.code);
  }
}
