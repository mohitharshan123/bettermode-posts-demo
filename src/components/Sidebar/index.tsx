import { useNavigate } from "react-router-dom";

import { GoHome } from "react-icons/go";
import { FaChevronRight } from "react-icons/fa";

import Logo from "../../assets/logo.svg";
import { ROUTES } from "../../constants";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="-mt-px">
        <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex items-center py-2">
            <ol className="ms-3 flex items-center whitespace-nowrap">
              <li className="mr-1 flex items-center text-sm text-gray-800 dark:text-neutral-400">
                Dashboard
                <FaChevronRight className="ml-2" />
              </li>
              <li
                className="cursor-pointer hover:text-gray-500 text-sm font-semibold text-gray-800 truncate dark:text-neutral-400"
                aria-current="page"
                onClick={() => navigate(ROUTES.posts)}
              >
                Posts
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div
        id="hs-application-sidebar"
        className="hs-overlay [--auto-close:lg]
  hs-overlay-open:translate-x-0
  -translate-x-full transition-all duration-300 transform
  w-[260px] h-full
  hidden
  fixed inset-y-0 start-0 z-[60]
  bg-white border-e border-gray-200
  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
  dark:bg-neutral-800 dark:border-neutral-700"
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          <div className="px-6 pt-4">
            <a
              className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
              aria-label="Bettermode"
            >
              <img src={Logo} alt="logo" />
            </a>
          </div>

          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <nav
              className="hs-accordion-group p-3 w-full flex flex-col flex-wrap"
              data-hs-accordion-always-open
            >
              <ul className="flex flex-col space-y-1">
                <li>
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700 dark:bg-neutral-700 dark:text-white"
                    onClick={() => navigate(ROUTES.posts)}
                  >
                    <GoHome size={20} />
                    Posts
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
