import { NextPage } from "next";
import Navbar from "../components/Navbar";
import Player from "../components/Player";

interface Props {
  children: React.ReactNode;
}

const WithNavbar: NextPage<Props> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      {children}
      <Player />
    </div>
  );
};

export default WithNavbar;
