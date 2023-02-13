import { NextPage } from "next";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { useState } from "react";
import QueueMusic from "./QueueMusic";

interface Props {}

const Player: NextPage<Props> = () => {
  const [isPlay, setIsPlay] = useState<boolean>(false);

  return (
    <div className="flex h-[5rem] justify-between gap-5 bg-base-200 p-3 relative">
      <div className="z-10 flex gap-5">
        <img
          className="animate-spin rounded-full border "
          src="https://lh3.googleusercontent.com/IFeGEeesu5CA2afjrYmP7Ee9NNjBNfpsmuXuzvBA06HpatOEcVLt28Oued-_VIb_bAoItQSEAjH4-UfQVA=w60-h60-l90-rw"
          alt=""
        />
        <div className="flex flex-col">
          <div>Sign Your Name</div>
          <div>Terence Trent D'Arby</div>
        </div>
      </div>
      <div className="absolute right-0 top-0 bottom-0 left-0 z-0 hidden items-center justify-center md:flex">
        <div className="flex gap-3">
          <SkipPreviousIcon fontSize="large" />
          {isPlay ? (
            <PauseIcon fontSize="large" onClick={() => setIsPlay(false)} />
          ) : (
            <PlayArrowIcon fontSize="large" onClick={() => setIsPlay(true)} />
          )}
          <SkipNextIcon fontSize="large" />
        </div>
      </div>
      <div className="z-10 flex items-center">
        <label htmlFor="queue-music">
          <QueueMusicIcon fontSize="medium" />
        </label>
        <input type="checkbox" id="queue-music" className="modal-toggle" />
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
            <h3 className="text-lg font-bold mt-2">Next Song</h3>
            <div className="mt-3 flex flex-col">
              {[...new Array(10)].map((_, i) => (
                <QueueMusic key={i} isDelete={true} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
