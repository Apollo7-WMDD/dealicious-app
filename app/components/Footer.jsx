import React from "react";

const Footer = () => {
  return (
    // create simple footer with tailwind no links
    <div className="bg-gray-800 text-gray-100 flex justify-center items-center h-16 border-t border-gray-700 w-screen">
      <span className="text-sm">Dealicious &copy; 2023</span>
    </div>
  );
};

export default Footer;
