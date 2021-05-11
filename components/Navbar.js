import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Navbar({ fixed }) {
  const router = useRouter();
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { roomId, playerName } = router.query; // Gets roomId from URL
  return (
    <>
      <nav className="sticky top-0 flex px-2 py-2 bg-blue-900">
        <div className="container flex items-center">
          <Image
            src={`/assets/images/homepage/Logo1.png`}
            alt="logo"
            width={40}
            height={40}
          />
          <div className="relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="inline-block py-1 mx-4 text-sm font-bold leading-relaxed text-white uppercase whitespace-nowrap"
              href="#"
            >
              Party House Game Room:{" "}
              <span className="font-normal">{roomId}</span>
            </a>
            <button
              className="block px-3 py-1 text-xl leading-none text-white bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          {/* <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          > */}
          <span className="flex items-center ml-6 text-lg font-normal leading-snug text-white">
            Welcome: {playerName}
          </span>
          <ul className="list-none lg:flex-row lg:ml-auto">
            {/* <li className="nav-item">
              <a
                className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-white uppercase hover:opacity-75"
                href="#"
              >
                <span className="ml-2">Lin1</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-white uppercase hover:opacity-75"
                href="#"
              >
                <span className="ml-2">Link2</span>
              </a>
            </li> */}
            <li className="nav-item ">
              <a
                className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-white uppercase hover:opacity-75"
                href="/api/auth/logout"
              >
                <span className="ml-2">Logout</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
