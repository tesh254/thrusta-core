import Net from "net";
import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import "./queues";
import { addStatsToQueue } from "./queues/jobs";


// Start the server
const port = Number(process.env.PORT || 3500);
const tcpPort = Number(process.env.TCP_PORT || 6000);

const tcpServer = Net.createServer();

tcpServer.listen(tcpPort, "127.0.0.1", () => {
    logger.info("TCP server has started: " + tcpPort);
})

tcpServer.on("connection", (sock) => {
    console.log("A node just connected")

    sock.write("Details received")

    sock.on("data", async (data: any) => {
        await addStatsToQueue(JSON.parse(data))
        tcpServer.emit("close")
    })

    sock.on('end', function () {
        console.log('Closing connection with the client');
    });

    sock.on('error', function (err) {
        console.log(`Error: ${err}`);
    });
})

app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
