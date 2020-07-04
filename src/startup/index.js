const express = require("express");

let _express = null;
let _config = null;

class Server {
  constructor({ config, router }) {
    _config = config;
    _express = express().use(router);
  }
  //carga una promesa que inicializa nuestro server
  start() {
    return new Promise(resolve => {
      _express.listen(_config.PORT, () => {
        console.log(
          _config.APPLICATION_NAME + " API running on port " + _config.PORT
        );

        resolve();
      });
    });
  }
}

module.exports = Server;
