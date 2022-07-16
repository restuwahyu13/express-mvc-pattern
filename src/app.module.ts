import { Container, Injectable, Module, Router } from '@helpers/helper.di'
import { PingModule } from '@modules/module.ping'

@Module([
  {
    token: 'PingModule',
    useFactory: (): Router => {
      return Container.resolve(PingModule).route.main()
    }
  }
])
@Injectable()
export class AppModule {}
