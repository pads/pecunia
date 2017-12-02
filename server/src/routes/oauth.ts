import OauthController from '@src/controllers/oauth';
import BaseRoute from '@src/routes/base';

export default class OauthRoutes extends BaseRoute {
  constructor(oauthController: OauthController) {
    super();
    this.getRoutes.set('/oauth/callback', oauthController.callback.bind(oauthController));
  }
}
