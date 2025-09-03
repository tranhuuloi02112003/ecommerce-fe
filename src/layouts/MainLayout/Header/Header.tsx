import { useState } from "react";
import { Link } from "react-router-dom";

import { HeartIcon, CartIcon, SearchIcon } from "@/components/icons";
import routes from "@/config/routes";

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
        <div className="font-inter text-[24px] mr-[190px]">Exclusive</div>
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
          <div className="flex items-center bg-[#F5F5F5] py-[7px] pr-[12px] pl-[20px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What are you looking for?"
              className="rounded-md p-2"
            />
            <SearchIcon className="cursor-pointer" />
          </div>
          {/* Actions */}
          <div className="flex items-center gap-4 text-xl">
            <HeartIcon className="ml-[18px] mr-[12px] cursor-pointer" />
            <CartIcon size={24} color="#000" className="cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
