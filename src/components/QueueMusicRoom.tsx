import { NextPage } from "next";

interface Props {}

const QueueMusicRoom: NextPage<Props> = () => {
  return (
    <div className="flex flex-1 flex-col rounded-xl bg-base-200 p-3">
      <div className="flex h-full flex-col">
        <div className="text-xl">Queue Music</div>
        <div className="h-full flex-grow-0 overflow-y-auto">
          <div className="flex flex-col divide-y">sdfsdf</div>
        </div>
      </div>
    </div>
  );
};

export default QueueMusicRoom;
