import { AuthenticatedRequest } from "@/middlewares";
//import enrollmentRepository from "@/repositories/enrollment-repository";
import bookingsService from "@/services/bookings-service";
import roomsService from "@/services/rooms-service";
//import { Booking } from "@prisma/client";
import { Response } from "express";
import httpStatus from "http-status";
import hotelService from "@/services/hotels-service";

export async function getBookings(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const bookings = await bookingsService.getUserBookings(Number(userId));
    return res.sendStatus(httpStatus.OK).send(bookings);
  } catch (error) {
    if (error.name === "not found bookings from user") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  // Apenas usuários com ticket presencial, com hospedagem e pago podem fazer reservas.
  try {
    await hotelService.confirmStay(userId);
  } catch (error) {
    console.log("confirm stay catched");
    res.sendStatus(httpStatus.NOT_FOUND);
  }

  //   `roomId` não existente: Deve retornar status code 404.
  try {
    await roomsService.findWithId(roomId);
  } catch (err) {
    res.sendStatus(httpStatus.NOT_FOUND);
  }

  // `roomId` sem vaga: Deve retornar status code 403.
  try {
    await roomsService.fullCapacity(roomId);
  } catch (err) {
    return res.status(httpStatus.FORBIDDEN);
  }

  // Fora da regra de negócio: Deve retornar status code 403.

  try {
    const booking = await bookingsService.postUserBooking(Number(userId), roomId);
    return res.sendStatus(httpStatus.OK).send(booking.id);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
  }
}

export async function changeBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { bookingId } = req.params;
  const { roomId } = req.body;

  //console.log(bookingId);

  //starting validations ********************
  // - A troca só pode ser efetuada para usuários que possuem reservas.
  try {
    await bookingsService.getBookingWithId(Number(bookingId));
    //roomId = existBooking.id;
  } catch (error) {
    //if(enror.name = "not found bookings")
    console.log(error.name);
    res.status(httpStatus.NOT_FOUND).send("booking Inexistent");
  }

  //`roomId` não existente: Deve retornar status code 404.
  try {
    await roomsService.findWithId(roomId);
  } catch (err) {
    console.log(err.name);
    res.status(httpStatus.NOT_FOUND);
  }

  //   // `roomId` sem vaga: Deve retornar status code 403.
  try {
    await roomsService.fullCapacity(roomId);
  } catch (err) {
    console.log(err.name);
    res.status(httpStatus.FORBIDDEN);
  }

  //end validation ********************

  try {
    await bookingsService.changeBooking(Number(userId), Number(bookingId), Number(roomId));

    return res.status(httpStatus.OK).send(bookingId);
  } catch (error) {
    if (error.name === "booking not updated") {
      console.log(error.name);
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    // if (error.name === "CannotListHotelsError") {
    //   return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    // }
    console.log(error);
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
