import { apiClient } from './client';
import { Ticket, CreateTicketRequest, ReplyTicketRequest, UpdateTicketStateRequest } from '../types';

export const supportApi = {
  // Customer
  createTicket: (data: CreateTicketRequest) =>
    apiClient.post<Ticket>('/support/tickets', data),

  replyToTicket: (ticketId: string, data: ReplyTicketRequest) =>
    apiClient.post<Ticket>(`/support/tickets/${ticketId}/reply`, data),

  getMyTickets: (params?: { page?: number; limit?: number }) =>
    apiClient.get<{ tickets: Ticket[]; meta: { total: number; page: number; limit: number } }>('/support/tickets/me', { params }),

  // Admin
  getAllTickets: (params?: { page?: number; limit?: number; status?: string; priority?: string; category?: string }) =>
    apiClient.get<{ tickets: Ticket[]; meta: { total: number; page: number; limit: number } }>('/support/admin/tickets', { params }),

  adminReply: (ticketId: string, data: ReplyTicketRequest) =>
    apiClient.post<Ticket>(`/support/admin/tickets/${ticketId}/reply`, data),

  updateTicketState: (ticketId: string, data: UpdateTicketStateRequest) =>
    apiClient.patch<Ticket>(`/support/admin/tickets/${ticketId}/state`, data),
};