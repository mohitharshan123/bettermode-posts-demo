import { MdOutlineNotifications } from "react-icons/md";

const Header: React.FC<{ user: Member }> = ({ user }) => (
  <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 lg:ps-[260px] dark:bg-neutral-800 dark:border-neutral-700">
    <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
      <div className="me-5 lg:me-0 lg:hidden"></div>
      <div className="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3">
        <div className="hidden md:block"></div>

        <div className="flex flex-row items-center justify-end gap-3">
          <button
            type="button"
            className="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          >
            <MdOutlineNotifications size={22} />
          </button>

          <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
            <button
              id="hs-dropdown-account"
              type="button"
              className="size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:text-white"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              <img
                className="shrink-0 size-[38px] rounded-full"
                src={user?.profilePicture?.url}
                alt="Avatar"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
