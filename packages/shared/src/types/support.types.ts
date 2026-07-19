export enum TicketCategory {
  ORDER_ISSUE = 'ORDER_ISSUE',
  PAYMENT_ISSUE = 'PAYMENT_ISSUE',
  RETURN_ISSUE = 'RETURN_ISSUE',
  PRODUCT_INQUIRY = 'PRODUCT_INQUIRY',
  TECHNICAL_ISSUE = 'TECHNICAL_ISSUE',
  GENERAL = 'GENERAL',
}

export enum TicketPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_ON_CUSTOMER = 'WAITING_ON_CUSTOMER',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export enum LinkedEntityType {
  ORDER = 'Order',
  PRODUCT = 'Product',
  RETURN = 'Return',
}

export enum MessageSenderRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface LinkedEntity {
  entityType: LinkedEntityType;
  entityId: string;
}

export interface TicketMessage {
  id?: string;
  senderRole: MessageSenderRole;
  senderId: string;
  message: string;
  attachments: string[];
  isRead: boolean;
  createdAt?: string;
}

export interface Ticket {
  id: string;
  ticketId: string;
  user: string | null;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  linkedEntity?: LinkedEntity;
  messages: TicketMessage[];
  assignedAdmin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketRequest {
  subject: string;
  category: TicketCategory;
  message: string;
  linkedEntity?: LinkedEntity;
}

export interface ReplyTicketRequest {
  message: string;
}

export interface UpdateTicketStateRequest {
  status?: TicketStatus;
  priority?: TicketPriority;
  assignedAdmin?: string;
}