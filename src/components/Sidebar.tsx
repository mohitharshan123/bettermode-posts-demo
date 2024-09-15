import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import Logo from "assets/logo.svg";
import { GoHome } from "react-icons/go";
import { FaBars } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import useClickOutside from "hooks/useClickOutside";
import { JWT_TOKEN_COOKIE_NAME, ROUTES } from "constants/index";
import clsx from "clsx";
import useScrollStore from "stores/useScrollStore";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isInfiniteScrollEnabled, toggleInfiniteScroll } = useScrollStore();

  const sidebarRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const handleLogout = async () => {
    const cookies = new Cookies();
    await cookies.remove(JWT_TOKEN_COOKIE_NAME, { path: "/" });
    navigate(ROUTES.authentication.index);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useClickOutside({
    popupRef: sidebarRef,
    buttonRef: toggleButtonRef,
    action: () => setIsOpen(false),
  });

  const isActive = (path: string) => location.pathname?.includes(path);

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          className="text-gray-700 dark:text-gray-200"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
          ref={toggleButtonRef}
        >
          <FaBars size={24} />
        </button>
      </div>

      <div
        id="hs-application-sidebar"
        ref={sidebarRef}
        className={clsx(
          "fixed inset-y-0 start-0 z-40 w-[260px] bg-white border-e border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 transform transition-transform duration-300 ease-in-out",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
            "lg:translate-x-0 lg:block lg:w-[260px]": true,
          }
        )}
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          <div className="px-6 pt-4">
            <a
              className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
              aria-label="Logo"
            >
              <img src={Logo} alt="logo" className="w-32" />
            </a>
          </div>

          <div className="flex flex-col h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <nav className="hs-accordion-group p-3 w-full flex flex-col flex-wrap flex-grow">
              <ul className="flex flex-col space-y-1 flex-grow">
                <li>
                  <a
                    href="#"
                    className={clsx(
                      "cursor-pointer flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg focus:outline-none",
                      {
                        "bg-gray-200 text-gray-800 dark:bg-neutral-700 dark:text-white":
                          isActive(ROUTES.posts.index),
                        "text-gray-800 dark:text-white hover:bg-gray-100 focus:bg-gray-700 dark:hover:bg-neutral-700":
                          !isActive(ROUTES.posts.index),
                      }
                    )}
                    onClick={() => navigate(ROUTES.posts.index)}
                  >
                    <GoHome size={20} />
                    Posts
                  </a>
                </li>
              </ul>
            </nav>

            <div className="p-3">
              <button
                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg w-full hover:bg-gray-100 focus:outline-none dark:text-white dark:hover:bg-neutral-700"
                onClick={handleLogout}
              >
                <CiLogout size={20} />
                Logout
              </button>
            </div>

            <div className="p-3">
              <label className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg w-full hover:bg-gray-100 focus:outline-none dark:text-white dark:hover:bg-neutral-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isInfiniteScrollEnabled}
                  onChange={toggleInfiniteScroll}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
                <span className="ml-2">Enable Infinite Scroll</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
