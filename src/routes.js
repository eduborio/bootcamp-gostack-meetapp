import { Router } from 'express';
import multer from 'multer';
import users from './app/controllers/UsersController';
import session from './app/controllers/SessionController';
import files from './app/controllers/FilesController';
import multerConfig from './config/multer';
import auth from './app/middlewares/auth';

const routes = new Router();

const uploader = multer(multerConfig);

routes.post('/users', users.store);
routes.post('/sessions', session.store);

routes.use(auth);

routes.put('/users', users.update);

routes.post('/files', uploader.single('file'), files.store);

export default routes;
