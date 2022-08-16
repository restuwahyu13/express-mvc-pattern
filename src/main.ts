import 'reflect-metadata'
import 'dotenv/config'
import 'express-async-errors'
import express, { Express } from 'express'
import http, { Server } from 'http'
import { Connection, createConnection, useContainer } from 'typeorm'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import zlib from 'zlib'
import hpp from 'hpp'
import reload from 'reload'
import staticGzip from 'express-static-gzip'

import { Container, Injectable, Context, Router } from '@helpers/helper.di'
import { AppModule } from '@/app.module'

@Injectable()
class App {
  private app: Express
  private server: Server
  private env: string
  private port: number

  constructor() {
    this.app = express()
    this.server = http.createServer(this.app)
    this.env = process.env.NODE_ENV as any
    this.port = process.env.PORT as any
  }

  private connection(): Promise<Connection> {
    useContainer(Context)
    return createConnection()
  }

  private config(): void {
    this.app.set('views', path.resolve(__dirname, 'views'))
    this.app.set('view engine', 'ejs')
    this.app.disable('x-powered-by')
    Container.resolve<AppModule>(AppModule)
  }

  private middleware(): void {
    this.app.use(express.static('.'))
    this.app.use(bodyParser.json({ limit: '1mb' }))
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(helmet({ contentSecurityPolicy: false }))
    this.app.use(hpp({ checkBody: true, checkQuery: true }))
    this.app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'HEAD'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true
      })
    )
    this.app.use(
      compression({
        strategy: zlib.constants.Z_RLE,
        level: zlib.constants.Z_BEST_COMPRESSION,
        memLevel: zlib.constants.Z_BEST_COMPRESSION
      })
    )
    this.app.use(staticGzip('.', {
        enableBrotli: true,
        index: false,
        customCompressions: [
          { encodingName: 'gz', fileExtension: 'css' },
          { encodingName: 'gz', fileExtension: 'js' },
          { encodingName: 'gz', fileExtension: 'html' },
          { encodingName: 'gz', fileExtension: 'png' },
          { encodingName: 'gz', fileExtension: 'jpeg' },
          { encodingName: 'gz', fileExtension: 'jpg' },
          { encodingName: 'gz', fileExtension: 'svg' },
          { encodingName: 'br', fileExtension: 'css' },
          { encodingName: 'br', fileExtension: 'js' },
          { encodingName: 'br', fileExtension: 'html' },
          { encodingName: 'br', fileExtension: 'png' },
          { encodingName: 'br', fileExtension: 'jpeg' },
          { encodingName: 'br', fileExtension: 'jpg' },
          { encodingName: 'br', fileExtension: 'svg' }
        ]
      })
    )
    if (!['production', 'test'].includes(this.env)) {
      this.app.use(morgan('dev'))
    }
  }

  private route(): void {
    this.app.use('**', Container.resolve<Router>('PingModule'))
  }

  private run(): void {
    const serverInfo: string = `Server is running on port: ${this.port} - ${this.env}`
    const server: Server = this.server
    const port: number = this.port

    if (process.env.NODE_ENV === 'development') {
      reload(this.app)
        .then(function () {
          server.listen(port, () => console.info(serverInfo))
        })
        .catch(function (err: any) {
          console.error(`Live reload not working: ${err}`)
        })
    } else {
      server.listen(port, () => console.info(serverInfo))
    }
  }

  public main(): void {
     this.connection()
     this.config()
     this.middleware()
     this.route()
     this.run()
  }
}

/**
 * @description boostraping app and run app with env development / production
 */

;(function () {
  Container.resolve<App>(App).main()
})()
