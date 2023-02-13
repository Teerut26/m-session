import QueueMusicRoom from "@/components/QueueMusicRoom";
import SearchMusic from "@/components/SearchMusic";
import WithNavbar from "@/layouts/WithNavbar";
import { NextPage } from "next";
import { useRouter } from "next/router";

interface Props {}

const Room: NextPage<Props> = () => {
    const router = useRouter();
  return (
    <WithNavbar roomId={router.query.id as string}>
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
