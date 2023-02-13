import QueueMusicRoom from "@/components/QueueMusicRoom";
import SearchMusic from "@/components/SearchMusic";
import WithNavbar from "@/layouts/WithNavbar";
import { NextPage } from "next";

interface Props {}

const Room: NextPage<Props> = () => {
  return (
    <WithNavbar>
      <div className="flex h-full flex-col overflow-y-auto p-3">
        <div className="flex h-full flex-col gap-3 md:flex-row">
          <QueueMusicRoom />
          <SearchMusic />
        </div>
      </div>
    </WithNavbar>
  );
};

export default Room;
