import { apiClient } from './client';
import {
  Interaction,
  CreateInteractionRequest,
  VoteInteractionRequest,
} from '../types';

export const interactionApi = {
  getProductInteractions: (productId: string) =>
    apiClient.get<{ interactions: Interaction[] }>(`/interactions/product/${productId}`),

  create: (data: CreateInteractionRequest) =>
    apiClient.post<Interaction>('/interactions', data),

  vote: (interactionId: string, data: VoteInteractionRequest) =>
    apiClient.patch<Interaction>(`/interactions/${interactionId}/vote`, data),
};