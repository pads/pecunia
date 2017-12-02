import BaseController from '@src/controllers/base';
import Server from '@src/server';
import { ControllerFunction } from '@src/types/functions';

type RouteVerb = 'delete' | 'get' | 'head' | 'patch' | 'post' | 'put';
type RouteBinder = Map<string, ControllerFunction>;
export type VerbToPathMapping = [RouteVerb, string];

export default abstract class BaseRouter {
  private controllers: BaseController[];
  private mappings: Map<string, VerbToPathMapping>;

  constructor(controllers: BaseController[], mappings: Map<string, VerbToPathMapping>) {
    this.controllers = controllers;
    this.mappings = mappings;
  }

  configure(server: Server) {
    this.controllers.forEach((controller) => {
      const [verb, path] = this.mappings.get(controller.constructor.name);
      const handler = controller.handle.bind(controller);
      server.app[verb](path, handler);
    });
  }
}
