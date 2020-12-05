import { Router } from 'express';
import multer from 'multer'

import uploadConfig from './config/upload'
import PacientesController from './controllers/PacientesController'

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/pacientes', PacientesController.index);
routes.get('/pacientes/find/:name', PacientesController.show);
routes.get('/pacientes/find/:id', PacientesController.showCreated);
routes.post('/pacientes', upload.array('foto'), PacientesController.create);
routes.delete('/pacientes/:email', PacientesController.delete);



export default routes;
