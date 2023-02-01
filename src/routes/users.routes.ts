import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { SessionController } from '../controllers/SessionController';
import { authCache, ensureAuthenticate } from '../middlewares';

const router = Router();

const userController = new UserController();
const sessionController = new SessionController();

router.post('/session', ensureAuthenticate, (request, response) => sessionController.create(request, response));

router.get('/users', ensureAuthenticate, (request, response) => userController.getAll(request, response));
router.get('/profile/:id', ensureAuthenticate, (request, response) => userController.getId(request, response));
router.put('/profile/:id', ensureAuthenticate, (request, response) => userController.update(request, response));
router.delete('/profile/:id', ensureAuthenticate, (request, response) => userController.delete(request, response));

export { router };