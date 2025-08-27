export interface NewArrivalItem {
  id: string;
  title: string;
  desc: string;
  img: string;
  link: string;
}

export const newArrivals: NewArrivalItem[] = [
  {
    id: "playstation-5",
    title: "PlayStation 5",
    desc: "Black and White version of the PS5 coming out on sale.",
    img: "https://www.logitech.com/content/dam/logitech/en/products/combos/pop-icon-combo/gallery/pop-icon-combo-rose-off-white-gallery-1-us.png",
    link: "/products/playstation-5",
  },
  {
    id: "women-collections",
    title: "Women's Collections",
    desc: "Featured woman collections that give you another vibe.",
    img: "https://www.logitech.com/content/dam/logitech/en/products/combos/pop-icon-combo/gallery/pop-icon-combo-rose-off-white-gallery-1-us.png",
    link: "/collections/women",
  },
  {
    id: "speakers",
    title: "Speakers",
    desc: "Amazon wireless speakers",
    img: "https://www.logitech.com/content/dam/logitech/en/products/combos/pop-icon-combo/gallery/pop-icon-combo-rose-off-white-gallery-1-us.png",
    link: "/products/speakers",
  },
  {
    id: "perfume",
    title: "Perfume",
    desc: "GUCCI INTENSE OUD EDP",
    img: "https://www.logitech.com/content/dam/logitech/en/products/combos/pop-icon-combo/gallery/pop-icon-combo-rose-off-white-gallery-1-us.png",
    link: "/products/perfume",
  },
];
