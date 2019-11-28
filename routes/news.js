const express = require('express');
const passport = require('passport');
const NewsService = require('../services/news');

const {
  newIdSchema,
  createnewschema,
  updatenewschema
} = require('../utils/schemas/news');

const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

// JWT strategy
require('../utils/auth/strategies/jwt');

function newsApi(app) {
  const router = express.Router();
  app.use('/api/news', router);

  const newsService = new NewsService();

  router.get(
    '/',
    // passport.authenticate('jwt', { session: false }),
    // scopesValidationHandler(['read:products']),
    async function(req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { idcategory } = req.query;
      try {
        //const products = await Promise.resolve(productsMock)
        const news = await newsService.getNews({ idcategory });
        // const products = await productsService.getProducts();
        res.status(200).json({ data: news, message: 'news listed' });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/:newId',
    // passport.authenticate('jwt', { session: false }),
    // scopesValidationHandler(['read:news']),
    // validationHandler({ newId: newIdSchema }, 'params'),
    async function(req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { newId } = req.params;
      console.log("New param ", newId)
      try {
        const news = await newsService.getNew({ newId });

        res.status(200).json({
          data: news,
          message: 'new retrieved'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post('/', 
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['create:news']),
  validationHandler(createnewschema), async function(
    req,
    res,
    next
  ) {
    const { body: neww } = req;
    try {
      const createNewId = await newsService.createNew({ neww });

      res.status(201).json({
        data: createNewId,
        message: 'New created'
      });
    } catch (err) {
      next(err);
    }
  });

  router.put(
    '/:newId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:news']),
    validationHandler({ newId: newIdSchema }, 'params'),
    validationHandler(updatenewschema),
    async function(req, res, next) {
      const { newId } = req.params;
      const { body: neww } = req;
      try {
        const updateNewId = await newsService.updateNew({
          newId,
          neww
        });

        res.status(200).json({
          data: updateNewId,
          message: 'new updated'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:newId',
    // passport.authenticate('jwt', { session: false }),
    // scopesValidationHandler(['deleted:news']),
    // validationHandler({ newId: newIdSchema }, 'params'),
    async function(req, res, next) {
      const { newId } = req.params;
      try {
        const deleteNewId = await newsService.deleteProduct({ newId });

        res.status(200).json({
          data: deleteNewId,
          message: 'new deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = newsApi;
