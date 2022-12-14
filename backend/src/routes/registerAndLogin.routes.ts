import { Router } from 'express';
import JWT from '../helpers/jwt';
import prisma from '../database/client';
import RegisterAndLoginController from '../controllers/RegisterAndLogin.controllers';
import RegisterAndLoginService from '../services/RegisterAndLogin.service';
import Bcrypt from '../helpers/bcrypt';
import registerRules from '../middlewares/registerRules.middleware';

const registerAndLoginRouter = Router();

const model = prisma;

const jwt = new JWT();

const bcrypt = new Bcrypt();

const registerService = new RegisterAndLoginService(model, jwt, bcrypt);

const controllers = new RegisterAndLoginController(registerService);

registerAndLoginRouter.post('/register', registerRules, controllers.register);

registerAndLoginRouter.post('/login', controllers.login);

// rota criada por mim para aprimorar o front-end
registerAndLoginRouter.get('/users/:id', controllers.getUser);

export default registerAndLoginRouter;
