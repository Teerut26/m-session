import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import appAdmin from "@/configs/firebaseAdmin";
import { hash } from "@/utils/bcrypt";
import dbAdmin from "@/configs/firestoreAdmin";

export const roomRouter = createTRPCRouter({
  createRoom: protectedProcedure
    .input(z.object({ name: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      let { name, password } = input;

      let room = appAdmin.database();
      //   let roomRef = room.ref(`rooms/${ctx.session.user.id}`);
      let roomRef = room.ref(`rooms`);

      //   const roomExists = (await roomRef.get()).exists()

      //   if (roomExists) {
      //     throw new Error("You already have a room");
      //   }

      const { key } = roomRef.push({
        name,
        password: await hash(password),
        users: [
          {
            id: ctx.session.user.id,
            name: ctx.session.user.username,
            image: ctx.session.user.avatar,
          },
        ],
        musicQueue: [],
        currentMusic: null,
        owner: ctx.session.user.id,
      });

      const roomCollection = dbAdmin.collection("user");
      const roomDoc = roomCollection.doc(ctx.session.user.id);
      const userRoomCollection = roomDoc.collection("rooms");
      const userRoomDoc = userRoomCollection.doc(key!);

      // await userRoomDoc.set({

      return "you can now see this secret message!";
    }),
  deleteRoom: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      let room = appAdmin.database();
      let roomRef = room.ref(`rooms/${input.id}`);

      const roomExists = (await roomRef.get()).exists();

      if (!roomExists) {
        throw new Error("Room doesn't exists");
      }

      const roomData = (await roomRef.get()).val();

      if (roomData.owner !== ctx.session.user.id) {
        throw new Error("You are not the owner of this room");
      }

      await roomRef.remove();
    }),
});
