export interface Event {
  id: number;
  name: string;
  time: string;
  datetime: string;
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
