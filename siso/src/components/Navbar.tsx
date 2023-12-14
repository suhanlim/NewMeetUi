"use client";
import { Fragment, useState } from "react";
import { Menu, Tab, Transition, Dialog, Disclosure } from "@headlessui/react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import {
  XMarkIcon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  BellIcon,
  UserIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const user = {
  avatarImg: "/assets/avatars/nicholas-turner.png",
  name: "Nicholas Turner",
  email: "nicholas.turner@gmail.com",
  location: "San Francisco, US",
  href: "#",
  isOnline: true,
  basicInformation: {
    bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus praesentium, ad quo quia consequuntur voluptatum, suscipit laboriosam qui fugit omnis et amet magni? Mollitia ducimus dolorum, asperiores perferendis quas facere!",
    phone: "(555) 123-4567",
    website: "nicholasturner.com",
  },
};

export function Navbar() {
  const pathname = usePathname();
  const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false);

  function closeUserDrawer() {
    setIsUserDrawerOpen(false);
  }

  function openUserDrawer() {
    setIsUserDrawerOpen(true);
  }
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <Link
                    href="/content/group"
                    className={clsx(
                      "inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700",
                      {
                        "border-indigo-500 border-b-2 text-gray-900":
                          pathname === "/content/group",
                      },
                    )}
                  >
                    Group
                  </Link>
                  <Link
                    href="/content/calendarlist"
                    className={clsx(
                      "inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700",
                      {
                        "border-indigo-500 border-b-2 text-gray-900":
                          pathname === "/content/calendarlist",
                      },
                    )}
                  >
                    Calendars
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={openUserDrawer}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700",
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700",
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700",
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* User Drawer */}
          <Transition appear show={isUserDrawerOpen} as={Fragment}>
            <Dialog as="div" onClose={closeUserDrawer}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-layer-1/60 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 flex justify-end">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative flex h-full w-screen max-w-sm flex-col bg-layer-2 shadow-2xl bg-white">
                    <div className="flex h-16 flex-shrink-0 items-center justify-between px-6">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold text-heading"
                      >
                        Visitor Information
                      </Dialog.Title>

                      <button
                        type="button"
                        onClick={closeUserDrawer}
                        className="inline-flex cursor-pointer items-center justify-center rounded-xl border-none border-transparent bg-transparent p-2 font-semibold text-text hover:bg-heading/5 hover:text-heading focus:bg-heading/5 focus:outline-none focus:ring-2 focus:ring-heading/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text"
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>

                    <hr className="border-hr" />

                    <div className="flex-1 px-6 py-5 sm:py-6">
                      <div className="flex space-x-4">
                        <img
                          src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
                          alt="avatar"
                          className="inline-block h-16 w-16 rounded-full"
                        />
                        <div>
                          <div className="flex">
                            <div className="relative">
                              <h3 className="font-semibold text-heading">
                                {"Me"}
                              </h3>
                              {true ? (
                                <svg
                                  fill="currentColor"
                                  viewBox="0 0 8 8"
                                  className="absolute -right-2.5 top-0 h-2 w-2 text-green-500"
                                >
                                  <circle cx={4} cy={4} r={3} />
                                </svg>
                              ) : null}
                            </div>
                          </div>
                          <div className="mt-0.5 text-sm font-semibold text-heading">
                            {"nicholas.turner@gmail.com"}
                          </div>
                          <div className="mt-1 text-xs font-semibold text-text">
                            {"San Francisco, US"}
                          </div>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="mt-8 inline-flex w-full cursor-pointer items-center justify-center rounded-xl border-2 border-primary bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:border-primary-accent hover:bg-primary-accent focus:outline-none focus:ring-2 focus:ring-blue-400/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:border-primary disabled:hover:bg-primary disabled:hover:text-white dark:focus:ring-white/80"
                      >
                        <UserIcon className="mr-2 h-5 w-5" />
                        Visitor Profile
                      </a>

                      <div className="mt-8 flex flex-col space-y-2">
                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="relative flex w-full items-center justify-between rounded-lg border border-muted-1 bg-layer-2 px-4 py-2 text-sm font-semibold text-heading hover:bg-muted-1 focus:z-10 focus:outline-none focus:ring-2 focus:ring-heading/80 dark:border-0 dark:bg-layer-3">
                                Basic Information
                                <ChevronUpIcon
                                  className={`${
                                    open
                                      ? "rotate-180 text-heading"
                                      : "text-text"
                                  } h-5 w-5`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 py-6 text-sm text-text">
                                <dl className="space-y-6">
                                  <div>
                                    <dt className="text-sm text-heading">
                                      Bio
                                    </dt>
                                    <dd className="mt-1 text-sm text-text">
                                      {user.basicInformation.bio}
                                    </dd>
                                  </div>
                                  <div>
                                    <dt className="text-sm text-heading">
                                      Phone
                                    </dt>
                                    <dd className="mt-1 text-sm text-text">
                                      {user.basicInformation.phone}
                                    </dd>
                                  </div>
                                  <div>
                                    <dt className="text-sm text-heading">
                                      Website
                                    </dt>
                                    <dd className="mt-1 text-sm text-text">
                                      {user.basicInformation.website}
                                    </dd>
                                  </div>
                                </dl>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>

                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="relative flex w-full items-center justify-between rounded-lg border border-muted-1 bg-layer-2 px-4 py-2 text-sm font-semibold text-heading hover:bg-muted-1 focus:z-10 focus:outline-none focus:ring-2 focus:ring-heading/80 dark:border-0 dark:bg-layer-3">
                                Assigned Operator
                                <ChevronUpIcon
                                  className={`${
                                    open
                                      ? "rotate-180 text-heading"
                                      : "text-text"
                                  } h-5 w-5`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 py-6 text-sm text-text">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Velit, facere nesciunt placeat
                                est tempore excepturi eum quasi quibusdam
                                voluptatibus qui!
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>

                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="relative flex w-full items-center justify-between rounded-lg border border-muted-1 bg-layer-2 px-4 py-2 text-sm font-semibold text-heading hover:bg-muted-1 focus:z-10 focus:outline-none focus:ring-2 focus:ring-heading/80 dark:border-0 dark:bg-layer-3">
                                Data
                                <ChevronUpIcon
                                  className={`${
                                    open
                                      ? "rotate-180 text-heading"
                                      : "text-text"
                                  } h-5 w-5`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 py-6 text-sm text-text">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Velit, facere nesciunt placeat
                                est tempore excepturi eum quasi quibusdam
                                voluptatibus qui!
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>

                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="relative flex w-full items-center justify-between rounded-lg border border-muted-1 bg-layer-2 px-4 py-2 text-sm font-semibold text-heading hover:bg-muted-1 focus:z-10 focus:outline-none focus:ring-2 focus:ring-heading/80 dark:border-0 dark:bg-layer-3">
                                Last Profile Events
                                <ChevronUpIcon
                                  className={`${
                                    open
                                      ? "rotate-180 text-heading"
                                      : "text-text"
                                  } h-5 w-5`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 py-6 text-sm text-text">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Velit, facere nesciunt placeat
                                est tempore excepturi eum quasi quibusdam
                                voluptatibus qui!
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      </div>
                    </div>

                    <div className="flex h-16 flex-shrink-0 items-center justify-center bg-layer-3 px-6 shadow-lg">
                      <button
                        type="button"
                        onClick={closeUserDrawer}
                        className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-critical bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:border-critical-accent hover:bg-critical-accent focus:outline-none focus:ring-2 focus:ring-orange-400/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:border-critical disabled:hover:bg-critical disabled:hover:text-white dark:focus:ring-white/80"
                      >
                        Block User
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-4 pt-2">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Team
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Projects
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Calendar
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
