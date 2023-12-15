"use client";
import { chatsAtom, selectChatName } from "@/app/Stores";
import { useSetAtom, useAtom } from "jotai";
import { useState, Fragment } from "react";
import {
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { Tab } from "@headlessui/react";

export function Chat() {
  const [selectUser, setSelectUser] = useAtom(selectChatName);
  const [chats, setChats] = useAtom(chatsAtom);
  const [newChat, setNewChat] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChat(e.target.value);
  };

  const findChat = () => {
    const index = chats.findIndex(
      ({ chatUser }) => chatUser?.name === selectUser,
    );
    if (index !== -1) {
      return chats[index];
    }
    return chats[0];
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="h-screen">
          <div className="flex border border-grey rounded shadow-lg h-full">
            <div className="w-2/5 border flex flex-col">
              <div className="flex h-16 flex-shrink-0 items-center px-6">
                <h3 className="text-lg font-semibold text-heading">Messages</h3>
              </div>
              <div className="pb-4 px-4">
                {" "}
                <div>
                  <label
                    htmlFor="Search"
                    className="sr-only block text-sm font-semibold text-heading"
                  >
                    Search
                  </label>
                  <div className="relative flex">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex flex-shrink-0 items-center pl-4 focus-within:z-20">
                      <MagnifyingGlassIcon className="h-5 w-5 text-text" />
                    </div>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      placeholder="Search"
                      className="block w-full rounded-xl border-2 border-layer-3 bg-muted-1 px-4 py-2.5 pl-11 pr-14 font-semibold text-heading placeholder:text-text/50 focus:border-primary focus:outline-none focus:ring-0 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <Tab.Group>
                <Tab.List className="flex px-6 pb-4">
                  {["Personal", "Group"].map((tab) => (
                    <Tab key={tab} as={Fragment}>
                      {({ selected }) => (
                        <button
                          className={`${
                            selected
                              ? "border-primary bg-blue-500 text-white shadow-sm hover:border-primary-accent hover:bg-primary-accent focus:ring-2 focus:ring-blue-400/80 focus:ring-offset-0 disabled:hover:border-primary disabled:hover:bg-primary disabled:hover:text-white dark:focus:ring-white/80"
                              : "border-transparent bg-transparent text-text hover:bg-heading/5 hover:text-heading focus:bg-heading/5 focus:ring-2 focus:ring-heading/80 focus:ring-offset-0 disabled:hover:bg-transparent disabled:hover:text-text"
                          } inline-flex basis-full cursor-pointer items-center justify-center rounded-full border-2 px-2 py-1 text-sm font-semibold capitalize focus:outline-none disabled:opacity-30`}
                        >
                          {tab}
                        </button>
                      )}
                    </Tab>
                  ))}
                </Tab.List>

                <hr className="border-hr dark:border-muted-1" />
                <Tab.Panels className="flex-1 overflow-y-auto scrollbar scrollbar-thin bg-white">
                  {["Personal", "Group"].map((tab) => {
                    return (
                      <Tab.Panel key={tab}>
                        <div className="p-0.5">
                          {chats.map((chat, index) => {
                            if (chat.name === tab) {
                              return (
                                <a
                                  onClick={() =>
                                    setSelectUser(chat.chatUser!.name)
                                  }
                                  key={index}
                                  href={chat.chatUser!.href}
                                  className={`relative flex items-center space-x-2.5 px-6 py-4 hover:bg-layer-3 focus:z-20 focus:outline-none focus:ring-2 focus:ring-heading/80`}
                                >
                                  <div className="flex-shrink-0">
                                    {chat.status === "active" ? (
                                      <div className="relative inline-block">
                                        <img
                                          src={chat.chatUser!.avatarImg}
                                          alt="avatar"
                                          className="inline-block h-10 w-10 rounded-full"
                                        />
                                        <svg
                                          fill="currentColor"
                                          viewBox="0 0 8 8"
                                          className="absolute -top-0.5 -right-0.5 block h-3.5 w-3.5 rounded-full text-blue-500"
                                        >
                                          <circle cx={4} cy={4} r={3} />
                                        </svg>
                                      </div>
                                    ) : (
                                      <img
                                        src={chat.chatUser!.avatarImg}
                                        alt="avatar"
                                        className="inline-block h-10 w-10 rounded-full"
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <div className="flex items-center justify-between">
                                      <h3 className="text-base font-semibold text-heading">
                                        {chat.chatUser!.name}
                                      </h3>
                                      <div className="flex items-center space-x-2">
                                        <div>
                                          <button
                                            type="button"
                                            className="inline-flex cursor-pointer items-center justify-center rounded-xl border-none border-transparent bg-transparent p-2 font-semibold text-text hover:bg-heading/5 hover:text-heading focus:bg-heading/5 focus:outline-none focus:ring-2 focus:ring-heading/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text"
                                          >
                                            <EllipsisHorizontalIcon className="h-4 w-4" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <p className="text-sm font-medium text-text line-clamp-1">
                                      {chat.latestMessage}
                                    </p>
                                  </div>
                                </a>
                              );
                            }
                          })}
                        </div>
                      </Tab.Panel>
                    );
                  })}
                </Tab.Panels>
              </Tab.Group>
            </div>

            <div className="w-3/5 border flex flex-col">
              <div className="py-2 px-3 bg-sky-50 flex flex-row justify-between items-center">
                <div className="flex items-center">
                  <div>
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-grey-darkest">Me</p>
                    <p className="text-grey-darker text-xs mt-1">
                      {/* Andrés, Tom, Harrison, Arnold, Sylvester */}
                      {"Me"}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="#263238"
                        fill-opacity=".5"
                        d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="#263238"
                        fill-opacity=".5"
                        d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="#263238"
                        fill-opacity=".6"
                        d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-auto bg-white">
                {/* Content */}
                <div className="mx-auto max-w-xl flex-1 space-y-6 py-4 sm:py-6">
                  {findChat().chatMessages!.map((message, index) => (
                    // Chat Bubble
                    <div
                      key={index}
                      className={`${
                        message.sentBy === "me"
                          ? "justify-end"
                          : "justify-start"
                      } flex`}
                    >
                      <div
                        className={`${
                          message.sentBy === "me" ? "flex-row-reverse" : ""
                        } flex w-11/12`}
                      >
                        {message.sentBy === "me" ? null : (
                          <>
                            <img
                              src={message.avatar}
                              alt="avatar"
                              className="inline-block h-10 w-10 rounded-full"
                            />
                            <div className="mr-4" />
                          </>
                        )}
                        <div
                          className={`${
                            message.sentBy === "me"
                              ? "rounded-tr-none bg-blue-600"
                              : "rounded-tl-none bg-sky-200"
                          } relative max-w-xl rounded-xl px-4 py-2`}
                        >
                          <span
                            className={`${
                              message.sentBy === "me"
                                ? "text-white"
                                : "text-heading"
                            } text-sm font-medium`}
                          >
                            {message.message}
                          </span>
                          {message.reaction ? (
                            <span
                              className={`${
                                message.sentBy === "me"
                                  ? "left-0 -translate-x-5 bg-sky-200"
                                  : "right-0 translate-x-5 bg-blue-600"
                              } absolute top-0 flex h-8 w-8 -translate-y-3 transform items-center justify-center rounded-full p-2 text-xs`}
                            >
                              {message.reaction}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-sky-50 px-4 py-4 flex items-center">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      opacity=".45"
                      fill="#263238"
                      d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
                    ></path>
                  </svg>
                </div>
                <div className="flex-1 mx-4">
                  <input
                    className="w-full border rounded px-2 py-2"
                    type="text"
                    onChange={handleChange}
                    value={newChat}
                  />
                </div>
                <div className="ml-2">
                  <button
                    onClick={() => {
                      findChat().chatMessages?.push({
                        sentBy: "me",
                        avatar: "",
                        message: newChat,
                      });
                      setSelectUser(selectUser);
                      setNewChat("");
                    }}
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const chatMessages = [
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
