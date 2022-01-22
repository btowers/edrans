import server from "./services/server";
import cluster from "cluster";
import os from "os";
import dotenv from "dotenv";
import config from "./config";
import { loggerS } from "./services/logger";

const numCPUs = os.cpus().length;
dotenv.config();

if (cluster.isMaster && config.MODE === "cluster") {
  loggerS.info(`NUMERO DE CPUS ===> ${numCPUs}`);
  loggerS.info(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    loggerS.warn(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {
  server.listen(config.PORT, () => {
    loggerS.info(`Server: Running on port ${config.PORT}`);
  });

  server.on("error", (error) => {
    loggerS.error(`Server: ${error}`);
  });
}
