import { Router } from 'express';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controllers.js';
import { shouldBeAdmin } from '../middleware/authMiddleware.js';

const router: Router = Router();

router.post('/', shouldBeAdmin, createCategory);
router.put('/:id', shouldBeAdmin, updateCategory);
router.delete('/:id', shouldBeAdmin, deleteCategory);
router.get('/', getCategories);

export default router;
