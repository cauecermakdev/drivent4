import { prisma } from "@/config";

async function findUserBookings(userId: number) {
  return prisma.booking.findMany({
    where: {
      id: userId,
    },
    // include: {
    //   Rooms: true,
    // },
  });
}

async function postBooking(userId: number, roomId: number) {
  return await prisma.booking.create({
    data: {
      userId: userId,
      roomId: roomId,
    },
  });
}

//tem que arrumar
async function findBookingsById(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelRepository = {
  findUserBookings,
  findBookingsById,
  postBooking,
};

export default hotelRepository;
