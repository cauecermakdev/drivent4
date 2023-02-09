import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { changeBooking, getBookings, postBooking } from "@/controllers/booking-controller";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .get("/", getBookings)
  .post("/", postBooking)
  .put("/:bookingId", changeBooking);

export { bookingsRouter };
