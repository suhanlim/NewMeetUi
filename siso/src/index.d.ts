export interface Event {
  id: number;
  name: string;
  time: string;
  startTime: string;
  href: string;
}

export interface UpdateEvent {
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

export interface Chat {
  color: string;
  name: string;
  months: Month[];
}
