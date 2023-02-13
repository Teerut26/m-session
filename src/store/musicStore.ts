import type { MusicVideo } from "node-youtube-music";
import { atom } from "recoil";

interface QueueMusic {
  currentMusic: MusicVideo | null;
  queue: MusicVideo[];
  status: "playing" | "paused" ;
}

const musicAtom = atom<QueueMusic>({
  key: "musicAtomKey",
  default: {
    currentMusic: null,
    queue: [],
    status: "paused",
  },
});

export { musicAtom };
