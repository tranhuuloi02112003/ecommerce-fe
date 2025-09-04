import { useState } from "react";
import { Link } from "react-router-dom";

import { HeartIcon, CartIcon, SearchIcon } from "@/components/icons";
import routes from "@/config/routes";
import AccountDropdown from "./AccountDropdown";

const Header = () => {
  const [search, setSearch] = useState("");
  return (
    <header className="w-full border-b-[1px] border-b-gray-200">
      {/* Top bar */}
      <div className="py-[12px] text-3xl bg-black text-white w-full text-center">
        <span>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </span>
        <Link className="ml-5 underline decoration-1 underline-offset-2" to="#">
          Shop Now
        </Link>
      </div>
      {/* Main header */}
      <div className="app-container items-center justify-between mt-[30px] mb-[16px] flex w-full">
        {/* Logo */}
        <div className="font-inter text-[24px] mr-[70px]">Exclusive</div>
        {/* Nav */}
        <nav className="flex items-center gap-[48px] ">
          <Link to={routes.home} className="hover:text-primary">
            Home
          </Link>
          <Link to="#" className="hover:text-primary">
            Contact
          </Link>
          <Link to="#" className="hover:text-primary">
            About
          </Link>
          <Link to={routes.signUp} className="hover:text-primary">
            Sign Up
          </Link>
        </nav>
        {/* Search + Actions */}
        <div className="flex items-center">
          {/* Search */}
          <div className="flex items-center justify-between bg-[#F5F5F5] py-[6px] pr-[12px] pl-[10px] rounded-md w-[243px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What are you looking for?"
              className="p-2 text-[12px] w-full"
            />
            <SearchIcon className="cursor-pointer" />
          </div>
          {/* Actions */}
          <div className="flex items-center justify-center gap-[16px] text-xl ml-[25px]">
            <Link to={routes.wishlist}>
              <HeartIcon className="cursor-pointer" />
            </Link>
            <CartIcon size={24} color="#000" className="cursor-pointer" />
            <AccountDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
