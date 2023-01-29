import { Router } from 'express';
import { RegisterController } from '../controllers/RegisterController';
import { UserController } from '../controllers/UserController';
import { authCache, ensureAuthenticate } from '../middlewares';

const router = Router();

const registerController = new RegisterController();
const userController = new UserController();

router.post('/register', (request, response) => registerController.register(request, response));

router.post('/authenticate', ensureAuthenticate, (request, response) => userController.get(request, response));

router.get('/users', ensureAuthenticate, (request, response) => userController.getAll(request, response));
router.get('/profile/:id', ensureAuthenticate, (request, response) => userController.getId(request, response));
router.put('/profile/:id', ensureAuthenticate, (request, response) => userController.update(request, response));
router.delete('/profile/:id', ensureAuthenticate, (request, response) => userController.delete(request, response));

export { router };