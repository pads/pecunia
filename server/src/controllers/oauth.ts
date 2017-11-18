import { Request, Response } from 'express';import { Authorization } from '../types/oauth';import OauthService from '../services/oauth';export default class OauthController {  public oauthService: OauthService;  constructor(oauthService: OauthService) {    this.oauthService = oauthService;  }  public async callback(request: Request, response: Response) {    const authorization = {      code: request.query.code,      state: request.query.state,    } as Authorization;    const json = await this.action(authorization);    response.json(json);  }  public async action(authorization: Authorization) {    return await this.oauthService.getToken(authorization.code);  }}
