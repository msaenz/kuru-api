const express = require('express');
const passport = require('passport');
const CategoriesService = require('../services/categories');

const {
  categoryIdSchema,
  createcategorieschema,
  updatecategorieschema
} = require('../utils/schemas/categories');

const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

// JWT strategy
require('../utils/auth/strategies/jwt');

function categoriesApi(app) {
  const router = express.Router();
  app.use('/api/categories', router);

  const categoriesService =  new CategoriesService();

  router.get(
    '/',
    // passport.authenticate('jwt', { session: false }),
    // scopesValidationHandler(['read:products']),
    async function(req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { idcategory } = req.query;
      try {
        //const products = await Promise.resolve(productsMock)
        const categories = await categoriesService.getCategories({ idcategory });
        // const products = await productsService.getProducts();
        res.status(200).json({ data: categories, message: 'categories listed' });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/:categoryId',
    // passport.authenticate('jwt', { session: false }),
    // scopesValidationHandler(['read:categories']),
    // validationHandler({ categoryId: categoryIdSchema }, 'params'),
    async function(req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { categoryId } = req.params;
      try {
        const categories = await categoriesService.getCategoty({ categoryId });

        res.status(200).json({
          data: categories,
          message: 'category retrieved'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post('/', 
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['create:categories']),
  validationHandler(createcategorieschema), async function(
    req,
    res,
    next
  ) {
    const { body: category } = req;
    try {
      const createCategoryId = await categoriesService.createCategory({ category });

      res.status(201).json({
        data: createCategoryId,
        message: 'New created'
      });
    } catch (err) {
      next(err);
    }
  });

  router.put(
    '/:categoryId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:categories']),
    validationHandler({ categoryId: categoryIdSchema }, 'params'),
    validationHandler(updatecategorieschema),
    async function(req, res, next) {
      const { categoryId } = req.params;
      const { body: category } = req;
      try {
        const updateCategoryId = await categoriesService.updateCategory({
          categoryId,
          category
        });

        res.status(200).json({
          data: updateCategoryId,
          message: 'category updated'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:categoryId',
    // passport.authenticate('jwt', { session: false }),
    // scopesValidationHandler(['deleted:categories']),
    // validationHandler({ categoryId: categoryIdSchema }, 'params'),
    async function(req, res, next) {
      const { categoryId } = req.params;
      try {
        const deleteCategoryId = await categoriesService.deleteCategory({ categoryId });

        res.status(200).json({
          data: deleteCategoryId,
          message: 'category deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = categoriesApi;
