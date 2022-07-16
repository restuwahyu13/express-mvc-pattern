import { Request, Response, Handler, NextFunction } from 'express'

import { PingService } from '@services/service.ping'
import { Controller, Inject } from '@helpers/helper.di'
import { APIResponse } from '@helpers/helper.apiResponse'

@Controller()
export class PingController {
  constructor(@Inject('PingService') private service: PingService) {}

  ping(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const response: APIResponse = await this.service.ping()
        res.status(response.stat_code).render('ping', response)
      } catch (e: any) {
        res.status(e.stat_code).render('error', { error: e })
      }
    }
  }
}
