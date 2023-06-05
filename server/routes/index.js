import { Router } from 'express';
import passport from 'passport';
import AuthApi from './AuthApi.js';
import ExpenseApi from './ExpenseApi.js';
import UserApi from './UserApi.js';
const router = Router();

const auth = passport.authenticate('jwt', { session: false });

router.use('/expense', auth, ExpenseApi);
router.use('/auth', AuthApi);
router.use('/user', UserApi);

export default router; 
