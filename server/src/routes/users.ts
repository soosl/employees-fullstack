import { Router } from 'express';
import { UsersController } from '@controllers/users.controller';
import { checkAuth } from '@middlewares/checkAuth';

const router = Router();

router.post('/login', UsersController.login);

router.post('/logout', UsersController.logout);

router.post('/register', UsersController.register);

router.get('/current', checkAuth, UsersController.current);

export default router;
