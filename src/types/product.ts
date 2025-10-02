export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryName: string;
  imageUrl: string;
}

export interface ProductsRequest {
  page: number;
  size: number;
  search?: string;
}

export interface ProductsResponse {
  data: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    size: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CreateProductRequest {
  name: string;
  description: string;
  categoryId: string;
  price: number;
  quantity: number;
  imageUrls: string[];
}

export interface CreateProductResponse {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  price: number;
  quantity: number;
  imageUrls: string[];
  createdAt: string;
}

export interface ProductHomeResponse {
  id: string;
  name: string;
  price: number;
  mainImage: string;
  new: boolean;
  wish: boolean;
}