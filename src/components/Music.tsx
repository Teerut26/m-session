import { MusicVideoRoom } from "@/interfaces/MusicRoomQueue";
import { musicAtom } from "@/store/musicStore";
import { api } from "@/utils/api";
import { NextPage } from "next";
import { useRouter } from "next/router";
import type { MusicVideo } from "node-youtube-music";
import { useRecoilState } from "recoil";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

interface Props {
  item: MusicVideo;
  clickType?: "addQueue" | "play";
  isCurrent?: boolean;
}

const Music: NextPage<Props> = ({ item, clickType, isCurrent }) => {
  const addQueue = api.room.addQueue.useMutation();
  const setCurrentMusic = api.room.setCurrentMusic.useMutation();
  const [music, setMusic] = useRecoilState(musicAtom);
  const router = useRouter();

  const addQueueFn = () => {
    addQueue.mutate({
      roomId: router.query.id as string,
      music: item,
    });
  };

  const playMusic = () => {
    setCurrentMusic.mutate({
      roomId: router.query.id as string,
      music: item,
    });
  };

  return (
    <>
      <div
        onClick={() =>
          clickType === "addQueue"
            ? addQueueFn()
            : clickType === "play"
            ? playMusic()
            : null
        }
        className="flex cursor-pointer items-center justify-between gap-2 p-3 hover:bg-base-300"
      >
        <div className="flex gap-2">
          <img src={item?.thumbnailUrl} alt="" className="w-12" />
          <div className="flex flex-col">
            <div className="max-w-[14rem] truncate md:max-w-[30rem]">
              {item.title}
            </div>
            <div className="truncate">{item.artists![0]?.name}</div>
          </div>
        </div>
        <div className="truncate">{music.currentMusic?.youtubeId === item.youtubeId ? "Playing" : item.duration?.label }</div>
      </div>
    </>
  );
};

export default Music;
