### Express Model View Controller Pattern (MVC)

**Berikut adalah** gambaran bagaimana kita dapat menerapkan sebuah konsep **MVC** pada aplikasi **NodeJS** kita mengunakan **Express Framework**, yang nantinya bisa teman - teman terapkan saat membuat sebuah aplikasi dengan mengunakan `Nodejs like Expres` atau yang lainnya.

![](https://i.imgur.com/aosyh92.png)

#### Cara Menjalankan:

- install semua module terlebih dahulu dengan mengetikan `npm install` atau `yarn add`

- untuk menjalankannya silahkan ketikan `npm run dev` atau `yarn run dev`

#### Endpoint Route:

| Name              | Endpoint Route                    |
| ----------------- | --------------------------------- |
| home              | http://localhost:3000             |
| create mahasiswa  | http://localhost:3000/mhs/create  |
| results mahasiswa | http://localhost:3000/mhs/results |
| result mahasiswa  | http://localhost:3000/mhs/result  |
| delete mahasiswa  | http://localhost:3000/mhs/delete  |
| update mahasiswa  | http://localhost:3000/mhs/update  |

#### Struktur Folder:

- app
- controllers
- helpers
- libs
- middlewares
- models
- routes
- views
- configs
- core
- public

#### Penjelasan Strukture Folder:

- **app** tempat yang berisi untuk menyimpan, semua fungsi dari aplikasi yang nantinya akan kita buat

- **controller** tempat yang berisi semua logic dari aplikasi tersebut seperti untuk membuat tambah data mahasiswa, hapus data mahasiswa dll

- **helper** tempat yang berisi sebuah fungsi penolong sebagai utility untuk digunakan seperti **custome message, custome email template** dll

- **libs** tempat yang berisi untuk customisasi library yang telah kita install seperti **jwt, bcrypt** yang nantinya bisa kita custom menjadi sebuah fungsi tersendiri untuk digunakan

- **middleware** tempat yang berisi untuk custome function middleware yang digunakan untuk keperluan **auth jwt, auth role** dll

- **model** tempat yang berisi untuk melakukan pembuatan schema baik itu dengan **mongodb or mongoose** yang nantinya akan digunakan oleh **controller** sebagai bagian dari logic aplikasi itu sendiri

- **route** tempat yang berisi untuk pembuatan routing pada aplikasi untuk meneruskan fungsi dari **controller ke view**

- **config** tempat yang berisi untuk pembuatan konfigurasi dari **database** atau yang lainnya

- **core** tempat pengendali atau inti dari aplikasi dari **model**, **controller**, **route** dan **view**

- **public** tempat yang berisi untuk penyimpanan asset static seperti **CSS**, **JavaScript**, **Gambar** dll

## Berikut adalah contoh dari masing - masing fungsi:

#### Core Controller

```javascript
class Controller {
  get(...rest) {
    return router.get(...arguments)
  }
  post(...rest) {
    return router.post(...arguments)
  }
  delete(...rest) {
    return router.delete(...arguments)
  }
  put(...rest) {
    return router.put(...arguments)
  }
}

module.exports = { Controller }
```

#### Core Model

```javascript
class Model {
  constructor(schema) {
    this.model = schema
  }

  findAll(value) {
    const { model, connection } = this
    connection()
    return model.find({ ...value }).lean()
  }
  findOne(value) {
    const { model } = this
    return model.findOne({ ...value }).lean()
  }
  findById(value) {
    const { model } = this
    return model.findById(value).lean()
  }
  findOneAndCreate(value) {
    const { model } = this
    return model.create({ ...value })
  }
  findOneAndDelete(value) {
    const { model } = this
    return model.findOneAndDelete({ ...value }).lean()
  }
  findOneAndUpdate(id, value) {
    const { model } = this
    return model.findOneAndUpdate({ ...id }, { $set: { ...value } }).lean()
  }
}

module.exports = { Model }
```

#### Core Route

```javascript
class Route {
  init() {
    return [
      // init mahasiswa route
      new CreateMahasiswaRoute().route(),
      new ResultsMahasiswaRoute().route(),
      new ResultMahasiswaRoute().route(),
      new DeleteMahasiswaRoute().route(),
      new UpdateMahasiswaRoute().route(),

      //init home route
      new HomeRoute().route(),
      new AboutRoute().route()
    ]
  }
}

module.exports = { Route }
```

#### Core View

```javascript
class View {
  render(res, view, data) {
    res.render(resolve(process.cwd(), `app/views/${view}`), { ...data })
  }
}

module.exports = { View }
```

#### Config Connection

```javascript
class Connection extends Module {
  constructor() {
    super()
    this.db = this.mongoose()
  }
  async MongooseConnection() {
    const { db } = this
    const connection = await db.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })

    if (!connection) return console.log('Database Connection Failed')
    return console.log('Database Connection Successfuly')
  }
}

module.exports = { Connection }
```

#### Config Module

```javascript
class Module {
  constructor(app) {
    this.app = app
  }
  dotenv() {
    const env = dotenv.config()
    return env
  }
  bodyParser() {
    const { app } = this

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
  }
  mongoose() {
    mongoose.Promise = global.Promise
    return mongoose
  }
  morgan() {
    const { app } = this
    app.use(logger('dev'))
  }
  event() {
    const events = new EventEmitter()
    return events
  }

  jwt() {
    return jsonwebtoken
  }

  template() {
    const { app } = this
    app.set('views', path.resolve(process.cwd(), 'views'))
    app.set('view engine', 'ejs')
  }

  assets() {
    const { app } = this
    app.use(express.static(path.resolve(process.cwd(), 'public/assets/')))
  }
}

module.exports = { Module }
```

#### App Controller

```javascript
class CreateMahasiswaController extends Model {
  constructor() {
    super()
    this.model = new Model(mhsSchema)
    this.jwt = new Jwt()
  }

  async controller(req, res) {
    const { model, jwt } = this
    const { nama, npm, bid, fak } = req.body
    const user = await model.findOne({ nama, npm, bid, fak })

    if (user) {
      return new CustomeMessage(res).error(409, {
        response: {
          status: 'error',
          code: res.statusCode,
          method: req.method,
          message: 'Oops..data already exists in database',
          data: user
        }
      })
    }

    const { _id } = await model.findOneAndCreate({ nama, npm, bid, fak })
    const token = jwt.createToken({ _id, nama }, { expiresIn: '1d', algorithm: 'HS384' })
    return new CustomeMessage(res).success(200, {
      response: {
        status: 'success',
        code: res.statusCode,
        method: req.method,
        message: 'Yeah..data successuly store in database',
        access_token: token
      }
    })
  }
}

module.exports = { CreateMahasiswaController }
```

#### App Route

```javascript
class CreateMahasiswaRoute extends Controller {
  constructor() {
    super()
  }
  route() {
    return this.post('/mhs/create', (req, res) => new CreateMahasiswaController().controller(req, res))
  }
}

module.exports = { CreateMahasiswaRoute }
```

#### App

```javascript
class App extends Route {
  init() {
    if (cluster.isMaster) {
      let cpuCore = os.cpus().length
      for (let i = 0; i < cpuCore; i++) {
        cluster.fork()
      }
      cluster.on('online', (worker) => {
        if (worker.isConnected()) console.log(`worker is active ${worker.process.pid}`)
      })

      cluster.on('exit', (worker) => {
        if (worker.isDead()) console.log(`worker is dead ${worker.process.pid}`)
        cluster.fork()
      })
    } else {
      //init default route
      app.use(super.init())
      // listenint server port
      http.createServer(app).listen(process.env.PORT)
    }
  }
}

// init application
new App().init()
```

**Semoga** dengan adanya tutorial ini bisa membantu teman - teman semua yang sedang belajar, khususnya belajar **NodeJs** dan nantinya bisa menerapkan konsep **MVC** pada aplikasi yang akan dibuat oleh teman - teman. **Terimakasih**
