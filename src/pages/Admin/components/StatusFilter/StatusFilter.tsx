import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";

const statuses = [
  { label: "All Statuses", value: "" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Canceled", value: "CANCELED" },
  { label: "Pending", value: "PENDING" },
];

export default function StatusFilter() {
  const [selected, setSelected] = useState(statuses[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative w-[170px]">
        <ListboxButton
          className="relative w-full p-[12px] rounded-lg bg-[#fff] 
                    text-left text-[14px] cursor-pointer flex items-center justify-between"
        >
          <span className="truncate text-gray-800">{selected.label}</span>
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
                     text-sm shadow-lg z-10"
        >
          {statuses.map((status) => (
            <ListboxOption
              key={status.value}
              value={status}
              className={({ focus, selected }) =>
                `relative cursor-pointer py-2 pl-3 pr-10  text-[14px]
                 ${
                   selected
                     ? "bg-blue-50 text-blue-900"
                     : focus
                     ? "bg-gray-100 text-gray-900"
                     : "text-gray-700"
                 }`
              }
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {status.label}
                  </span>
                </>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
