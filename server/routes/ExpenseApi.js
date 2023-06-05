import { Router } from 'express';
import * as ExpenseController from '../controller/ExpenseController.js';

const router = Router();

router.get('/', ExpenseController.index);
router.get('/history', ExpenseController.getHistory);
router.post('/', ExpenseController.create);
router.delete('/:id', ExpenseController.destroy);
router.patch('/:id', ExpenseController.update);

export default router;
