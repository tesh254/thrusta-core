import net from "net";
import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';


// Start the server
const port = Number(process.env.PORT || 3500);
const tcpPort = Number(process.env.TCP_PORT || 6000);

const tcpServer = net.createServer();

tcpServer.listen(tcpPort, "127.0.0.1", () => {
    logger.info("TCP server has started: " + tcpPort);
})

app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
