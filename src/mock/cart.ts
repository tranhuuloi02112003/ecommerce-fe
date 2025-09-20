export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export const mockCartItems: CartItem[] = [
  {
    id: "1",
    name: "LCD Monitor",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    price: 650,
    quantity: 1,
    subtotal: 650,
  },
  {
    id: "2",
    name: "H1 Gamepad",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
    price: 550,
    quantity: 2,
    subtotal: 1100,
  },
];
