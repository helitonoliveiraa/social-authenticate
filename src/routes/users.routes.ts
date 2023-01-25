import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authCache, ensureAuthenticate } from '../middlewares';

const router = Router();

const userController = new UserController();

router.post('/authenticate', authCache);
router.get('/profile/:id', ensureAuthenticate, (request, response) => userController.getId(request, response));
router.put('/profile/:id', ensureAuthenticate, (request, response) => userController.update(request, response));
router.delete('/profile/:id', ensureAuthenticate, (request, response) => userController.delete(request, response));
router.get('/users', ensureAuthenticate, (request, response) => userController.get(request, response));

export { router };