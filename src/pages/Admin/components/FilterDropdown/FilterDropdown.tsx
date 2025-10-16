import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState, useEffect } from "react";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  width?: string;
}

export default function FilterDropdown({
  label,
  options,
  defaultValue = "",
  onChange,
  width = "w-[170px]",
}: FilterDropdownProps) {
  const defaultOption =
    options.find((opt) => opt.value === defaultValue) || options[0];
  const [selected, setSelected] = useState<FilterOption>(defaultOption);

  useEffect(() => {
    const newOption =
      options.find((opt) => opt.value === defaultValue) || options[0];
    setSelected(newOption);
  }, [defaultValue, options]);

  const handleChange = (newOption: FilterOption) => {
    setSelected(newOption);
    if (onChange) {
      onChange(newOption.value);
    }
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className={`relative ${width}`}>
        <ListboxButton
          className="relative w-full p-[12px] rounded-lg bg-[#fff] border border-gray-200
                    text-left text-[14px] cursor-pointer flex items-center justify-between
                    hover:border-gray-300 focus:outline-none focus:border-gray-400"
        >
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase font-medium">
              {label}
            </span>
            <span className="truncate text-gray-800 mt-[2px]">
              {selected.label}
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M4.375 7.5L10 13.125L15.625 7.5"
              stroke="#232321"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ListboxButton>

        <ListboxOptions
          className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 
                     text-sm shadow-lg border border-gray-200 focus:outline-none z-10"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option}
              className="relative cursor-pointer select-none py-2 px-4 
               data-[focus]:bg-gray-100 data-[focus]:text-gray-900 text-gray-700"
            >
              <span
                className={`block truncate ${
                  selected?.value === option.value
                    ? "font-medium text-gray-900"
                    : "font-normal"
                }`}
              >
                {option.label}
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
