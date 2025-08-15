import http from 'http';
import socketClusterServer from "socketcluster-server";

let options = {
  origins: 'http://localhost:5173',
};
let httpServer = http.createServer();
let agServer = socketClusterServer.attach(httpServer, options);

(async () => {
  for await (let {socket} of agServer.listener('connection')) {

    (async () => {
      for await (let data of socket.receiver('test')) { console.log(data) }
    })();

    (async () => {
      // Set up a loop to handle and respond to RPCs.
      for await (let request of socket.procedure('getData')) {
        request.end('Success');
      }
    })();

    agServer.exchange.transmitPublish('room', 'transmitOk');
  }
})();

httpServer.listen(8000, () => console.log('server listening on port 8000'));