import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { FcBusinessman } from "react-icons/Fc";
import { signOut } from "firebase/auth";
import { auth } from "../lib/fitebase";
import { setUser } from "../redux/features/user/userSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
    });
  };
  return (
    <div className="bg-[#f8f4f2] py-1 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-none">
              <label htmlFor="my-drawer" className="btn btn-link text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div>
              <Link to="/">
                <h3 className="text-2xl font-semibold text-teal-800 font-mono">
                  Book Haven
                </h3>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {user.email && (
              <Link to="/create-book">
                <button className="btn btn-sm rounded-md text-white bg-teal-700 hover:bg-teal-800 mr-2 hover:bg-gray-700">
                  Create Book
                </button>
              </Link>
            )}
            <Link to="/all-books">
              <button className="btn btn-sm rounded-md text-white bg-teal-700 hover:bg-teal-800 mr-2 hover:bg-gray-700">
                All Books
              </button>
            </Link>
            {!user.email && (
              <>
                <Link to="/sign-up">
                  <button className="btn btn-sm rounded-md text-white bg-red-700 mr-2 hover:bg-red-800">
                    Sign up
                  </button>
                </Link>
                <Link to="/login">
                  <button className="btn btn-sm rounded-md text-white bg-violet-800 mr-2 hover:bg-violet-900">
                    Login
                  </button>
                </Link>
              </>
            )}
            {user.email && (
              <div className="dropdown dropdown-bottom dropdown-end mt-1">
                <label tabIndex={0}>
                  <div className="avatar">
                    <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <FcBusinessman className="text-4xl -ml-[2px]" />
                    </div>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <Link to="wish-list">
                    <li>
                      <a>Wish List</a>
                    </li>
                  </Link>
                  <Link to="reading">
                    <li>
                      <a>Reading</a>
                    </li>
                  </Link>
                  <Link to="finished">
                    <li>
                      <a>Finished</a>
                    </li>
                  </Link>
                  <li
                    onClick={handleLogOut}
                    className="btn text-white btn-sm w-full bg-teal-500 hover:bg-teal-600 mt-1"
                  >
                    LogOut
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
