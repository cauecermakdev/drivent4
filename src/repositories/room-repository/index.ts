import { prisma } from "@/config";

async function findRoomsById(idFetched: number) {
  return prisma.room.findFirst({
    where: {
      id: idFetched,
    },
  });
}

const roomRepository = {
  findRoomsById,
};

export default roomRepository;
