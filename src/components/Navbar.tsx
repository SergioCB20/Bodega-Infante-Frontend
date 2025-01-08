import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Logo from "../assets/logo.png";
import Dropdown from './Dropdown';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  return (
    <nav className="bg-white shadow dark:bg-gray-800 fixed z-10 w-[90%]">
      <div className="px-6 py-5 mx-auto h-[65px] lg:flex justify-between items-center max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" aria-label="Logo">
            <img
              className="w-auto h-6 sm:h-7"
              src={Logo}
              alt="Logo"
            />
          </a>

          {/* Mobile Menu Button */}
          <div className="flex gap-4 items-center lg:hidden">
            {/* Toggle User Dropdown */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none"
            >
              <FontAwesomeIcon icon={faUser} />
            </button>
            <Dropdown isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen} />
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center lg:justify-between lg:space-x-6">
          {/* Menu Links */}
          <div className="flex space-x-6">
            <a
              href="#"
              className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Paquetes
            </a>
            <a
              href="#"
              className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Productos
            </a>
          </div>

          {/* Search and Notification */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                placeholder="Search"
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </div>

            {/* Cart Icon */}
            <a
              href="#"
              className="relative text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              <span className="absolute top-0 left-0 p-1 text-xs text-white bg-blue-500 rounded-full"></span>
            </a>

            {/* User Icon */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none"
            >
              <FontAwesomeIcon icon={faUser} />
            </button>
            <Dropdown isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen} />
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full'
          } absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:flex md:items-center md:justify-between lg:hidden`}
        >
          {/* Menu Links */}
          <div className="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0">
            <a
              href="#"
              className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2"
            >
              Home
            </a>
            <a
              href="#"
              className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2"
            >
              About
            </a>
            <a
              href="#"
              className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2"
            >
              Contact
            </a>
          </div>

          {/* Search and Notification */}
          <div className="relative mt-4 md:mt-0 flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                placeholder="Search"
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </div>

            {/* Cart Icon */}
            <a
              href="#"
              className="relative text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              <span className="absolute top-0 left-0 p-1 text-xs text-white bg-blue-500 rounded-full"></span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

