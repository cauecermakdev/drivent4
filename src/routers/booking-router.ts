import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getBookings, getBookingWithId } from "@/controllers";
import { changeBooking, postBooking } from "@/controllers/booking-controller";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .get("/", getBookings)
  .post("/", postBooking)
  .get("/:bookingId", changeBooking);

export { bookingsRouter };
