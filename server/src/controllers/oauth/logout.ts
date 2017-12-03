import BaseController from '@src/controllers/base';

import { Request, Response } from 'express';

export default class LogoutController extends BaseController {
  public async handle(request: Request, response: Response) {
    try {
      await this.action(request.session);
      response.redirect('/');
    } catch (error) {
      /** @todo friendly error page */
      response.status(500).end();
    }
  }

  public async action(session: Express.Session) {
    const promise = new Promise<void>((resolve, reject) => {
      session.destroy((error) => {
        if (error) {
          return reject(error);
        }
        return resolve();
      });
    });
    return promise;
  }
}
