import { Router } from 'express';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controllers.js';

const router: Router = Router();

router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);
router.get('/', getCategories);

export default router;
