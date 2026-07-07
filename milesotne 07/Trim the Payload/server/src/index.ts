import express from 'express';
import cors from 'cors';
import { prisma } from './prisma.config';
import compression from "compression";
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(compression());

// BROKEN ENDPOINT: Multiple performance killers
app.get("/api/orders", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    const total = await prisma.order.count();

    const orders = await prisma.order.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        total: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          select: {
            quantity: true,
            price: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });

    res.json({
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch orders",
    });
  }
});

    // PROBLEM 2: N+1 Query Issue (Fetching related data in a loop instead of a join)
    // This will fire 500+ separate database queries
    const ordersWithDetails = [];
    for (const order of baseOrders) {
      const user = await prisma.user.findUnique({ where: { id: order.userId } });
      const items = await prisma.orderItem.findMany({ 
        where: { orderId: order.id },
        include: { product: true } 
      });
      ordersWithDetails.push({ ...order, user, items });
    }

    // PROBLEM 3: Blocking Event Loop (Sync processing of a large array)
    // Simulating heavy data transformation that freezes the server
    const processedData = ordersWithDetails.map(order => {
      const start = Date.now();
      while (Date.now() - start < 1) { /* Artificial 1ms block per order */ }
      return {
        ...order,
        _metadata: { processedAt: new Date().toISOString() }
      };
    });

    res.json(processedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'broken' });
});

app.listen(PORT, () => {
  console.log(`Broken Server running at http://localhost:${PORT}`);
});
