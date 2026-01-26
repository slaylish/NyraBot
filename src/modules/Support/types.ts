export interface TicketPanel {
  id: string;
  name: string;
  channelId: string; // The channel where the panel lives
  messageId?: string; // The specific message ID of the panel
  embed: any; // Using the EmbedData type from Messages
  components: any[];
  startMessage: string; // "Welcome! Please describe your issue."
   namingScheme: string; // "ticket-{username}"
  tags: string[]; // "Billing", "Urgent"
  formFields: {
      id: string;
      label: string;
      type: 'text' | 'number' | 'select';
      required: boolean;
      options?: string[]; // If select
      condition?: { fieldId: string, value: string }; // "If 'Department' == 'Billing'"
  }[];
}

export interface WebTicket {
  ticketId: string;
  subject: string;
  user: {
      id: string;
      username: string;
      avatar: string;
  };
  status: 'Open' | 'InProgress' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  messages: {
      id: string;
      content: string;
      author: {
          username: string;
          avatar?: string;
          isStaff: boolean;
      };
      timestamp: Date;
  }[];
}
