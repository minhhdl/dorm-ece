const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { parse } = require('url');
const next = require('next');
const { join } = require('path');
const mongoose = require('mongoose');
const initData = require('./initData');
const customRoute = require('./routes');
const api = require('./api');

const port = parseInt(process.env.PORT, 10) || 5000;
const dev = process.env.NODE_ENV !== 'production';


const app = next({ dev });
const handler = customRoute.getRequestHandler(app);


app.prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(cookieParser());

    mongoose.connect('mongodb://dorm:dorm2019@ds123361.mlab.com:23361/heroku_258nvtfj');
    // mongoose.connect('mongodb://localhost/dorm');
    initData();

    server.use('/api', api);

    // use next.js
    server.get('*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      const rootStaticFiles = [
        '/img',
      ];
      const pathname = parsedUrl.pathname || '';
      const isServeStatic = rootStaticFiles.some(i => pathname.includes(i));
      if (isServeStatic) {
        const path = join(__dirname, '../static', parsedUrl.pathname);
        return app.serveStatic(req, res, path);
      }
      return handler(req, res, parsedUrl);
    });
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });