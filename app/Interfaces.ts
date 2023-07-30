export interface Message {
  id: number;
  name: string;
  time: string;
  message: string;
  isActive: boolean;
  avatar: string;
}

export interface GroupContainerProps {
  groups: Group[];
}

export interface Member {
  id: number;
  name: string;
  time: string;
  messages: string[];
  isActive: boolean;
  avatar: string;
}

interface GroupMember {
  id: number;
  name: string;
  time: string;
  isActive: boolean;
  avatar: string;
  messages: string[];
}

interface Group {
  id: number;
  type: string;
  members: GroupMember[];
}
