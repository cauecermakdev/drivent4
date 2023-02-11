import dayjs from "dayjs";
import faker from "@faker-js/faker";
import { Booking, Hotel, Room, User } from "@prisma/client";
import { prisma } from "@/config";
import { createHotel, createRoomWithHotelId } from "./hotels-factory";
import { createUser } from "./users-factory";

export async function createBooking(user: User, hotel: Hotel, room: Room): Promise<Booking> {
  const incomingUser = user || (await createUser());
  const incomingHotel = hotel || (await createHotel());
  const incomingRoom = room || (await createRoomWithHotelId(incomingHotel.id));

  return prisma.booking.create({
    data: {
      id: faker.datatype.number({ min: 1, max: 100 }),
      userId: incomingUser.id,
      roomId: incomingRoom.id,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
      //   title: params.title || faker.lorem.sentence(),
      //   backgroundImageUrl: params.backgroundImageUrl || faker.image.imageUrl(),
      //   logoImageUrl: params.logoImageUrl || faker.image.imageUrl(),
      //   startsAt: params.startsAt || dayjs().subtract(1, "day").toDate(),
      //   endsAt: params.endsAt || dayjs().add(5, "days").toDate(),
    },
  });
}
