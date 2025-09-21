import express from 'express';
import { verifyToken } from './verifyUser.js';

export function creerDossierRouter(controller, options = {}) {
  const router = express.Router();
  const base = options.base || '';

  if (controller.create) {
    router.post(`${base}/create`, [verifyToken], controller.create);
  }

  if (controller.getDetails) {
    router.get(`${base}/:id`, [verifyToken], controller.getDetails);
  }

  if (controller.update) {
    const middlewares = options.updateMiddleware || [verifyToken];
    router.post(`${base}/update/:id`, middlewares, controller.update);
  }

  if (controller.delete) {
    router.delete(`${base}/:id`, [verifyToken], controller.delete);
  }

  if (controller.getAll) {
    router.get(`${base}`, [verifyToken], controller.getAll);
  }

  return router;
}
