import { apiClient } from './client';
import { SearchQuery, SearchResponse } from '../types';

export const searchApi = {
  search: (params: SearchQuery) =>
    apiClient.get<SearchResponse>('/search', { params }),
};