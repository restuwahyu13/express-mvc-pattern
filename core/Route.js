// route mahasiswa
const { CreateMahasiswaRoute } = require(`${process.cwd()}/app/routes/mhs/create.route`)
const { ResultsMahasiswaRoute } = require(`${process.cwd()}/app/routes/mhs/results.route`)
const { ResultMahasiswaRoute } = require(`${process.cwd()}/app/routes/mhs/result.route`)
const { DeleteMahasiswaRoute } = require(`${process.cwd()}/app/routes/mhs/delete.route`)
const { UpdateMahasiswaRoute } = require(`${process.cwd()}/app/routes/mhs/update.route`)

//route home
const { HomeRoute } = require(`${process.cwd()}/app/routes/home/home.route`)
const { AboutRoute } = require(`${process.cwd()}/app/routes/home/about.route`)

class Route {
  route() {
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
