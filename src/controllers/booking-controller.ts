import { AuthenticatedRequest } from "@/middlewares";
import bookingsService from "@/services/bookings-service";
import roomsService from "@/services/rooms-service";
import { Response } from "express";
import httpStatus from "http-status";
import hotelService from "@/services/hotels-service";

export async function getBookings(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const bookings = await bookingsService.getUserBookings(Number(userId));

    return res.status(httpStatus.OK).send(bookings[0]);
  } catch (error) {
    if (error.name === "not found bookings from user") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  try {
    await hotelService.confirmStay(userId, roomId);
    await roomsService.fullCapacity(roomId);
    const booking = await bookingsService.postUserBooking(Number(userId), roomId);
    const returnBooking = { bookingId: booking.id };
    return res.status(httpStatus.OK).send(returnBooking);
  } catch (error) {
    if (error.name === "there isnt room with id") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}

export async function changeBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { bookingId } = req.params;
  const { roomId } = req.body;

  try {
    await hotelService.confirmStay(userId, roomId);
    await bookingsService.getBookingWithId(Number(bookingId));
    await roomsService.fullCapacity(roomId);
    const booking = await bookingsService.changeBooking(Number(userId), Number(bookingId), Number(roomId));
    const returnBooking = { bookingId: booking.id };

    return res.status(httpStatus.OK).send(returnBooking);
  } catch (error) {
    if (error.name === "there isnt room with id") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
