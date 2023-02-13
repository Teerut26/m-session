import { NextPage } from "next";
import Navbar from "../components/Navbar";
import Player from "../components/Player";

interface Props {
  children: React.ReactNode;
  roomId?: string;
}

const WithNavbar: NextPage<Props> = ({ children, roomId }) => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="h-[80%] flex-grow">{children}</div>
      <Player roomId={roomId!} />
    </div>
  );
};

export default WithNavbar;
