import { Inject, Injectable, Module } from '@helpers/helper.di'
import { PingService } from '@services/service.ping'
import { PingController } from '@controllers/controller.ping'
import { PingRoute } from '@routes/route.ping'

@Module([
  { token: 'PingService', useClass: PingService },
  { token: 'PingController', useClass: PingController },
  { token: 'PingRoute', useClass: PingRoute }
])
@Injectable()
export class PingModule {
  constructor(@Inject('PingRoute') public route: PingRoute) {}
}
