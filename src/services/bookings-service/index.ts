// bookingsService.getUserBookings(Number(userId));
// const bookings = await bookingsService.postUserBooking(Number(userId));
// await bookingsService.changeBooking(Number(userId), Number(bookingId));

import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError } from "@/errors";
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error";

async function getUserBookings(userId: number) {
  //Tem enrollment?
  const bookings = await bookingRepository.findUserBookings(userId);
  if (!bookings) {
    //throw notFoundError();
    throw { name: "not found bookings from user" };
  }
}

async function postUserBooking(userId: number, roomId: number) {
  const booking = await bookingRepository.postBooking(userId, roomId);

  return booking;
}

async function getHotelsWithRooms(userId: number, hotelId: number) {
  await listHotels(userId);
  const hotel = await hotelRepository.findRoomsByHotelId(hotelId);

  if (!hotel) {
    throw notFoundError();
  }
  return hotel;
}

const bookingsService = {
  getUserBookings,
  getHotelsWithRooms,
};

export default bookingsService;
