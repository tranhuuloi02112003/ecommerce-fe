export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
}