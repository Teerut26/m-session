import { NextPage } from "next";
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    isDelete?: boolean
}

const QueueMusic: NextPage<Props> = ({isDelete}) => {
  return (
    <>
      <div className="flex justify-between items-center hover:bg-base-200 px-3 py-2 cursor-pointer">
        <div className="flex w-full gap-5 flex-1">
          <div>
            <img
              src="https://lh3.googleusercontent.com/bHB7v62M2CrgPXeitNmG36d8kUDB6pVNUbascGWXFNse3H38s16xcsd7GXb6rst7akr0fcIbq3XQ_jAURA=w60-h60-l90-rw"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-lg">จิ๊จ๊ะ</div>
            <div>Silly Fools</div>
          </div>
        </div>
        {isDelete && <DeleteIcon />}
      </div>
    </>
  );
};

export default QueueMusic;
