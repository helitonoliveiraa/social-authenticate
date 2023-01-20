import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { UserController } from '../controllers/UserController';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';

const router = Router();

const authController = new AuthController();
const userController = new UserController();

router.post('/authenticate', (request, response) => authController.handle(request, response));
router.get('/profile/:id', ensureAuthenticate, (request, response) => userController.getId(request, response));
router.put('/profile/:id', ensureAuthenticate, (request, response) => userController.update(request, response));
router.delete('/profile/:id', ensureAuthenticate, (request, response) => userController.delete(request, response));
router.get('/users', ensureAuthenticate, (request, response) => userController.get(request, response));

export { router };