import { PingController } from '@controllers/controller.ping'
import { Inject, Route, Router } from '@helpers/helper.di'

@Route()
export class PingRoute {
  private router: Router

  constructor(@Inject('PingController') private controller: PingController) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.all('**', this.controller.ping())

    return this.router
  }
}
