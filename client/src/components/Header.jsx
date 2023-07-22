import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <header className="flex justify-between">
      <Link to="/" className="flex items-center gap-1">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
          alt="logo"
          className="h-8 w-fit"
        />
      </Link>
      <div className="border border-gray-300 flex rounded-full py-2 pl-4 pr-2 gap-3 items-center shadow-md shadow-gray-300">
        <div>Anywhere</div>
        <div className="border-l border-gray-300 h-7"></div>
        <div>Any week</div>
        <div className="border-l border-gray-300 h-7"></div>
        <div className="text-gray-500">Add guest</div>
        <button className="text-white bg-primary rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      <div
        onClick={() => setShowMenu(!showMenu)}
        className="relative border border-gray-300 flex rounded-full py-2 px-2 gap-1 items-center hover:shadow-md hover:shadow-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        {!user ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-primary"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <div className="w-8 h-8 text-white bg-primary rounded-full text-center">
            {user.name[0]}
          </div>
        )}
        {!user && showMenu && (
          <div className="flex flex-col rounded-lg absolute top-16 right-0 shadow-boxShadow w-[10rem] py-4">
            <Link to="signup" className="hover:bg-gray-100 py-2 pl-5">
              Sign up
            </Link>
            <Link
              className="hover:bg-gray-100 py-2 pl-5"
              to={user ? "/account" : "/login"}
            >
              Login
            </Link>
          </div>
        )}
        {user && showMenu && (
          <div className="flex flex-col rounded-lg absolute top-16 right-0 shadow-boxShadow w-[10rem] py-4">
            <Link to="/account" className="hover:bg-gray-100 py-2 pl-5">
              Account Details
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
