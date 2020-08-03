const cluster = require('cluster')
const os = require('os')
const http = require('http')
const app = require('./app')
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

new App().server()
