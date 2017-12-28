import CallbackController from '@src/controllers/oauth/callback';
import LoginController from '@src/controllers/oauth/login';
import LogoutController from '@src/controllers/oauth/logout';
import OauthRouter from '@src/routers/oauth';
import OauthService from '@src/services/oauth';

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { config } from 'dotenv';
import * as errorHandler from 'errorhandler';
import * as express from 'express';
import * as session from 'express-session';
import { SessionOptions } from 'express-session';
import * as path from 'path';

config();

export default class Server {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.static(path.join('client', 'dist')));
    this.app.set('port', process.env.PORT || 3000);

    this.configureSession();
    this.configureRoutes();

    if (process.env.NODE_ENV !== 'production') {
      this.app.use(cors());
      this.app.use(errorHandler());
    }
  }

  configureRoutes() {
    const oauthService = new OauthService(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI,
    );

    const callbackController = new CallbackController(oauthService);
    const loginController = new LoginController(oauthService);
    const logoutController = new LogoutController();

    const oauthRouter = new OauthRouter([
      callbackController,
      loginController,
      logoutController,
    ]);
    oauthRouter.configure(this);
  }

  configureSession() {
    const MemcachedStore = require('connect-memcached')(session);
    const store = new MemcachedStore({
      hosts: process.env.CACHE_HOST,
      secret: process.env.CACHE_SECRET,
    });

    const options = {
      name: 'pecunia',
      secret: process.env.SESSION_SECRET,
      cookie: {
        domain: process.env.COOKIE_DOMAIN,
        sameSite: true,
      },
      store,
      resave: true,
      saveUninitialized: true,
    } as SessionOptions;

    if (process.env.NODE_ENV === 'production') {
      this.app.set('trust proxy', 1);
      options.cookie.secure = true;
    }

    this.app.use(session(options));
  }

  public start(): Promise<any> {
    const port = this.app.get('port');
    return new Promise((resolve) => this.app.listen(port, resolve.bind(this, port)));
  }
}
