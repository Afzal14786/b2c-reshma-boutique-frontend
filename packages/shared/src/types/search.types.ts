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
  sku: string;
  description: string;
  basePrice: number;
  itemType: string;
  mainCategory: string;
  images: string[];
  tags: string[];
  [key: string]: any; // keep as an escape hatch for any future indexed fields
}

export interface SearchFacetCount {
  value: string;
  count: number;
}

export interface SearchResponse {
  hits: SearchResultItem[];
  facet_counts: {
    itemType?: SearchFacetCount[];
    mainCategory?: SearchFacetCount[];
    [key: string]: SearchFacetCount[] | undefined;
  };
  meta: {
    found: number;
    page: number;
    limit: number;
    search_time_ms: number;
  };
}