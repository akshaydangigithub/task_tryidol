import React from "react";

const Footer = () => {
  return (
    <footer className="border-t-[1px] py-3 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left px-4 sm:px-20">
      <p>
        &copy; 2025 <span className="text-red-500">Tryidol Technologies</span> All Rights
        Reserved
      </p>
      <p className="animate-pulse mt-2 sm:mt-0">
        Made with <span className="text-red-500">❤️</span> Hariom
      </p>
    </footer>
  );
};

export default Footer;
