import { atom } from "jotai";
import { Day, Month, Chat, ChatMessag, ChatUser, DataChunk } from "..";

export const modalOpenedAtom = atom(false);
export const inputTextAtom = atom("");
export const inputDateAtom = atom("");
export const inputEndDateTimeAtom = atom("");
export const inputContent = atom("");
export const selectChatName = atom("Me");

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

const latestMessage =
  "please call me we must have make new project as long as quicky";

const chatUser: ChatUser[] = [
  {
    name: "Me",
    href: "#",
    avatarImg:
      "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
  },
  {
    name: "Friend 1",
    href: "#",
    avatarImg: "https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg",
  },
  {
    name: "Friend 2",
    href: "#",
    avatarImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpYTzuO0zLW7yadaq4jpOz2SbsX90okb24Z9GtEvK6Z9x2zS5",
  },
  {
    name: "Group 1",
    href: "#",
    avatarImg: "https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg",
  },
  {
    name: "Group 2",
    href: "#",
    avatarImg: "https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg",
  },
];
const chatMessages0 = [
  {
    sentBy: "me",
    avatar: "/assets/avatars/matthew.png",
    message:
      "Perfect! Thank you, Nicholas! I will go ahead and approve your account for higher limits 🙌",
    reaction: "🎉",
  },
  {
    sentBy: "me",
    avatar: "/assets/avatars/matthew.png",
    message:
      "Your account has been approved for our highest limits tier! We also reduced the taker fee to 0.01%!",
  },
  {
    sentBy: "me",
    avatar: "/assets/avatars/matthew.png",
    message:
      "Sure thing! Let me know if there's anything else I can do for you.",
  },
];

const chatMessages1 = [
  {
    sentBy: "other",
    avatar: "https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg",
    message:
      "Hi Matthew, I've submitted my identification, just as you requested.",
  },
  {
    sentBy: "me",
    avatar: "/assets/avatars/matthew.png",
    message:
      "Perfect! Thank you, Nicholas! I will go ahead and approve your account for higher limits 🙌",
    reaction: "🎉",
  },
  {
    sentBy: "other",
    avatar: "https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg",
    message: "Great! Thanks so much! 🙂",
    reaction: "👍",
  },
  {
    sentBy: "me",
    avatar: "/assets/avatars/matthew.png",
    message:
      "Your account has been approved for our highest limits tier! We also reduced the taker fee to 0.01%!",
  },
  {
    sentBy: "other",
    avatar: "https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg",
    message: "That was fast! Thanks so much Matthew!",
  },
  {
    sentBy: "me",
    avatar: "/assets/avatars/matthew.png",
    message:
      "Sure thing! Let me know if there's anything else I can do for you.",
  },
  {
    sentBy: "other",
    avatar: "https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg",
    message: "Much appreciated.",
  },
];
const chatMessages2 = [
  {
    sentBy: "other",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpYTzuO0zLW7yadaq4jpOz2SbsX90okb24Z9GtEvK6Z9x2zS5",

    message:
      "Hi Matthew, I've submitted my identification, just as you requested.",
  },
  {
    sentBy: "me",
    avatar: "/assets/avatars/matthew.png",
    message:
      "Perfect! Thank you, Nicholas! I will go ahead and approve your account for higher limits 🙌",
    reaction: "🎉",
  },
  {
    sentBy: "other",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpYTzuO0zLW7yadaq4jpOz2SbsX90okb24Z9GtEvK6Z9x2zS5",
    message: "Great! Thanks so much! 🙂",
    reaction: "👍",
  },
  {
    sentBy: "me",
    avatar: "/assets/avatars/matthew.png",
    message:
      "Your account has been approved for our highest limits tier! We also reduced the taker fee to 0.01%!",
  },
  {
    sentBy: "other",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpYTzuO0zLW7yadaq4jpOz2SbsX90okb24Z9GtEvK6Z9x2zS5",
    message: "That was fast! Thanks so much Matthew!",
  },
  {
    sentBy: "me",
    avatar: "/assets/avatars/matthew.png",
    message:
      "Sure thing! Let me know if there's anything else I can do for you.",
  },
  {
    sentBy: "other",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpYTzuO0zLW7yadaq4jpOz2SbsX90okb24Z9GtEvK6Z9x2zS5",

    message: "Much appreciated.",
  },
];
const chatMessages3 = [
  {
    sentBy: "other",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpYTzuO0zLW7yadaq4jpOz2SbsX90okb24Z9GtEvK6Z9x2zS5",
    message:
      "Hi Matthew, I've submitted my identification, just as you requested.",
  },
  {
    sentBy: "me",
    avatar: "/assets/avatars/matthew.png",
    message:
      "Perfect! Thank you, Nicholas! I will go ahead and approve your account for higher limits 🙌",
    reaction: "🎉",
  },
  {
    sentBy: "other",
    avatar: "https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg",
    message: "Great! Thanks so much! 🙂",
    reaction: "👍",
  },
  {
    sentBy: "me",
    avatar: "/assets/avatars/matthew.png",
    message:
      "Your account has been approved for our highest limits tier! We also reduced the taker fee to 0.01%!",
  },
  {
    sentBy: "other",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpYTzuO0zLW7yadaq4jpOz2SbsX90okb24Z9GtEvK6Z9x2zS5",
    message: "That was fast! Thanks so much Matthew!",
  },
  {
    sentBy: "me",
    avatar: "/assets/avatars/matthew.png",
    message:
      "Sure thing! Let me know if there's anything else I can do for you.",
  },
  {
    sentBy: "other",
    avatar: "https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg",
    message: "Much appreciated.",
  },
];
const chatMessages4 = [
  {
    sentBy: "other",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpYTzuO0zLW7yadaq4jpOz2SbsX90okb24Z9GtEvK6Z9x2zS5",
    message:
      "Hi Matthew, I've submitted my identification, just as you requested.",
  },
  {
    sentBy: "me",
    avatar: "/assets/avatars/matthew.png",
    message:
      "Perfect! Thank you, Nicholas! I will go ahead and approve your account for higher limits 🙌",
    reaction: "🎉",
  },
  {
    sentBy: "other",
    avatar: "https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg",
    message: "Great! Thanks so much! 🙂",
    reaction: "👍",
  },
  {
    sentBy: "me",
    avatar: "/assets/avatars/matthew.png",
    message:
      "Your account has been approved for our highest limits tier! We also reduced the taker fee to 0.01%!",
  },
  {
    sentBy: "other",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpYTzuO0zLW7yadaq4jpOz2SbsX90okb24Z9GtEvK6Z9x2zS5",
    message: "That was fast! Thanks so much Matthew!",
  },
  {
    sentBy: "me",
    avatar: "/assets/avatars/matthew.png",
    message:
      "Sure thing! Let me know if there's anything else I can do for you.",
  },
  {
    sentBy: "other",
    avatar: "https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg",
    message: "Much appreciated.",
  },
];

const chats: Array<Chat> = [
  {
    name: "Personal",
    color: "blue",
    months: months,
    status: "active",
    latestMessage: latestMessage,
    chatMessages: chatMessages0,
    chatUser: chatUser[0],
  },
  {
    name: "Personal",
    color: "green",
    months: months,
    status: "none",
    latestMessage: latestMessage,
    chatMessages: chatMessages1,
    chatUser: chatUser[1],
  },
  {
    name: "Personal",
    color: "green",
    months: months,
    status: "none",
    latestMessage: latestMessage,
    chatMessages: chatMessages2,
    chatUser: chatUser[2],
  },
  {
    name: "Group",
    color: "indigo",
    months: months,
    status: "none",
    latestMessage: latestMessage,
    chatMessages: chatMessages3,
    chatUser: chatUser[3],
  },
  {
    name: "Group",
    color: "indigo",
    months: months,
    status: "none",
    latestMessage: latestMessage,
    chatMessages: chatMessages4,
    chatUser: chatUser[4],
  },
];

export const monthsAtom = atom<Month[]>(months);
export const chatsAtom = atom<Chat[]>(chats);
