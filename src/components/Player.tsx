import { NextPage } from "next";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { useEffect, useRef, useState } from "react";
import QueueMusic from "./QueueMusic";
import { useRecoilState } from "recoil";
import { musicAtom } from "@/store/musicStore";
import { api } from "@/utils/api";

import { Howl, Howler } from "howler";
import ReactHowler from "react-howler";
import HowlerWrapper from "./HowlerWrapper";

interface Props {
  roomId: string;
}

const Player: NextPage<Props> = ({ roomId }) => {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [music] = useRecoilState(musicAtom);
  const audio = useRef<ReactHowler>(null);

  const [url, setUrl] = useState<string | undefined>(undefined);
  const [initial, setInitial] = useState(false);

  const stream = api.music.streams.useMutation();

  const play = api.music.play.useMutation();
  const pause = api.music.pause.useMutation();

  useEffect(() => {
    if (music.currentMusic) {
      stream.mutate({ videoId: music.currentMusic.youtubeId! });
    }
  }, [music.currentMusic]);

  useEffect(() => {
    if (stream.isSuccess) {
    //   console.log("youtubeId", music.currentMusic?.youtubeId);
    //   console.log("stream.data.id", stream.data.id);
      if (!initial) {
        setInitial(true);
        setUrl(stream.data?.audioStreams[0]?.url);
        return;
      }

      if (music.currentMusic?.youtubeId === stream.data.id) {
        setUrl(stream.data?.audioStreams[0]?.url);
      }
    }
  }, [stream]);

  useEffect(() => {
    if (url) {
      setIsPlay(music.status === "playing" ? true : false);
    }
  }, [music.status]);

  const Play = () => {
    play.mutate({ roomId });
  };

  const Pause = () => {
    pause.mutate({ roomId });
  };

  return (
    <>
      {url && <ReactHowler src={url} playing={isPlay} html5={true} />}

      {url && (
        <>
          <div className="relative flex h-[5rem] justify-between gap-5 bg-base-200 p-3">
            <div className="z-10 flex gap-5">
              <img
                className="border "
                src={music.currentMusic?.thumbnailUrl}
                alt=""
              />
              <div className="flex flex-col">
                <div>{music.currentMusic?.title}</div>
                <div>{music.currentMusic?.artists![0]?.name}</div>
              </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 left-0 z-0 hidden items-center justify-center md:flex">
              <div className="flex gap-3">
                <SkipPreviousIcon fontSize="large" />
                {music.status === "playing" ? (
                  <PauseIcon fontSize="large" onClick={() => Pause()} />
                ) : (
                  <PlayArrowIcon fontSize="large" onClick={() => Play()} />
                )}
                <SkipNextIcon fontSize="large" />
              </div>
            </div>
            <div className="z-10 flex items-center">
              <label htmlFor="queue-music">
                <QueueMusicIcon fontSize="medium" />
              </label>
              <input
                type="checkbox"
                id="queue-music"
                className="modal-toggle"
              />
              <div className="modal">
                <div className="modal-box relative">
                  <label
                    htmlFor="queue-music"
                    className="btn-sm btn-circle btn absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3 className="text-lg font-bold">Current playing</h3>
                  <QueueMusic />
                  <h3 className="mt-2 text-lg font-bold">Next Song</h3>
                  <div className="mt-3 flex flex-col">
                    {[...new Array(10)].map((_, i) => (
                      <QueueMusic key={i} isDelete={true} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Player;
