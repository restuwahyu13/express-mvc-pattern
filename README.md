## Example MVC Architecture in Express

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
  constructor(app) {
    this.app = app
  }
  get(...rest) {
    const { app } = this
    app.get(...arguments)
  }
  post(...rest) {
    const { app } = this
    app.post(...arguments)
  }
  delete(...rest) {
    const { app } = this
    app.delete(...arguments)
  }
  put(...rest) {
    const { app } = this
    app.put(...arguments)
  }
}

module.exports = { Controller }
```

#### Core Model

```javascript
class Model {
  constructor(collection, schema) {
    this.model = new Module().mongoose().model(collection, schema)
  }
  findAll() {
    const { model } = this
    return model.find({}).lean()
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
    const user = model
      .findOne({ ...value })
      .lean()
      .exec(async (err, doc) => {
        if (err) return error
        const dataBody = new model({ ...value })
        return dataBody.save()
      })
  }
  findOneAndDelete(value) {
    const { model } = this
    return model.findOneAndDelete({ ...value }).lean()
  }
  findOneAndUpdate(action, value) {
    const { model } = this
    return model.findOneAndUpdate({ ...action }, { $set: { ...value } }).lean()
  }
}

module.exports = { Model }
```

#### Core Route

```javascript
class Route {
  Routes(app) {
    return [
      // init mahasiswa route
      new CreateMahasiswaRoute(app).route(),
      new ResultsMahasiswaRoute(app).route(),
      new ResultMahasiswaRoute(app).route(),
      new DeleteMahasiswaRoute(app).route(),
      new UpdateMahasiswaRoute(app).route(),

      // init refesh token route
      new RefeshTokenRoute(app).route(),

      //init home route
      new HomeRoute(app).route(),
      new AboutRoute(app).route()
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
      useFindAndModify: true
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
  constructor(collection, schema, req, res) {
    super()
    this.req = req
    this.res = res
    this.model = new Model(collection, schema)
    this.msg = new CustomeMessage(res)
    this.jwt = new Jwt()
  }

  async controller() {
    const { req, res, model, msg, jwt } = this
    const { name, npm, bid, fak } = req.body
    const user = await model.findOneAndCreate({ name, npm, bid, fak })

    if (user) {
      msg.error('error', 409, {
        response: {
          status: 'error',
          code: res.statusCode,
          method: req.method,
          message: 'Oops..data already exists in database',
          data: { ...user }
        }
      })
    }

    const token = jwt.createToken({ _id, name }, { expiresIn: '1d', algorithm: 'HS384' })
    msg.success('success', 200, {
      response: {
        status: 'success',
        code: res.statusCode,
        method: req.method,
        message: 'Yeah..data successuly store in database',
        data: {
          secret: token
        }
      }
    })
  }
}

module.exports = { CreateMahasiswaController }
```

#### App Route

```javascript
class CreateMahasiswaRoute extends Controller {
  constructor(app) {
    super()
    this.controller = new Controller(app)
    this.schema = mhsSchema
  }
  route() {
    const { controller, schema } = this
    controller.post('/mhs/create', (req, res) => {
      return new CreateMahasiswaController('mhs', schema, req, res).Controller()
    })
  }
}

module.exports = { CreateMahasiswaRoute }
```

#### App

```javascript
class App {
  server() {
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
      return http.createServer(app).listen(process.env.PORT)
    }
  }
}

// init application
new App().server()
```

**Semoga** dengan adanya tutorial ini bisa membantu teman - teman semua yang sedang belajar, khususnya belajar **NodeJs** dan nantinya bisa menerapkan konsep **MVC** pada aplikasi yang akan dibuat oleh teman - teman. **Terimakasih**
