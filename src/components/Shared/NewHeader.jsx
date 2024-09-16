import React from "react";

const NewHeader = () => {
  return (
    <nav className="bg-gray-800 fixed top-0 w-full z-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16 bg-gray-400 w-full">
          {/* Logo or Brand Name */}
          <div className="text-white text-2xl font-bold">MyWebsite</div>

          {/* Links */}
          <div className="hidden md:flex space-x-4">
            <a href="#home" className="text-gray-300 hover:text-white">
              Home
            </a>
            <a href="#about" className="text-gray-300 hover:text-white">
              About
            </a>
            <a href="#services" className="text-gray-300 hover:text-white">
              Services
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white">
              Contact
            </a>
          </div>

          {/* Mobile Menu (Hamburger Icon) */}
          <div className="md:hidden">
            <button
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NewHeader;
