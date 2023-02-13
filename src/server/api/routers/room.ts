import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import appAdmin from "@/configs/firebaseAdmin";
import { hash } from "@/utils/bcrypt";
import dbAdmin from "@/configs/firestoreAdmin";
import { SearchResponseZod } from "@/interfaces/SearchResponseInterface";
import { MusicVideoOptional } from "node-youtube-music";

export const roomRouter = createTRPCRouter({
  createRoom: protectedProcedure
    .input(z.object({ name: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      let { name, password } = input;

      let room = appAdmin.database();
      let roomRef = room.ref(`rooms`);

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
  addQueue: protectedProcedure
    .input(
      z.object({
        roomId: z.string(),
        music: SearchResponseZod,
      })
    )
    .mutation(async ({ input, ctx }) => {
      let room = appAdmin.database();

      let roomMusicCurrentMusicRef = room.ref(
        `rooms/${input.roomId}/currentMusic`
      );

      let roomMusicQueueRef = room.ref(
        `rooms/${input.roomId}/musicQueue/${input.music.youtubeId}`
      );

      const roomExists = (await roomMusicQueueRef.get()).exists();
      const currentId = (await roomMusicCurrentMusicRef.child("youtubeId").get()).val();
      

      if (roomExists || currentId === input.music.youtubeId) {
        throw new Error("Music already exists in queue");
      }

      const isInit = !(await roomMusicCurrentMusicRef.get()).exists();

      if (isInit) {
        await roomMusicCurrentMusicRef.set({
          ...input.music,
        });
      } else {
        const musicId = await roomMusicQueueRef.set({
          ...input.music,
          timestamp: new Date().toJSON(),
        } as MusicVideoOptional);
        return musicId;
      }
    }),
  setCurrentMusic: protectedProcedure
    .input(z.object({ roomId: z.string(), music: SearchResponseZod }))
    .mutation(async ({ input, ctx }) => {
      let room = appAdmin.database();
      let roomRef = room.ref(`rooms/${input.roomId}`);

      let roomMusicRef = room.ref(
        `rooms/${input.roomId}/musicQueue/${input.music.youtubeId}`
      );

      await roomMusicRef.remove();

      await roomRef.update({
        status: "playing",
        currentMusic: input.music,
      });
    }),
});
