import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

const menuItems = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M0.666992 8.5H4.66699C4.69835 8.50003 4.72135 8.50411 4.74023 8.51172L4.78906 8.5459C4.81771 8.57508 4.83301 8.60476 4.83301 8.66699V11.333C4.83301 11.3962 4.81707 11.4251 4.78809 11.4541C4.75836 11.4838 4.72947 11.4999 4.66699 11.5H0.666992C0.604303 11.5 0.575004 11.4843 0.545898 11.4551L0.544922 11.4541L0.511719 11.4062C0.5041 11.3876 0.5 11.3644 0.5 11.333V8.66699C0.5 8.60429 0.516115 8.57471 0.545898 8.54492C0.574826 8.51604 0.603867 8.5 0.666992 8.5ZM7.33301 5.83301H11.333C11.396 5.83301 11.4252 5.84915 11.4541 5.87793C11.4839 5.90771 11.5 5.93729 11.5 6V11.333C11.5 11.3957 11.4843 11.425 11.4551 11.4541L11.4541 11.4551C11.425 11.4843 11.3957 11.5 11.333 11.5H7.33301C7.27057 11.4999 7.24193 11.4842 7.21289 11.4551L7.21191 11.4541L7.17773 11.4062C7.17018 11.3876 7.16699 11.3643 7.16699 11.333V6C7.16699 5.9373 7.18214 5.90771 7.21191 5.87793C7.24084 5.849 7.27 5.83306 7.33301 5.83301ZM0.833008 11.167H4.5V8.83301H0.833008V11.167ZM7.5 11.167H11.167V6.16699H7.5V11.167ZM0.666992 0.5H4.66699C4.69835 0.500027 4.72135 0.504111 4.74023 0.511719L4.78906 0.545898C4.81771 0.575081 4.83301 0.60476 4.83301 0.666992V6C4.83301 6.06324 4.81707 6.09211 4.78809 6.12109C4.75841 6.15072 4.72936 6.16694 4.66699 6.16699H0.666992C0.604329 6.16699 0.574991 6.15125 0.545898 6.12207L0.544922 6.12012C0.515843 6.09108 0.5 6.06255 0.5 6V0.666992C0.5 0.604285 0.516115 0.574705 0.545898 0.544922C0.574826 0.51604 0.603867 0.5 0.666992 0.5ZM0.833008 5.83301H4.5V0.833008H0.833008V5.83301ZM7.33301 0.5H11.333C11.3961 0.5 11.4252 0.51604 11.4541 0.544922C11.4839 0.574705 11.5 0.604285 11.5 0.666992V3.33301C11.5 3.3957 11.4843 3.425 11.4551 3.4541L11.4541 3.45508C11.425 3.48428 11.3957 3.5 11.333 3.5H7.33301C7.27057 3.49995 7.24193 3.48421 7.21289 3.45508L7.21191 3.4541L7.17773 3.40625C7.17018 3.38762 7.16699 3.3643 7.16699 3.33301V0.666992C7.16699 0.604405 7.18224 0.574647 7.21191 0.544922C7.24084 0.515992 7.27 0.500055 7.33301 0.5ZM7.5 3.16699H11.167V0.833008H7.5V3.16699Z"
          fill="currentColor"
          stroke="currentColor"
        />
      </svg>
    ),
  },
  {
    to: "/admin/products",
    label: "All Products",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M13.0978 5.5H2.90219C2.40392 5.5 2 5.90392 2 6.40219V12.5978C2 13.0961 2.40392 13.5 2.90219 13.5H13.0978C13.5961 13.5 14 13.0961 14 12.5978V6.40219C14 5.90392 13.5961 5.5 13.0978 5.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M4.5 2.5H11.5ZM3.5 4H12.5Z" fill="currentColor" />
        <path
          d="M4.5 2.5H11.5M3.5 4H12.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    to: "/admin/orders",
    label: "Order List",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M4.5 1.02344H7.375C7.40194 1.02344 7.42822 1.03369 7.44727 1.05273C7.46631 1.07178 7.47656 1.09806 7.47656 1.125V5.5C7.47656 5.90404 7.63715 6.29145 7.92285 6.57715C8.20855 6.86285 8.59596 7.02344 9 7.02344H13.375C13.4019 7.02344 13.4282 7.03369 13.4473 7.05273C13.4663 7.07178 13.4766 7.09806 13.4766 7.125V13C13.4766 13.5242 13.2681 14.0268 12.8975 14.3975C12.5268 14.7681 12.0242 14.9766 11.5 14.9766H4.5C3.97578 14.9766 3.47322 14.7681 3.10254 14.3975C2.73186 14.0268 2.52344 13.5242 2.52344 13V3C2.52344 2.47578 2.73186 1.97322 3.10254 1.60254C3.47322 1.23186 3.97578 1.02344 4.5 1.02344ZM5.5 10.9766C5.36118 10.9766 5.22805 11.0317 5.12988 11.1299C5.03172 11.228 4.97656 11.3612 4.97656 11.5C4.97656 11.6388 5.03172 11.772 5.12988 11.8701C5.22805 11.9683 5.36118 12.0234 5.5 12.0234H10.5C10.6388 12.0234 10.772 11.9683 10.8701 11.8701C10.9683 11.772 11.0234 11.6388 11.0234 11.5C11.0234 11.3612 10.9683 11.228 10.8701 11.1299C10.772 11.0317 10.6388 10.9766 10.5 10.9766H5.5ZM5.5 8.47656C5.36118 8.47656 5.22805 8.53172 5.12988 8.62988C5.03172 8.72805 4.97656 8.86118 4.97656 9C4.97656 9.13882 5.03172 9.27195 5.12988 9.37012C5.22805 9.46828 5.36118 9.52344 5.5 9.52344H10.5C10.6388 9.52344 10.772 9.46828 10.8701 9.37012C10.9683 9.27195 11.0234 9.13882 11.0234 9C11.0234 8.86118 10.9683 8.72805 10.8701 8.62988C10.772 8.53172 10.6388 8.47656 10.5 8.47656H5.5Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.046875"
        />
        <path
          d="M8.57031 1.40564C8.57776 1.40717 8.58445 1.41102 8.58984 1.41638L13.084 5.90955C13.0894 5.91501 13.0932 5.9225 13.0947 5.93005C13.0962 5.93754 13.0957 5.94546 13.0928 5.95251C13.0898 5.95963 13.0845 5.9658 13.0781 5.97009C13.0718 5.97434 13.0643 5.97686 13.0566 5.97693H9C8.87369 5.97693 8.75244 5.92655 8.66309 5.83728C8.57379 5.74799 8.52353 5.62664 8.52344 5.50037V1.44373L8.53027 1.42224C8.53457 1.41585 8.54073 1.41054 8.54785 1.40759C8.5549 1.40473 8.56285 1.40416 8.57031 1.40564Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.046875"
        />
      </svg>
    ),
  },
];

const Sidebar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: "cat-1", name: "Electronics", count: 21 },
    { id: "cat-2", name: "Fashion", count: 32 },
    { id: "cat-3", name: "Home & Living", count: 13 },
  ];

  return (
    <aside className="w-[260px] min-h-screen bg-white border-r border-[#232321]/20 px-[24px]">
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-[32px] mt-[32px]">
        <h1 className="text-[30px] font-bold text-[#0D3F84]">Exclusive</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1">
        <ul className="space-y-[16px]">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/admin"}
                className={({ isActive }) =>
                  `flex items-center py-[14px] px-[16px] rounded-lg text-[14px] font-medium transition-colors uppercase ${
                    isActive
                      ? "bg-[#003F62] text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Categories Section */}
      <div className="mt-6">
        <Disclosure>
          {({ open }) => {
            return (
              <>
                <DisclosureButton className="flex items-center justify-between w-full py-[14px] text-[14px] font-medium cursor-pointer hover:bg-gray-50 rounded-lg transition-colors uppercase">
                  <span className="text-[20px] font-semibold">Categories</span>
                  <svg
                    className={`${
                      open ? "rotate-180" : ""
                    } size-7 transition-transform`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </DisclosureButton>

                <DisclosurePanel className="pb-2 pl-2">
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className="w-full flex items-center justify-between text-[16px] py-2 hover:bg-gray-50 rounded transition-colors"
                      >
                        <span className="text-gray-700">{category.name}</span>
                        <span
                          className={`px-[14px] py-[8px] rounded-[4px] text-[14px] font-medium ${
                            selectedCategory === category.id
                              ? "bg-[#003F62] text-white"
                              : "bg-[#E7E7E3]"
                          }`}
                        >
                          {String(category.count).padStart(2, "0")}
                        </span>
                      </button>
                    ))}
                  </div>
                </DisclosurePanel>
              </>
            );
          }}
        </Disclosure>
      </div>
    </aside>
  );
};

export default Sidebar;
