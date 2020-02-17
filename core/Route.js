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