export interface SearchQuery {
  q?: string;              // default '*'
  page?: number;
  limit?: number;
  itemType?: string;
  mainCategory?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'basePrice:asc' | 'basePrice:desc' | 'createdAt:desc';
}

export interface SearchResultItem {
  id: string;
  name: string;
  basePrice: number;
  images: string[];
  // other fields from Typesense
  [key: string]: any;
}

export interface SearchResponse {
  results: SearchResultItem[];
  total: number;
  page: number;
  limit: number;
}