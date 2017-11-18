import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as errorHandler from 'errorhandler';
import OauthController from './controllers/oauth';
import OauthService from './services/oauth';
import { config } from 'dotenv';
config();

export default class Server {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    if (process.env.NODE_ENV !== 'production') {
      this.app.use(errorHandler());
    }

    this.app.set('port', process.env.PORT || 3000);

    const oauthService = new OauthService(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI,
    );
    const oauthController = new OauthController(oauthService);

    this.app.get('/oauth/callback', oauthController.callback.bind(oauthController));
  }

  public start(): Promise<any> {
    const port = this.app.get('port');
    return new Promise((resolve) => this.app.listen(port, resolve.bind(this, port)));
  }
}
