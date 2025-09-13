import type { Product,ProductAdmin } from "../types/product";


export const mockProducts: Product[] = [
  {
    id: "1",
    name: "HAVIT HV-G92 Gamepad",
    image:
      "https://www.logitech.com/content/dam/logitech/en/products/combos/pop-icon-combo/gallery/pop-icon-combo-rose-off-white-gallery-1-us.png",
    price: 120,
    oldPrice: 160,
    discount: 25,
    rating: 4,
    reviewCount: 34,
  },
  {
    id: "2",
    name: "AK-900 Wired Keyboard",
    image:
      "https://www.logitech.com/content/dam/logitech/en/products/combos/pop-icon-combo/gallery/pop-icon-combo-rose-off-white-gallery-1-us.png",
    price: 200,
    rating: 5,
    isNew: true,
  },
  {
    id: "3",
    name: "AK-900 Wired Keyboard",
    image:
      "https://www.logitech.com/content/dam/logitech/en/products/combos/pop-icon-combo/gallery/pop-icon-combo-rose-off-white-gallery-1-us.png",
    price: 200,
    rating: 5,
  },
  {
    id: "4",
    name: "AK-900 Wired Keyboard",
    image:
      "https://www.logitech.com/content/dam/logitech/en/products/combos/pop-icon-combo/gallery/pop-icon-combo-rose-off-white-gallery-1-us.png",
    price: 200,
    rating: 5,
  },
  {
    id: "5",
    name: "AK-900 Wired Keyboard",
    image:
      "https://www.logitech.com/content/dam/logitech/en/products/combos/pop-icon-combo/gallery/pop-icon-combo-rose-off-white-gallery-1-us.png",
    price: 200,
    rating: 5,
  },
  {
    id: "6",
    name: "AK-900 Wired Keyboard",
    image:
      "https://www.logitech.com/content/dam/logitech/en/products/combos/pop-icon-combo/gallery/pop-icon-combo-rose-off-white-gallery-1-us.png",
    price: 200,
    rating: 5,
  },
  {
    id: "7",
    name: "AK-900 Wired Keyboard",
    image:
      "https://www.logitech.com/content/dam/logitech/en/products/combos/pop-icon-combo/gallery/pop-icon-combo-rose-off-white-gallery-1-us.png",
    price: 200,
    rating: 5,
  },
  {
    id: "8",
    name: "AK-900 Wired Keyboard",
    image:
      "https://www.logitech.com/content/dam/logitech/en/products/combos/pop-icon-combo/gallery/pop-icon-combo-rose-off-white-gallery-1-us.png",
    price: 200,
    rating: 5,
  },
  {
    id: "9",
    name: "AK-900 Wired Keyboard",
    image:
      "https://www.logitech.com/content/dam/logitech/en/products/combos/pop-icon-combo/gallery/pop-icon-combo-rose-off-white-gallery-1-us.png",
    price: 200,
    rating: 5,
  },
];

export const mockProductsAdmin: ProductAdmin[] = [
  {
    id: "p-1",
    nameProduct: "iPhone 15 Pro",
    nameCategory: "Phone",
    titleProduct: "Latest iPhone with Pro features",
    descriptionProduct:
      "The most advanced iPhone with titanium design and Action Button",
    price: 999,
    thumbnail:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "p-2",
    nameProduct: "MacBook Pro 16",
    nameCategory: "Laptop",
    titleProduct: "Professional laptop for creators",
    descriptionProduct:
      "Powerful M3 chip with stunning Liquid Retina XDR display",
    price: 2499,
    thumbnail:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "p-3",
    nameProduct: "AirPods Pro",
    nameCategory: "Audio",
    titleProduct: "Premium wireless earbuds",
    descriptionProduct:
      "Active Noise Cancellation and Spatial Audio experience",
    price: 249,
    thumbnail:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "p-4",
    nameProduct: "Canon EOS R5",
    nameCategory: "Camera",
    titleProduct: "Professional mirrorless camera",
    descriptionProduct: "45MP full-frame sensor with 8K video recording",
    price: 3899,
    thumbnail:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "p-5",
    nameProduct: "Samsung Galaxy S24",
    nameCategory: "Phone",
    titleProduct: "AI-powered Android flagship",
    descriptionProduct: "Galaxy AI features with stunning camera capabilities",
    price: 799,
    thumbnail:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "p-6",
    nameProduct: "Dell XPS 13",
    nameCategory: "Laptop",
    titleProduct: "Ultra-portable Windows laptop",
    descriptionProduct: "Intel Core i7 with InfinityEdge display technology",
    price: 1299,
    thumbnail:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "p-7",
    nameProduct: "Sony WH-1000XM5",
    nameCategory: "Audio",
    titleProduct: "Industry-leading noise canceling",
    descriptionProduct: "Premium wireless headphones with 30-hour battery life",
    price: 399,
    thumbnail:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "p-8",
    nameProduct: "Nikon Z9",
    nameCategory: "Camera",
    titleProduct: "Professional mirrorless flagship",
    descriptionProduct: "45.7MP sensor with 8K video and advanced autofocus",
    price: 5499,
    thumbnail:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "p-9",
    nameProduct: "Google Pixel 8 Pro",
    nameCategory: "Phone",
    titleProduct: "AI photography excellence",
    descriptionProduct:
      "Google Tensor G3 chip with advanced computational photography",
    price: 999,
    thumbnail:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "p-10",
    nameProduct: "ASUS ROG Strix",
    nameCategory: "Laptop",
    titleProduct: "Gaming laptop powerhouse",
    descriptionProduct:
      "RTX 4080 graphics with 240Hz display for ultimate gaming",
    price: 2299,
    thumbnail:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "p-11",
    nameProduct: "Bose QuietComfort",
    nameCategory: "Audio",
    titleProduct: "Comfort meets premium sound",
    descriptionProduct: "World-class noise cancellation with all-day comfort",
    price: 329,
    thumbnail:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "p-12",
    nameProduct: "Fujifilm X-T5",
    nameCategory: "Camera",
    titleProduct: "Retro-inspired mirrorless",
    descriptionProduct:
      "40.2MP X-Trans sensor with classic film simulation modes",
    price: 1699,
    thumbnail:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=400&auto=format&fit=crop",
  },
];
