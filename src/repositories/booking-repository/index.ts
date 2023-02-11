import { prisma } from "@/config";
import { createRoomWithHotelId } from "../../factories";

async function findUserBookings(userId: number) {
  return await prisma.booking.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      //teste estao pedindo
      Room: true,
    },
  });
}
async function findMany(roomId: number) {
  return await prisma.booking.findMany({
    where: {
      roomId: roomId,
    },
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
async function findBookingsById(bookingId: number) {
  return await prisma.booking.findFirst({
    where: {
      id: bookingId,
    },
    // include: {
    //   Rooms: true,
    // },
  });
}

async function updateBooking(roomId: number, bookingId: number) {
  return await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId: roomId,
    },
  });
}

const bookingRepository = {
  findUserBookings,
  findBookingsById,
  findMany,
  postBooking,
  updateBooking,
};

export default bookingRepository;
