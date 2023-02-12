import CreateRoom from "@/components/CreateRoom";
import RoomList from "@/components/RoomList";
import WithNavbar from "@/layouts/WithNavbar";
import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <WithNavbar>
      <div className="flex h-full flex-col overflow-y-auto p-3">
        <div className="flex h-full gap-3 flex-col md:flex-row">
          <RoomList />
          <CreateRoom />
        </div>
      </div>
    </WithNavbar>
  );
};

export default Home;
