import { MusicVideo } from "node-youtube-music";
declare module "node-youtube-music" {
  interface MusicVideoOptional extends MusicVideo {
    timestamp?: string;
  }
}
