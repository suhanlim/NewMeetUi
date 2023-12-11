import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import {
  CheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { daysAtom, modalOpenedAtom } from "@/app/Stores";
import { DateInput } from "./DateInput";
import { inputDateAtom, inputTextAtom } from "@/app/Stores";
import { Event, Day } from "..";

export function Modal() {
  const [open, setOpen] = useAtom(modalOpenedAtom);
  const [days, setDays] = useAtom(daysAtom);
  const [inputResult, setInputResult] = useState(true);
  const cancelButtonRef = useRef(null);
  const textValue = useAtomValue(inputTextAtom);
  const dateValue = useAtomValue(inputDateAtom);
  let idValue = 20;
  const inputDate = () => {
    const tIndex: number = dateValue.indexOf("T");
    const keyDate: string = dateValue.substring(0, tIndex);
    const event: Event = {
      id: idValue++,
      name: textValue,
      time: +dateValue.substring(tIndex + 1, tIndex + 3) + "PM",
      datetime: dateValue,
      href: "#",
    };
    const dayIndex = days.findIndex(({ date }) => date === keyDate);
    if (dayIndex !== -1) {
      days[dayIndex].events.push(event);
      setDays(days);
    } else {
      const newDay: Day = {
        date: keyDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        events: new Array(event),
      };
      days.push(newDay);
    }
  };
  const inputCheck = () => {
    if (textValue != "" && dateValue != "") {
      inputDate();
      setOpen(false);
      setInputResult(true);
    } else setInputResult(false);
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div
                    className={clsx(
                      "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100",
                      { "bg-red-100": !inputResult },
                    )}
                  >
                    {inputResult ? (
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Input schedule
                    </Dialog.Title>
                    <div className="mt-4">
                      <DateInput />
                    </div>
                  </div>
                </div>
                <div className="mt-5 justify-center grid grid-flow-row-dense  gap-3">
                  <button
                    type="button"
                    className="inline-flex w-24 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={inputCheck}
                  >
                    Input
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-24 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    ref={cancelButtonRef}
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
