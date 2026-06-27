const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

async function createBooking({ userId, seatId, showId }) {
  try {
    // Directly create the booking.
    // The database unique constraint will prevent duplicates.
    const booking = await prisma.booking.create({
      data: {
        userId,
        seatId,
        showId,
      },
    });

    return {
      success: true,
      booking,
    };
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return {
        success: false,
        status: 409,
        message: "Seat already booked for this show.",
      };
    }

    throw err;
  }
}

module.exports = {
  createBooking,
};