import { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { handleApiError } from "@/utils/errorHandler";
import { toast } from "react-toastify";
import routes from "@/config/routes";
import { useAuth } from "@/hooks/useAuth.ts";

const AccountDropdown = () => {
  const { user, loadingUser, logout } = useAuth();

  
  const defaultAvatar =
    "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff";

  if (loadingUser || !user) {
    return null;
  }
  console.log("User in AccountDropdown:", user);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successful!");
    } catch (error: unknown) {
      const errorMessage = handleApiError(
        error,
        "Logout failed. Please try again."
      );
      toast.error(errorMessage);
    }
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton className="w-9 h-9 rounded-full text-white overflow-hidden">
        <img
          src={user.avatarUrl || defaultAvatar}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultAvatar;
          }}
        />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <MenuItems className="absolute right-0 mt-2 w-[230px] text-[14px] rounded-lg bg-black/40 backdrop-blur-[50px] shadow-lg p-3 z-50">
          <MenuItem>
            <Link
              className="flex items-center gap-3 px-4 py-3 rounded-md text-white data-[focus]:bg-white/20"
              to={routes.accountProfile}
            >
              <span className="w-[30px] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M24 27V24.3333C24 22.9188 23.5224 21.5623 22.6722 20.5621C21.8221 19.5619 20.669 19 19.4667 19H11.5333C10.331 19 9.17795 19.5619 8.32778 20.5621C7.47762 21.5623 7 22.9188 7 24.3333V27"
                    stroke="#FAFAFA"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.5 14C18.9853 14 21 11.9853 21 9.5C21 7.01472 18.9853 5 16.5 5C14.0147 5 12 7.01472 12 9.5C12 11.9853 14.0147 14 16.5 14Z"
                    stroke="#FAFAFA"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              My Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              className="flex items-center gap-3 px-4 py-3 rounded-md text-white data-[focus]:bg-white/20"
              to="/orders"
            >
              <span className="w-[30px] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={22}
                  viewBox="0 0 20 22"
                  fill="none"
                >
                  <path
                    d="M1 5.3V19.5C1 19.7652 1.10536 20.0196 1.29289 20.2071C1.48043 20.3946 1.73478 20.5 2 20.5H18C18.2652 20.5 18.5196 20.3946 18.7071 20.2071C18.8946 20.0196 19 19.7652 19 19.5V5.3H1Z"
                    stroke="#FAFAFA"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 5.3L16.1665 1.5H3.8335L1 5.3M13.7775 8.6C13.7775 10.699 12.0865 12.4 10 12.4C7.9135 12.4 6.222 10.699 6.222 8.6"
                    stroke="#FAFAFA"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              My Order
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              className="flex items-center gap-3 px-4 py-3 rounded-md text-white data-[focus]:bg-white/20"
              to="/cancellations"
            >
              <span className="w-[30px] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_214_2788)">
                    <path
                      d="M8 16L12 12M16 8L11.9992 12M11.9992 12L8 8M12 12L16 16"
                      stroke="#FAFAFA"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx={12}
                      cy={12}
                      r="11.25"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_214_2788">
                      <rect width={24} height={24} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              My Cancellations
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              className="flex items-center gap-3 px-4 py-3 rounded-md text-white data-[focus]:bg-white/20"
              to="/reviews"
            >
              <span className="w-[30px] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={19}
                  viewBox="0 0 20 19"
                  fill="none"
                >
                  <path
                    d="M9.37891 1.54785C9.56771 0.937185 10.4323 0.93719 10.6211 1.54785L11.8184 5.4209C12.0968 6.32148 12.9295 6.93631 13.8721 6.93652H17.8281C18.4514 6.93652 18.7176 7.72842 18.2207 8.10449L14.8906 10.623C14.1689 11.1689 13.8665 12.1091 14.1338 12.9736L15.3867 17.0264C15.5734 17.6313 14.8728 18.1193 14.3701 17.7344L11.3076 15.3877C10.5361 14.7967 9.46386 14.7967 8.69238 15.3877L5.61328 17.7471C5.11126 18.1311 4.41157 17.6446 4.59668 17.04L5.83203 13.0049C6.09492 12.1463 5.79679 11.214 5.08398 10.668L1.73438 8.10254C1.24116 7.7247 1.50858 6.93652 2.12988 6.93652H6.12793C7.07053 6.93631 7.90322 6.32147 8.18164 5.4209L9.37891 1.54785Z"
                    stroke="#FAFAFA"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
              My Reviews
            </Link>
          </MenuItem>
          <div className="my-1 h-px bg-gray-200" />
          <MenuItem>
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-md text-white data-[focus]:bg-white/20"
            >
              <span className="w-[30px] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 12H13.5M6 15L3 12L6 9M11 7V6C11 5.46957 11.2107 4.96086 11.5858 4.58579C11.9609 4.21071 12.4696 4 13 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H13C12.4696 20 11.9609 19.7893 11.5858 19.4142C11.2107 19.0391 11 18.5304 11 18V17"
                    stroke="#FAFAFA"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Logout
            </button>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default AccountDropdown;
