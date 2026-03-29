import { prisma, Prisma } from '@repo/product-db';
import { Request, Response } from 'express';

function parseCategoryId(raw: string | string[] | undefined): number | null {
  const s = Array.isArray(raw) ? raw[0] : raw;
  const id = Number(s);
  return Number.isFinite(id) && Number.isInteger(id) ? id : null;
}

export const createCategory = async (req: Request, res: Response) => {
  const data: Prisma.CategoryCreateInput = req.body;

  const category = await prisma.category.create({ data });
  res.status(201).json(category);
};

export const updateCategory = async (req: Request, res: Response) => {
  const id = parseCategoryId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: 'Invalid category id' });
  }

  const data: Prisma.CategoryUpdateInput = req.body;

  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data,
    });
    return res.status(200).json(updatedCategory);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
      return res.status(404).json({ message: 'Category not found' });
    }
    throw e;
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id = parseCategoryId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: 'Invalid category id' });
  }

  try {
    const deletedCategory = await prisma.category.delete({
      where: { id },
    });
    return res.status(200).json(deletedCategory);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
      return res.status(404).json({ message: 'Category not found' });
    }
    throw e;
  }
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();

  return res.status(200).json(categories);
};
