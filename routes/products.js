const express = require('express');
const passport = require('passport');
const ProductsService = require('../services/products');

const {
  productIdSchema,
  createproductschema,
  updateproductschema
} = require('../utils/schemas/products');

const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

// JWT strategy
require('../utils/auth/strategies/jwt');

function productsApi(app) {
  const router = express.Router();
  app.use('/api/products', router);

  const productsService = new ProductsService();

  router.get(
    '/',
    // passport.authenticate('jwt', { session: false }),
    // scopesValidationHandler(['read:products']),
    async function(req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      try {
        //const products = await Promise.resolve(productsMock)
        const products = await productsService.getProducts();
        // const products = await productsService.getProducts();
        res.status(200).json({ data: products, message: 'products listed' });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/category/:idcategory',
    // passport.authenticate('jwt', { session: false }),
    // scopesValidationHandler(['read:products']),
    async function(req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { idcategory } = req.params;
      try {
        //const products = await Promise.resolve(productsMock)
        const products = await productsService.getProductsCat({ idcategory });
        // const products = await productsService.getProducts();
        res.status(200).json({ data: products, message: 'products Category listed' });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/:idproducto',
    // passport.authenticate('jwt', { session: false }),
    // scopesValidationHandler(['read:products']),
    // validationHandler({ productId: productIdSchema }, 'params'),
    async function(req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { idproducto } = req.params;
      try {
        //const products = await Promise.resolve(productsMock[0])
        const products = await productsService.getProduct(idproducto);

        res.status(200).json({
          data: products,
          message: 'product retrieved'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post('/', 
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['create:products']),
  validationHandler(createproductschema), async function(
    req,
    res,
    next
  ) {
    const { body: product } = req;
    try {
      const createProductId = await productsService.createProduct({ product });

      res.status(201).json({
        data: createProductId,
        message: 'product created'
      });
    } catch (err) {
      next(err);
    }
  });

  router.put(
    '/:productId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:products']),
    validationHandler({ productId: productIdSchema }, 'params'),
    validationHandler(updateproductschema),
    async function(req, res, next) {
      const { productId } = req.params;
      const { body: product } = req;
      try {
        const updateProductId = await productsService.updateProduct({
          productId,
          product
        });

        res.status(200).json({
          data: updateProductId,
          message: 'product updated'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:productId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['deleted:products']),
    validationHandler({ productId: productIdSchema }, 'params'),
    async function(req, res, next) {
      const { productId } = req.params;
      try {
        const deleteProductId = await productsService.deleteProduct({ productId });

        res.status(200).json({
          data: deleteProductId,
          message: 'product deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = productsApi;
