const categories = [
  "Women's Fashion",
  "Men's Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby's & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];

const SidebarMenu = () => {
  return (
    <nav className="border-t-[16px] border-transparent mr-[4px] w-[217px] border-r-[1px] border-r-gray-200">
      <ul className="space-y-4">
        {categories.map((cat, i) => (
          <li key={i}>
            <a
              href={""}
              className="block text-gray-700 hover:text-primary cursor-pointer"
            >
              {cat}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarMenu;
