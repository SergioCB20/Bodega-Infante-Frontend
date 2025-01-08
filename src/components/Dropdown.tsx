import React, { useRef, useEffect } from 'react';

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen, setIsOpen }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false); 
    }
  };

  useEffect(() => {
    // Add event listener when component is mounted
    document.addEventListener('click', handleClickOutside);

    // Clean up event listener when component is unmounted
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <div
        
          className="absolute right-0 top-8 z-100 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
        >
          <a
            href="#"
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Your profile
          </a>
          <a
            href="#"
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Your projects
          </a>
          <a
            href="#"
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Help
          </a>
          <a
            href="#"
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Settings
          </a>
          <a
            href="#"
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Sign Out
          </a>
        </div>
      )}
    </>
  );
};

export default Dropdown;

