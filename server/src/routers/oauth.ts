
import BaseController from '@src/controllers/base';
import BaseRouter, { VerbToPathMapping } from '@src/routers/base';

export default class OauthRouter extends BaseRouter {
  constructor(controllers: BaseController[]) {
    const mappings: Map<string, VerbToPathMapping> = new Map();
    mappings.set('CallbackController', ['get', '/oauth/callback']);

    super(controllers, mappings);
  }
}
