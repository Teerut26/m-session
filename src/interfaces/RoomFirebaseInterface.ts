import { MusicVideoOptional } from "node-youtube-music";

export interface RoomFirebaseInterface {
  name: string;
  owner: string;
  password: string;
  users: User[];
  musicQueue: MusicVideoOptional[];
  currentMusic: MusicVideoOptional | null;
  id: string;
  status: "playing" | "paused" | "stopped";
}

export interface User {
  id: string;
  image: string;
  name: string;
}
