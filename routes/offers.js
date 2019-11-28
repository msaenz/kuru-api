const express = require('express');
const passport = require('passport');
const OffersService = require('../services/offers');

const {
  newIdSchema,
  createofferschema,
  updateofferschema
} = require('../utils/schemas/offers');

const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

// JWT strategy
require('../utils/auth/strategies/jwt');

function offersApi(app) {
  const router = express.Router();
  app.use('/api/offers', router);

  const offersService = new OffersService();

  router.get(
    '/',
    // passport.authenticate('jwt', { session: false }),
    // scopesValidationHandler(['read:products']),
    async function(req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { idcategory } = req.query;
      try {
        //const products = await Promise.resolve(productsMock)
        const offers = await offersService.getOffers({ idcategory });
        // const products = await productsService.getProducts();
        res.status(200).json({ data: offers, message: 'offers listed' });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/:newId',
    // passport.authenticate('jwt', { session: false }),
    // scopesValidationHandler(['read:offers']),
    // validationHandler({ newId: newIdSchema }, 'params'),
    async function(req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { newId } = req.params;
      try {
        const offers = await offersService.getOffer({ newId });

        res.status(200).json({
          data: offers,
          message: 'new retrieved'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post('/', 
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['create:offers']),
  validationHandler(createofferschema), async function(
    req,
    res,
    next
  ) {
    const { body: neww } = req;
    try {
      const createOfferId = await offersService.createOffer({ neww });

      res.status(201).json({
        data: createOfferId,
        message: 'Offer created'
      });
    } catch (err) {
      next(err);
    }
  });

  router.put(
    '/:newId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:offers']),
    validationHandler({ newId: newIdSchema }, 'params'),
    validationHandler(updateofferschema),
    async function(req, res, next) {
      const { newId } = req.params;
      const { body: neww } = req;
      try {
        const updateOfferId = await offersService.updateOffer({
          newId,
          neww
        });

        res.status(200).json({
          data: updateOfferId,
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
    // scopesValidationHandler(['deleted:offers']),
    // validationHandler({ newId: newIdSchema }, 'params'),
    async function(req, res, next) {
      const { newId } = req.params;
      try {
        const deleteOfferId = await offersService.deleteProduct({ newId });

        res.status(200).json({
          data: deleteOfferId,
          message: 'new deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = offersApi;
