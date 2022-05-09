import cors from 'cors';
import express from 'express';
import { initializeDbConnection } from './db';
import { routes } from './routes';

const path = require('path')
const url = require('url');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const parsedUrl = url.parse(process.env.SERVER_URL);
const PORT = parsedUrl.port || 8080;


const app = express();

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, '..', 'assets')));
app.use(express.static(path.join(__dirname, '/public/assets/')));


// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach(route => {
  app[route.method](route.path, route.handler);
});

// Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.
initializeDbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  });


