const cluster = require('cluster');
const os = require('os');
const http = require('http');
const app = require('./app');

if (cluster.isMaster) {

    let cpuCore = os.cpus().length;

    for (let i = 0; i < cpuCore; i++) {

        cluster.fork();
    }

    let workerId;
    let workerCount = [];

    for (workerId in cluster.workers) {

        workerCount.push(workerId);
    }
    workerCount.forEach(async workerId => {

        await cluster.workers[workerId].send({

            from: 'master',
            text: 'SIGKILL'
        });
    });
    cluster.on('online', worker => {

        if (worker.isConnected()) console.log(`worker is active ${worker.process.pid}`);

    });
    cluster.on('exit', worker => {

        if (worker.isDead()) console.log(`worker is dead ${worker.process.pid}`);

        cluster.fork();
    });


} else {

    if (cluster.isWorker) {
        process.on('message', msg => {

            if (msg.type == 'SIGKILL') {

                process.exit(0);

            } else {

                http.createServer(app).listen(process.env.PORT);
            }
        });
    }
}