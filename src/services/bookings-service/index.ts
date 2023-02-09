// bookingsService.getUserBookings(Number(userId));
// const bookings = await bookingsService.postUserBooking(Number(userId));
// await bookingsService.changeBooking(Number(userId), Number(bookingId));

import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError } from "@/errors";
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error";
import { Booking } from "@prisma/client";

async function getUserBookings(userId: number) {
  //Tem enrollment?
  const bookings = await bookingRepository.findUserBookings(userId);

  if (bookings.length === 0) {
    //throw notFoundError();
    throw { name: "not found bookings from user" };
  }

  return bookings;
}

async function postUserBooking(userId: number, roomId: number): Promise<Booking> {
  const booking = await bookingRepository.postBooking(userId, roomId);
  if (!booking) throw { name: "not post booking" };
  if (booking) return booking;
}

async function getBookingWithId(bookingId: number) {
  const booking = await bookingRepository.findBookingsById(bookingId);
  if (!booking) throw { name: "not found bookings" };
  return booking;
}

async function changeBooking(userId: number, bookingId: number, roomId: number) {
  console.log(bookingId);
  const booking = await bookingRepository.updateBooking(roomId, bookingId);
  console.log(booking);
  if (!booking) throw { data: "booking not updated" };
  return booking;
}
// async function getHotelsWithRooms(userId: number, hotelId: number) {
//   await listHotels(userId);
//   const hotel = await hotelRepository.findRoomsByHotelId(hotelId);

//   if (!hotel) {
//     throw notFoundError();
//   }
//   return hotel;
// }

const bookingsService = {
  getUserBookings,
  //getHotelsWithRooms,
  postUserBooking,
  getBookingWithId,
  changeBooking,
};

export default bookingsService;
