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
  stockQuantity: number;
  colorIds: string[];
  sizeIds: string[];
  imageUrls: string[];
}

export interface CreateProductResponse {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  price: number;
  stockQuantity: number;
  colorIds: string[];
  sizeIds: string[];
  imageUrls: string[];
  createdAt: string;
}
