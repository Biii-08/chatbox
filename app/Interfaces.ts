export interface Message {
  content: string;
  isAdmin: boolean;
  isUser: boolean;
  createdAt: string;
}

export interface Member {
  id: number;
  username: string;
  isActive: boolean;
  avatar: string;
  messages: Message[];
  last_online: string;
  createdAt: string;
  new_messages: number;
}

export interface GroupContainerProps {
  team: Member[];
  personal: Member[];
}

export interface Group {
  type: string;
  members: Member[];
}
