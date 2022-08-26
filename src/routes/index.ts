import { Router } from 'express';
const router = Router();
import role from '../middlewares/role';
import userRoute from './user';
import hairdresserRoute from './hairdresser';

router.use('/user', userRoute);
router.use('/hairdresser', role, hairdresserRoute);

export default router;
