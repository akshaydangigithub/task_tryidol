import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center fixed w-full top-0 left-0 bg-white z-10 border-b-[1px] justify-between py-4 px-4 md:px-20">
      <Link to="/">
        <h1 className="text-lg md:text-xl font-bold">Tryidol Technologies</h1>
      </Link>
    </nav>
  );
};

export default Navbar;
