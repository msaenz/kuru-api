const express = require('express');
const helmet = require('helmet');
const app = express();

const { config } = require('./config/index');
const authApi = require('./routes/auth');
const productsApi = require('./routes/products.js');
const newsApi = require('./routes/news.js');
const offersApi = require('./routes/offers.js');
const categoriesApi = require('./routes/categories.js');
// const userMoviesApi = require('./routes/userMovies');

const {
  logErrors,
  errorHandler,
  wrapErrors
} = require('./utils/middleware/errorHandlers.js');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

//middelware de BODYPARSER
app.use(express.json());
app.use(helmet());

//routes
authApi(app);
productsApi(app);
newsApi(app);
offersApi(app);
categoriesApi(app);

// Catch error 404
app.use(notFoundHandler);

//middleware de errores debe ir al final de las rutas
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});
