import { atom } from "jotai";
import { Day, Month } from "..";

export const modalOpenedAtom = atom(false);
export const inputTextAtom = atom("");
export const inputDateAtom = atom("");
export const inputEndDateTimeAtom = atom("");
export const inputContent = atom("");

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

export const monthsAtom = atom<Month[]>(months);
