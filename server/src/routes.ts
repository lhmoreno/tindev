import express from 'express';
import DevController from './controllers/DevController';
import LikeController from './controllers/LikeController';
import DislikeController from './controllers/DislikeController';

const routes = express.Router();

routes.get('/devs', DevController.index);
routes.post('/create/dev', DevController.store);

routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

export default routes;