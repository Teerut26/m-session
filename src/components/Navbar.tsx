import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";

interface Props {}

const Navbar: NextPage<Props> = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className="navbar bg-base-200">
        <div className="flex-1">
          <a className="btn-ghost btn text-xl normal-case">M Session</a>
        </div>
        <div className="flex-none">
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                <img src={session?.user.image!} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-300 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={()=>signOut()}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
