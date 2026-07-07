const express = require('express');
const cors = require('cors');
const compression = require("compression");
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(compression());

// OPTIMIZED ENDPOINT: Fixes N+1 queries, includes pagination, filters fields, and adds compression
app.get("/api/missions", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;

    const skip = (page - 1) * limit;

    const total = await prisma.mission.count();

    const missions = await prisma.mission.findMany({
      skip,
      take: limit,
      orderBy: {
        launchDate: "desc",
      },
      select: {
        id: true,
        name: true,
        rocket: true,
        launchDate: true,
        crew: {
          select: {
            name: true,
            role: true,
          },
        },
      },
    });

    res.json({
      currentPage: page,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
      missions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to fetch missions",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
