const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Issue B1: No Pagination
// Issue B2: Over-fetching (includes strategyNote)
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    const total = await prisma.score.count();

    const scores = await prisma.score.findMany({
      skip,
      take: limit,
      orderBy: {
        date: "desc",
      },
      select: {
        id: true,
        game: true,
        player: true,
        score: true,
        date: true,
      },
    });

    res.json({
      currentPage: page,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
      scores,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch scores",
    });
  }
});

module.exports = router;
