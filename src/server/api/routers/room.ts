import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import appAdmin from "@/configs/firebaseAdmin";

export const roomRouter = createTRPCRouter({
  createRoom: protectedProcedure
    .input(z.object({ name: z.string(), password: z.string() }))
    .mutation(({ input, ctx }) => {
      let { name, password } = input;

      let room = appAdmin.database();
      let roomRef = room.ref("rooms");
      roomRef.push({
        name,
        password,
        users: [
          {
            id: ctx.session.user.id,
            name: ctx.session.user.username,
            image: ctx.session.user.avatar,
          },
        ],
        owner: ctx.session.user.id,
      });

      return "you can now see this secret message!";
    }),
});
