##Example MVC Architecture in  Express 

**Berikut adalah** gambaran bagaimana kita dapat menerepkan sebuah konsep **MVC** pada aplikasi **NodeJS** kita mengunakan **Express Framework**, yang nantinya bisa teman - teman terapkan saat membuat sebuah aplikasi dengan mengunakan `Nodejs like Expres ` atau yang lainnya.

![](https://i.imgur.com/aosyh92.png)

#### cara menjalankannya:
- install semua module terlebih dahulu dengan mengetikan `npm install ` atau `yarn add`

- untuk menjalankannya silahkan ketikan `npm run dev` atau `yarn run dev`

#### Endpoint Route:

| Name  | Endpoint Route |
| ------------- | ------------- |
| home  |   http://localhost:3000  |
| create mahasiswa  |  http://localhost:3000/mhs/create  |
| results mahasiswa |   http://localhost:3000/mhs/results  |
| result mahasiswa |   http://localhost:3000/mhs/result  |
| delete mahasiswa |   http://localhost:3000/mhs/delete  |
| update mahasiswa |   http://localhost:3000/mhs/update  |
| refesh token |   http://localhost:3000/mhs/update  |

#### Struktur Folder:

+ app
 + controllers
 + helpers
 + libs
 + middlewares
 +  models
 + routes
 + views
+ configs
+ core
+ public

#### Penjelasan Strukture Folder:

- **app** :  tempat yang berisi untuk menyimpan, semua fungsi  dari aplikasi yang nantinya akan kita buat

- **controller** : tempat yang berisi semua logic dari aplikasi tersebut seperti untuk membuat tambah data mahasiswa, hapus data mahasiswa dll

- **helper**: tempat yang berisi sebuah fungsi penolong sebagai utility untuk digunakan seperti **custome message, custome email template** dll

- **libs** tempat yang berisi untuk customisasi library  yang telah kita install seperti **jwt, bcrypt** yang nantinya bisa kita custom menjadi sebuah fungsi tersendiri untuk digunakan

- **middleware** tempat yang berisi  untuk custome function middleware yang digunakan untuk keperluan **auth jwt, auth role** dll

- **model**: tempat yang berisi  untuk melakukan pembuatan schema baik itu dengan **mongodb or mongoose** yang nantinya akan digunakan oleh **controller** sebagai bagian dari logic aplikasi itu sendiri

- **route** tempat yang berisi untuk pembuatan routing pada aplikasi untuk meneruskan fungsi dari **controller ke view**

- **config** tempat yang berisi untuk pembuatan konfigurasi dari **database** atau yang lainnya

- **core** tempat pengendali atau inti dari aplikasi dari **model**, **controller**, **route** dan **view**

- **public** tempat yang berisi untuk penyimpanan asset static seperti **CSS**, **JavaScript**, **Gambar** dll

## Berikut adalah contoh dari masing - masing fungsi:

#### Core Controller

```javascript
class Controller {
    constructor(app) {

        this.app = app;
    }
    GET(route, auth, callback) {

        const { app } = this;

        app.get(route, auth, callback);
    }
    POST(route, callback) {

        const { app } = this;

        app.post(route, callback);
    }
    DELETE(route, auth, callback) {

        const { app } = this;

        app.delete(route, auth, callback);
    }
    PUT(route, auth, callback) {

        const { app } = this;

        app.put(route, auth, callback);
    }
}
module.exports = { Controller };
```
#### Core Model

```javascript
const { Module } = require('../configs/Module');
class Model {
    constructor(collection, schema) {

        this.model = new Module().mongoose().model(collection, schema);
    }
    findAll() {

        const { model } = this;
        return model.find({}).lean(true);
    }
    findOne(value) {

        const { model } = this;
        return model.findOne({...value }).lean(true);
    }
    create(value) {

        const { model } = this;
        const data = new model({...value });
        return data.save();
    }
    delete(value) {

        const { model } = this;
        return model.deleteOne({...value });
    }
    update(action, value) {

        const { model } = this;
        return model.updateOne({...action }, {...value });
    }
}
module.exports = { Model };
```

#### Core Route

```javascript
// route mahasiswa
const { CreateMahasiswaRoute } = require('../app/routes/mhs.route/create.route');
const { ResultsMahasiswaRoute } = require('../app/routes/mhs.route/results.route');
const { ResultMahasiswaRoute } = require('../app/routes/mhs.route/result.route');
const { DeleteMahasiswaRoute } = require('../app/routes/mhs.route/delete.route');
const { UpdateMahasiswaRoute } = require('../app/routes/mhs.route/update.route');

// route refesh token
const { RefeshTokenRoute } = require('../app/routes/refesh.route/refesh.route');

//route home
const { HomeRoute } = require('../app/routes/home.route/home.route');
const { AboutRoute } = require('../app/routes/home.route/about.route');

class Route {
    static defaultRoute(app) {

        return [

            // init mahasiswa route
            new CreateMahasiswaRoute(app).Route(),
            new ResultsMahasiswaRoute(app).Route(),
            new ResultMahasiswaRoute(app).Route(),
            new DeleteMahasiswaRoute(app).Route(),
            new UpdateMahasiswaRoute(app).Route(),

            // init refesh token route
            new RefeshTokenRoute(app).Route(),

            //init home route
            new HomeRoute(app).Route(),
            new AboutRoute(app).Route()
        ]
    }
}
module.exports = { Route };
```

#### Core View

```javascript
class View {
    static view(res, view, data) {
        res.render('../../app/views/' + view, data);
    }
}
module.exports = { View };
```
#### Config Connection

```javascript
const { Module } = require('./Module');
class Connection extends Module {
    constructor() {

        super();

        this.db = this.mongoose();
    }
    MongooseConnection() {

        const { db } = this;

        db.connect(process.env.URI_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true })
            .then(() => console.log('Database Connected'))
            .catch(() => console.log('Database Error'));
    }
}
module.exports = { Connection };
```
#### Config Module

```javascript
class Module {
    constructor(app = null) {

        this.app = app;
    }
    dotenv() {

        const dotenv = require('dotenv');
        const env = dotenv.config();
        return env;
    }
    bodyParser() {

        const { app } = this;

        const bodyParser = require('body-parser');
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
    }
    mongoose() {

        const mongoose = require('mongoose');
        mongoose.Promise = global.Promise;
        return mongoose;
    }
    morgan() {

        const { app } = this;

        const logger = require('morgan');
        app.use(logger('dev'));
    }
    event() {

        const EventEmitter = require('events');
        const events = new EventEmitter;
        return events;
    }

    jwt() {

        const jwt = require('jsonwebtoken');
        return jwt;
    }

    template() {

        const { app } = this;
        const path = require('path');

        app.set('views', path.join(__dirname, '/views'));
        app.set('view engine', 'ejs');
    }

    assets(express) {

        const { app } = this;
        const path = require('path');
        app.use(express.static(path.join(__dirname, '../public/assets/')));
    }
}
module.exports = { Module };
```
#### App Controller

```javascript
const { Model } = require('../../../core/Model');
const { CustomeMessage } = require('../../helpers/customeMessage');
class ResultsMahasiswaController extends Model {
    constructor(collection, schema, req, res) {

        super(collection, schema);
        this.req = req;
        this.res = res;
        this.model = new Model(collection, schema);
        this.msg = new CustomeMessage(res);
    }
    async Controller() {

        const { req, res, model, msg } = this;
        await model.findAll().then((result) => {

            if (result) {
                msg.success('success', 200, {

                    response: {

                        status: 'success',
                        code: res.statusCode,
                        method: req.method,
                        message: 'Yeah..data already to use',
                        data: {
                            result: result
                        }
                    }
                });

            } else {

                msg.error('error', 404, {

                    response: {

                        status: 'error',
                        code: 404,
                        method: req.method,
                        message: 'Oops..data not found in database or deleted'
                    }
                });
            }
        }).catch(err => {

            msg.error('error', 500, {

                response: {

                    status: 'error',
                    code: res.statusCode,
                    method: req.method,
                    message: `Internal server error ${err}`
                }
            });
        });
    }
}
module.exports = { ResultsMahasiswaController };
```

#### App Route

```javascript
const { CreateMahasiswaController } = require('../../controllers/mhs.controller/create.controller');
const { mhsSchema } = require('../../models/mhs.model');
const { Controller } = require('../../../core/Controller');

class CreateMahasiswaRoute extends Controller {
    constructor(app) {

        super(app);
        this.controller = new Controller(app);
        this.schema = mhsSchema;
    }
    Route() {

        const { controller, schema } = this;
        controller.POST('/mhs/create', (req, res) => {

            return new CreateMahasiswaController('mhs', schema, req, res).Controller();
        });
    }
}
module.exports = { CreateMahasiswaRoute };
```

**Semoga** dengan adanya tutorial ini  bisa membantu teman - teman semua yang sedang belajar, khususnya belajar **NodeJs** dan nantinya bisa menerapkan konsep **MVC** pada aplikasi yang akan dibuat oleh teman - teman. **Terimakasih**
