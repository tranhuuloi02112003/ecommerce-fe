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


// -------- Types --------
export type ProductAdmin = {
  id: string;
  nameProduct: string;
  nameCategory: string;
  titleProduct: string;
  descriptionProduct: string;
  price: number;
  thumbnail: string;
};