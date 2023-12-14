"use client";
import React, { useState } from "react";

const DropDown = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left caret-hidden">
      <div>
        <span className="caret-hidden rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="caret-hidden inline-flex justify-between w-[180px] py-2 mobile-subtitle-b font-medium text-white rounded-md"
          >
            {selectedOption.label}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      </div>

      {isOpen && (
        <div className="z-50 origin-top-right absolute left-0 mt-2 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1 w-fit">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className="caret-hidden block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer "
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default DropDown;
