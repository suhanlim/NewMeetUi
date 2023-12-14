export interface Event {
  id: number;
  name: string;
  content: string;
  closeTime: string;
  time: string;
  startTime: string;
  href: string;
}

export interface Day {
  date: string;
  isCurrentMonth?: boolean | null; // Allow null for isCurrentMonth
  isToday?: boolean; // Optional property isToday
  isSelected?: boolean; // Optional property isSelected
  events: Event[];
}
export interface Month {
  name: string;
  days: Day[];
}

export interface ChatUser {
  name: string;
  href: string;
  avatarImg: string;
}

export interface ChatMessag {
  sentBy: string;
  avatar: string;
  message: string;
  reaction?: string;
}

export interface Chat {
  color: string;
  name: string;
  months: Month[];
  status: string;
  chatUser: ChatUser;
  latestMessage: string;
  chatMessages?: ChatMessag[];
}

export interface DataChunk {
  chatDatas: Chat[];
  type: string;
}
