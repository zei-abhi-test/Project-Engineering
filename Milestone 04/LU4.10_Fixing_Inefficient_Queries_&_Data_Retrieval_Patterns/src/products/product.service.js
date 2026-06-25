import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getProducts(query) {
  const MAX_LIMIT = 100;

  let page = parseInt(query.page) || 1;
  let limit = parseInt(query.limit) || 10;

  if (page < 1 || limit < 1) {
    throw new Error("Invalid pagination parameters");
  }

  limit = Math.min(limit, MAX_LIMIT);

  const skip = (page - 1) * limit;

  const allowedSort = ["id", "name", "price", "createdAt", "stock"];
  const sortBy = allowedSort.includes(query.sortBy)
    ? query.sortBy
    : "createdAt";

  const order = query.order === "asc" ? "asc" : "desc";

  const whitelist = [
    "id",
    "name",
    "description",
    "price",
    "category",
    "stock",
    "imageUrl",
    "isActive",
    "createdAt",
    "updatedAt",
  ];

  let select = undefined;

  if (query.fields) {
    const fields = query.fields.split(",");

    const invalid = fields.filter((f) => !whitelist.includes(f));

    if (invalid.length) {
      throw new Error(`Invalid fields: ${invalid.join(", ")}`);
    }

    select = {};

    fields.forEach((f) => {
      select[f] = true;
    });
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: limit,
      orderBy: {
        [sortBy]: order,
      },
      select,
    }),

    prisma.product.count(),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: products,
  };
}

export async function getProductById(id) {
  return prisma.product.findUnique({ where: { id } });
}