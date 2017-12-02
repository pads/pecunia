import { Request, Response } from 'express';

export default abstract class BaseController {
  public abstract async handle(request: Request, response: Response): Promise<void>;
  public abstract async action(...args: any[]): Promise<void>;
}
