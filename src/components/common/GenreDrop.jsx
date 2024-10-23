import React, { useState } from 'react';
import clsx from 'clsx';
import { RiArrowDropDownLine } from 'react-icons/ri';

const Dropdown = ({ options, className, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (value) => {
    setSelectedOption(value);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className={clsx("relative", className)}>
      <button 
        className={clsx(
          "flex items-center justify-between w-full rounded-lg bg-gray-input text-white py-2 px-4 focus:outline-none",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption || "Genre"}</span>
        <RiArrowDropDownLine className="text-white" size={20} />
      </button>
      {isOpen && (
        <div className={clsx(
          "absolute z-30 bg-gray-input rounded shadow-lg max-h-[400px] overflow-y-auto",
          "w-[100px] md:w-[400px]"  // Full width
        )}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
            {options.map((option) => (
              <button
                key={option.value}
                className={clsx(
                  "text-left p-2 hover:bg-gray-700 w-full",
                  selectedOption === option.value && "bg-gray-600"
                )}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
