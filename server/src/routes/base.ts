import { ControllerFunction } from '@src/types/functions';

export type RouteVerb = 'delete' | 'get' | 'head' | 'patch' | 'post' | 'put';
export type RouteBinder = Map<string, ControllerFunction>;

export default abstract class BaseRoute {
  private routeMappings: Map<RouteVerb, Map<string, ControllerFunction>> = new Map();
  protected deleteRoutes: RouteBinder = new Map();
  protected getRoutes: RouteBinder = new Map();
  protected headRoutes: RouteBinder = new Map();
  protected patchRoutes: RouteBinder = new Map();
  protected postRoutes: RouteBinder = new Map();
  protected putRoutes: RouteBinder = new Map();

  constructor() {
    this.routes.set('delete', this.deleteRoutes);
    this.routes.set('get', this.getRoutes);
    this.routes.set('head', this.headRoutes);
    this.routes.set('patch', this.patchRoutes);
    this.routes.set('post', this.postRoutes);
    this.routes.set('put', this.putRoutes);
  }

  get routes() {
    return this.routeMappings;
  }
}
