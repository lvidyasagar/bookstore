import * as express from 'express';
import bookController from '../controllers/book.controller';

const router = express.Router();


router.get('/search/:searchString', bookController.search);

export default router;