const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy('/lancer', {
      target: 'https://api.ezcarsharing.com',
      changeOrigin: false
    })
  );
};