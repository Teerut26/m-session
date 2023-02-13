import databaseClient from "@/configs/databaseClient";
import { MusicVideoRoom } from "@/interfaces/MusicRoomQueue";
import { RoomFirebaseInterface } from "@/interfaces/RoomFirebaseInterface";
import { musicAtom } from "@/store/musicStore";
import { ref, onValue } from "firebase/database";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { MusicVideo } from "node-youtube-music";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import _ from "lodash";
import Music from "./Music";

interface Props {}

const QueueMusicRoom: NextPage<Props> = () => {
  const [music, setMusic] = useRecoilState(musicAtom);
  const router = useRouter();

  useEffect(() => {
    const roomsRef = ref(databaseClient, "rooms/");
    onValue(roomsRef, (snapshot) => {
      if (!snapshot.exists()) {
        setMusic((pre) => ({ ...pre, currentMusic: null }));
        return;
      }
      const data = snapshot.val();

      setMusic((pre) => ({
        currentMusic: _.values(data)[0].currentMusic,
        queue: _.sortBy(_.values(_.values(data)[0].musicQueue), ["timestamp"]),
        status: _.values(data)[0].status,
      }));
    });
  }, []);

  return (
    <div className="flex flex-1 flex-col rounded-xl bg-base-200 p-3">
      <div className="flex h-full flex-col">
        <div className="text-xl">Queue Music</div>
        <div className="h-full flex-grow-0 overflow-y-auto">
          <div className="flex flex-col divide-y">
            {music.currentMusic && <Music item={music.currentMusic!} />}
            {music.queue?.map((item, i) => (
              <Music clickType="play" item={item} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueMusicRoom;
