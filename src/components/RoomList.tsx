import databaseClient from "@/configs/databaseClient";
import { RoomFirebaseInterface } from "@/interfaces/RoomFirebaseInterface";
import imageDiscord from "@/utils/imageDiscord";
import { onValue, ref } from "firebase/database";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { api } from "@/utils/api";
import Link from "next/link";

interface PropsRoom extends RoomFirebaseInterface {}

const Room: NextPage<PropsRoom> = ({ name, users, owner, id }) => {
  const { data: session } = useSession();
  const room = api.room.deleteRoom.useMutation();

  const deleteRoom = () => {
    room.mutate({ id });
  };

  return (
    <Link href={`/room/${id}`}>
      <div className="divide flex w-full cursor-pointer flex-col justify-between p-3 hover:bg-base-300 md:flex-row md:items-center">
        <div className="flex flex-col ">
          <div className="truncate text-lg">{name}</div>
          <div className="max-w-md truncate text-sm">
            See You Again (feat. Charlie Puth) - Wiz Khalifa
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end">
          <div className="avatar-group w-full -space-x-4">
            {users.map((user, i) => (
              <div key={i} className="avatar">
                <div className="w-8">
                  <img src={imageDiscord(user.id, user.image)} />
                </div>
              </div>
            ))}
            <div className="placeholder avatar">
              <div className="w-8 bg-neutral-focus text-neutral-content">
                <span>+97</span>
              </div>
            </div>
          </div>
        </div>
        {session?.user.id === owner ? (
          <div onClick={() => deleteRoom()}>
            <DeleteIcon />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </Link>
  );
};

interface Props {}

const RoomList: NextPage<Props> = () => {
  const [Rooms, setRooms] = useState<RoomFirebaseInterface[] | null>(null);

  useEffect(() => {
    const roomsRef = ref(databaseClient, "rooms/");
    onValue(roomsRef, (snapshot) => {
      if (!snapshot.exists()) {
        setRooms(null);
        return;
      }
      const data = snapshot.val();

      let rooms: RoomFirebaseInterface[] = [];
      Object.keys(data).forEach((key) => {
        rooms.push({ ...data[key], id: key });
      });
      setRooms(rooms);
    });
  }, []);

  return (
    <div className="flex flex-1 flex-col rounded-xl bg-base-200 p-3">
      <div className="flex h-full flex-col">
        <div className="text-xl">Room List</div>
        <div className="h-full flex-grow-0 overflow-y-auto">
          <div className="flex flex-col divide-y">
            {Rooms?.map((room, i) => (
              <Room key={i} {...room} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomList;
