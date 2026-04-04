import { prisma, Prisma } from '@repo/product-db';
import { Request, Response } from 'express';

function parseProductId(raw: string | string[] | undefined): number | null {
  const s = Array.isArray(raw) ? raw[0] : raw;
  const id = Number(s);
  return Number.isFinite(id) && Number.isInteger(id) ? id : null;
}

export const createProduct = async (req: Request, res: Response) => {
  const data: Prisma.ProductCreateInput = req.body;

  const { colors, images } = data;

  if (!colors || !Array.isArray(colors) || colors.length === 0) {
    return res.status(400).json({ message: 'Colors are required' });
  }

  if (!images || typeof images !== 'object') {
    return res.status(400).json({ message: 'Images object is required' });
  }

  const missingColors = colors.filter((color) => !(color in images));

  if (missingColors.length > 0) {
    return res.status(400).json({
      message: `Missing images for colors: ${missingColors.join(', ')}`,
    });
  }

  const product = await prisma.product.create({ data });
  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = parseProductId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: 'Invalid product id' });
  }

  const data: Prisma.ProductUpdateInput = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data,
    });
    return res.status(200).json(updatedProduct);
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2025'
    ) {
      return res.status(404).json({ message: 'Product not found' });
    }
    throw e;
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = parseProductId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: 'Invalid product id' });
  }

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });
    return res.status(200).json(deletedProduct);
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2025'
    ) {
      return res.status(404).json({ message: 'Product not found' });
    }
    throw e;
  }
};

export const getProducts = async (req: Request, res: Response) => {
  const { sort, category, search, limit } = req.query;

  const orderBy = (() => {
    switch (sort) {
      case 'asc':
        return { price: Prisma.SortOrder.asc };
        break;
      case 'desc':
        return { price: Prisma.SortOrder.desc };
        break;
      case 'oldest':
        return { createdAt: Prisma.SortOrder.asc };
        break;
      case 'newest':
        return { createdAt: Prisma.SortOrder.desc };
        break;
      default:
        return { createdAt: Prisma.SortOrder.desc };
    }
  })();
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category as string,
      },
      name: {
        contains: search as string,
        mode: 'insensitive',
      },
    },
    orderBy,
    take: limit ? Number(limit) : undefined,
  });
  res.status(200).json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const id = parseProductId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: 'Invalid product id' });
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(product);
};
