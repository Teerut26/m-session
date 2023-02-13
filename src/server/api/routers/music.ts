import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { MusicVideo, searchMusics } from "node-youtube-music";
import axios from "axios";
import { StreamResponseInterface } from "@/interfaces/StreamResponseInterface";
import appAdmin from "@/configs/firebaseAdmin";

export const musicRouter = createTRPCRouter({
  search: protectedProcedure
    .input(z.object({ keyword: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const musics = await searchMusics(input.keyword);
        return musics as MusicVideo[];
      } catch (error: any) {
        console.log(error);

        throw new Error(error.message);
      }
    }),
  streams: protectedProcedure
    .input(z.object({ videoId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const { data } = await axios.get<StreamResponseInterface>(
          `https://pipedapi.kavin.rocks/streams/${input.videoId}`
        );
        return { ...data, id: input.videoId };
      } catch (error: any) {
        throw new Error(error.message);
      }
    }),

  play: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      let room = appAdmin.database();
      let roomRef = room.ref(`rooms/${input.roomId}`);
      roomRef.update({
        status: "playing",
      });
    }),
  pause: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      let room = appAdmin.database();
      let roomRef = room.ref(`rooms/${input.roomId}`);
      roomRef.update({
        status: "paused",
      });
    }),
});
