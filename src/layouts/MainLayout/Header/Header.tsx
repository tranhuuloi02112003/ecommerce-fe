import { useState } from "react";

import searchIcon from "@/assets/icon/search.svg";
import cartIcon from "@/assets/icon/cart.svg";
import wishListIcon from "@/assets/icon/wish-list.svg";

const Header = () => {
  const [search, setSearch] = useState("");
  return (
    <header className="w-full border-b-[1px] border-b-gray-200">
      {/* Top bar */}
      <div className="py-[12px] text-3xl bg-black text-white w-full text-center">
        <span>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </span>
        <a className="ml-5 underline decoration-1 underline-offset-2" href="#">
          Shop Now
        </a>
      </div>
      {/* Main header */}
      <div className="app-container items-center justify-between mt-[30px] mb-[16px] flex w-full">
        {/* Logo */}
        <div className="font-inter text-[24px] mr-[190px]">Exclusive</div>
        {/* Nav */}
        <nav className="flex items-center gap-[48px] ">
          <a href="#" className="hover:text-primary">
            Home
          </a>
          <a href="#" className="hover:text-primary">
            Contact
          </a>
          <a href="#" className="hover:text-primary">
            About
          </a>
          <a href="#" className="hover:text-primary">
            Sign up
          </a>
        </nav>
        {/* Search + Actions */}
        <div className="flex items-center">
          {/* Search */}
          <div className="flex bg-[#F5F5F5] py-[7px] pr-[12px] pl-[20px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What are you looking for?"
              className="rounded-md p-2"
            />
            <img src={searchIcon} alt="search icon" />
          </div>
          {/* Actions */}
          <div className="flex items-center gap-4 text-xl">
            <img className="ml-[24px] mr-[16px]" src={wishListIcon} alt="wishlist icon" />
            <img src={cartIcon} alt="cart icon" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
