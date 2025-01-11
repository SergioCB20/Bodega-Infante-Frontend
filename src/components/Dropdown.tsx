import React from 'react';
import { DropdownItemType, DropdownProps } from '../interfaces/componentsProps';
import { Link } from 'react-router-dom';

const Dropdown: React.FC<DropdownProps> = ({ isOpen,items }) => {

  return (
    <>
      {isOpen && (
        <div

          className="absolute right-0 top-8 z-100 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
        >
          {items.map((item, index) => (
            item.type === DropdownItemType.LINK ? (
              <Link
              key={index}
              to={item.href || "#"}
              className="block px-4 py-2 text-sm text-gray-700 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {item.text}
            </Link>
            ):(
              <button
              key={index}
              onClick={item.onClick}
              className="w-full text-start block px-4 py-2 text-sm text-gray-700 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                {item.text}
              </button>
            )
          ))}
        </div>
      )}
    </>
  );
};

export default Dropdown;

