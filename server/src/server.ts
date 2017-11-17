import * as express from 'express';
import * as oauthController from './controllers/oauth';

export default class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.set('port', process.env.PORT || 3000);
    this.app.get('/oauth/callback', oauthController.callback);
  }

  public start(): Promise<any> {
    const port = this.app.get('port');
    return new Promise((resolve) => this.app.listen(port, resolve.bind(this, port)));
  }
}
