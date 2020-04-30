import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

//STORE
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/appointments', AppointmentController.store);
routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);

//UPDATE
routes.put('/users', UserController.update);
routes.put('/notifications/:id', NotificationController.update);

//LIST
routes.get('/providers', ProviderController.index);
routes.get('/appointments', AppointmentController.index);
routes.get('/schedule', ScheduleController.index);
routes.get('/notifications', NotificationController.index);

//DELETE
routes.get('/appointments/:id', AppointmentController.delete);

export default routes;
