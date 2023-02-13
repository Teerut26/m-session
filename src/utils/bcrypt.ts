// hash

import { env } from "@/env/server.mjs";
import bcrypt from "bcryptjs";

export const hash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(Number(env.BCRYPT_SALT_ROUNDS));
  return await bcrypt.hash(password, salt);
};

export const compare = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
