import { Router } from 'express';
import { checkAuth } from '@middlewares/checkAuth';
import { EmployeesController } from '@controllers/employees.controller';

const router = Router();

router.get('/', checkAuth, EmployeesController.getAll);

router.get('/:id', checkAuth, EmployeesController.getOne);

router.post('/add', checkAuth, EmployeesController.add);

router.delete('/delete/:id', checkAuth, EmployeesController.delete);

router.put('/update/:id', checkAuth, EmployeesController.update);

export default router;
