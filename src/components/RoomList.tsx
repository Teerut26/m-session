import { NextPage } from "next";

interface PropsRoom {}

const Room: NextPage<Props> = () => {
  return (
    <div className="divide flex w-full cursor-pointer flex-col justify-between p-3 hover:bg-base-300 md:flex-row md:items-center">
      <div className="flex flex-col ">
        <div className="truncate text-lg">มาฟังกันน</div>
        <div className="max-w-md truncate text-sm">
          See You Again (feat. Charlie Puth) - Wiz Khalifa
        </div>
      </div>
      <div className="">
        <div className="avatar-group w-full -space-x-4">
          {[...new Array(3)].map((_, i) => (
            <div className="avatar">
              <div className="w-8">
                <img src="https://cdn.discordapp.com/avatars/682877994628284436/1e575813af8a9bb0a4696e101b08859e.webp?size=160" />
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
    </div>
  );
};

interface Props {}

const RoomList: NextPage<Props> = () => {
  return (
    <div className="flex flex-1 flex-col bg-base-200 p-3 rounded-xl">
      <div className="flex h-full flex-col">
        <div className="text-xl">Create room</div>
        <div className="h-full flex-grow-0 overflow-y-auto">
          <div className="flex flex-col divide-y">
            {[...new Array(10)].map((_, i) => (
              <Room />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomList;
