import { Router } from 'express';
import users from './app/controllers/UsersConrtoller';

const routes = new Router();

routes.post('/users', users.store);

export default routes;
