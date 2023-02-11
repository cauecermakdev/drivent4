import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Booking } from "@prisma/client";

async function getUserBookings(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw { name: "not found enrollment from user" };

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw { name: "not found ticket of user" };

  const bookings = await bookingRepository.findUserBookings(userId);
  if (bookings.length === 0) {
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
  const booking = await bookingRepository.updateBooking(roomId, bookingId);
  if (!booking) throw { data: "booking not updated" };
  return booking;
}

const bookingsService = {
  getUserBookings,
  postUserBooking,
  getBookingWithId,
  changeBooking,
};

export default bookingsService;
