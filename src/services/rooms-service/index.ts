import bookingRepository from "@/repositories/booking-repository";
import roomRepository from "@/repositories/room-repository";
//import { exist } from "joi";

async function findWithId(id: number) {
  const room = await roomRepository.findRoomsById(id);
  if (!room) throw { name: "doesnt exist roomID" };
  return room;
}

async function fullCapacity(roomId: number) {
  const existRoom = await roomRepository.findRoomsById(roomId);
  if (!existRoom) throw { name: "doesnt exist roomID" };

  const bookingsList = await bookingRepository.findMany(roomId);
  if (!bookingsList) throw { data: "doesnt have booking with roomId" };

  const numberOfReservationsOfRoom = bookingsList.length;

  if (existRoom.capacity <= numberOfReservationsOfRoom) {
    throw { name: "full capacity" };
  }
}

const roomsService = {
  findWithId,
  fullCapacity,
};

export default roomsService;
