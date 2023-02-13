import { api } from "@/utils/api";
import { NextPage } from "next";
import { useEffect, useRef } from "react";

interface Props {}

const CreateRoom: NextPage<Props> = () => {
  const room = api.room.createRoom.useMutation();

  const name = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const createRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.current || !password.current) {
      return;
    }
    room.mutate({
      name: name.current.value,
      password: password.current.value,
    });
  };

  useEffect(() => {
    if (room.isSuccess) {
      if (!name.current || !password.current) {
        return;
      }
      name.current.value = "";
      password.current.value = "";
    }
  }, [room]);

  return (
    <div className="flex flex-1 flex-col rounded-xl bg-base-200 p-3">
      <div className="flex h-full flex-col">
        <div className="text-xl">Create room</div>
        <div className="mt-5 h-full flex-grow-0 overflow-y-auto">
          <div className="flex h-full flex-col items-center justify-center">
            <form onSubmit={createRoom} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div>Room Name</div>
                <input required ref={name} type="text" className="input" />
              </div>
              <div className="flex flex-col gap-1">
                <div>Password</div>
                <input ref={password} type="text" className="input" />
              </div>
              <button type="submit" className="btn-primary btn">
                Create Room
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
