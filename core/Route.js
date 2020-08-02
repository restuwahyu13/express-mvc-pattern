// route mahasiswa
const { CreateMahasiswaRoute } = require(`${process.cwd()}/app/routes/mhs/create.route`)
const { ResultsMahasiswaRoute } = require(`${process.cwd()}/app/routes/mhs/results.route`)
const { ResultMahasiswaRoute } = require(`${process.cwd()}/app/routes/mhs/result.route`)
const { DeleteMahasiswaRoute } = require(`${process.cwd()}/app/routes/mhs/delete.route`)
const { UpdateMahasiswaRoute } = require(`${process.cwd()}/app/routes/mhs/update.route`)
// route refesh token
const { RefeshTokenRoute } = require(`${process.cwd()}/app/routes/refesh/refesh.route`)
//route home
const { HomeRoute } = require(`${process.cwd()}/app/routes/home/home.route`)
const { AboutRoute } = require(`${process.cwd()}/app/routes/home/about.route`)

class Route {
  defaultRoute(app) {
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

module.exports = { Route }
