import axiosInstance from './axiosConfig';

export interface Product {
  id: string;
  name: string;
  description: string;
  quantity: number;
  originalPrice: number;
  salePrice: number;
  thumbnail: string;
  categoryName?: string;
  brandName?: string;
}

export interface ProductSearchResponse {
  products: Product[];
  totalCount: number;
  totalPages: number;
  pageIndex: number;
  pageSize: number;
}

export const productApi = {
  searchProducts: async (params: { pageIndex?: number; pageSize?: number; name?: string } = {}) => {
    const response = await axiosInstance.get<ProductSearchResponse>('/product/search', { params });
    return response.data;
  },
  getProductById: async (id: string) => {
    const response = await axiosInstance.get<Product>(`/product/${id}`);
    return response.data;
  },
};
