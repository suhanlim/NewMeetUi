import { atom } from "jotai";
import { Day, Month } from "..";

export const modalOpenedAtom = atom(false);
export const inputTextAtom = atom("");
export const inputDateAtom = atom("");

function makeMonth(of: number) {
  const firstDate = new Date(2023, of - 1, 1);
  const lastDate = new Date(firstDate.getTime() - 60 * 60 * 1000);
  // Sunday - Saturday : 0 - 6
  const dayOfWeek = firstDate.getDay();
  const startOfTail = dayOfWeek + lastDate.getDate();
  const offsetBegin = new Date(
    firstDate.getTime() - dayOfWeek * 24 * 60 * 60 * 1000,
  );
  const days = Array<Day>();
  for (let index = 0; index < 42; index++) {
    const tmp = {
      date: new Date(
        offsetBegin.getTime() +
          index * 24 * 60 * 60 * 1000 +
          9 * 60 * 60 * 1000,
      )
        .toISOString()
        .split("T")[0],
      isCurrentMonth: true,
      events: [],
    };
    if (index < dayOfWeek) {
      tmp.isCurrentMonth = false;
    } else if (index < startOfTail) {
      tmp.isCurrentMonth = true;
    } else {
      tmp.isCurrentMonth = false;
    }
    days.push(tmp);
  }
  return days;
}
const days = [
  { date: "2023-11-26", events: [] },
  { date: "2023-11-27", events: [] },
  { date: "2023-11-28", events: [] },
  { date: "2023-11-29", events: [] },
  { date: "2023-11-30", events: [] },
  { date: "2023-12-01", isCurrentMonth: true, events: [] },
  { date: "2023-12-02", isCurrentMonth: true, events: [] },
  {
    date: "2023-12-03",
    isCurrentMonth: true,
    events: [
      {
        id: 1,
        name: "Design review",
        time: "10AM",
        datetime: "2023-12-03T10:00",
        href: "#",
      },
      {
        id: 2,
        name: "Sales meeting",
        time: "2PM",
        datetime: "2023-12-03T14:00",
        href: "#",
      },
    ],
  },
  { date: "2023-12-04", isCurrentMonth: true, events: [] },
  { date: "2023-12-05", isCurrentMonth: true, events: [] },
  { date: "2023-12-06", isCurrentMonth: true, events: [] },
  {
    date: "2023-12-07",
    isCurrentMonth: true,
    events: [
      {
        id: 3,
        name: "Date night",
        time: "6PM",
        datetime: "2023-12-08T18:00",
        href: "#",
      },
    ],
  },
  { date: "2023-12-08", isCurrentMonth: true, events: [] },
  { date: "2023-12-09", isCurrentMonth: true, events: [] },
  { date: "2023-12-10", isCurrentMonth: true, events: [] },
  { date: "2023-12-11", isCurrentMonth: true, events: [] },
  {
    date: "2023-12-12",
    isCurrentMonth: true,
    isToday: true,
    events: [
      {
        id: 6,
        name: "Sam's birthday party",
        time: "2PM",
        datetime: "2023-12-12T14:00",
        href: "#",
      },
    ],
  },
  { date: "2023-12-13", isCurrentMonth: true, events: [] },
  { date: "2023-12-14", isCurrentMonth: true, events: [] },
  { date: "2023-12-15", isCurrentMonth: true, events: [] },
  { date: "2023-12-16", isCurrentMonth: true, events: [] },
  { date: "2023-12-17", isCurrentMonth: true, events: [] },
  { date: "2023-12-18", isCurrentMonth: true, events: [] },
  { date: "2023-12-19", isCurrentMonth: true, events: [] },
  { date: "2023-12-20", isCurrentMonth: true, events: [] },
  { date: "2023-12-21", isCurrentMonth: true, events: [] },
  {
    date: "2023-12-22",
    isCurrentMonth: true,
    isSelected: true,
    events: [
      {
        id: 4,
        name: "Maple syrup museum",
        time: "3PM",
        datetime: "2023-12-22T15:00",
        href: "#",
      },
      {
        id: 5,
        name: "Hockey game",
        time: "7PM",
        datetime: "2023-12-22T19:00",
        href: "#",
      },
    ],
  },
  { date: "2023-12-23", isCurrentMonth: true, events: [] },
  { date: "2023-12-24", isCurrentMonth: true, events: [] },
  { date: "2023-12-25", isCurrentMonth: true, events: [] },
  { date: "2023-12-26", isCurrentMonth: true, events: [] },
  { date: "2023-12-27", isCurrentMonth: true, events: [] },
  { date: "2023-12-28", isCurrentMonth: true, events: [] },
  { date: "2023-12-29", isCurrentMonth: true, events: [] },
  { date: "2023-12-30", isCurrentMonth: true, events: [] },
  { date: "2023-12-31", isCurrentMonth: true, events: [] },
  { date: "2024-01-01", events: [] },
  { date: "2024-01-02", events: [] },
  { date: "2024-01-03", events: [] },
  {
    date: "2024-01-04",
    events: [
      {
        id: 7,
        name: "Cinema with friends",
        time: "9PM",
        datetime: "2024-01-04T21:00",
        href: "#",
      },
    ],
  },
  { date: "2024-01-05", events: [] },
  { date: "2024-01-06", events: [] },
];

const months = Object.entries({
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
}).map((v) => {
  const value = makeMonth(Number.parseInt(v[0]));
  // const monthName = new Date( value.find(v => v.isCurrentMonth === true)?.date ?? )
  const today = new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  console.log(today);
  const findValue = value.find(({ date }) => date === today);
  if (findValue) {
    findValue.isToday = true;
  }

  const ret = { name: v[1], days: value };
  return ret;
});

export const mouthsAtom = atom<Month[]>(months);
export const daysAtom = atom<Day[]>(days);
