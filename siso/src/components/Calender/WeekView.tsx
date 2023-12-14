import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { chatsAtom, monthsAtom } from "@/app/Stores";
import clsx from "clsx";
import dayjs from "dayjs";

const ScheduleSegment = (
  column: number,
  name: string,
  startTime: dayjs.Dayjs,
  closeTime: dayjs.Dayjs,
  color: string,
) => {
  const anchor =
    2 + startTime.hour() * 12 + Math.round((startTime.minute() * 12) / 60);
  const span = Math.round(closeTime.diff(startTime) / (1000 * 60 * 5));
  return (
    <li
      className={clsx("relative mt-px flex", `sm:col-start-${column}`)}
      style={{ gridRow: `${anchor} / span ${span}` }}
    >
      <a
        href="#"
        className={`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-${color}-50 p-2 text-xs leading-5 hover:bg-${color}-100`}
      >
        <p className={`order-1 font-semibold text-${color}-700`}>{name}</p>
        <p className={`text-${color}-500 group-hover:text-${color}-700`}>
          <time dateTime="2022-01-12T07:30">
            {dayjs(startTime).format("HH:mm")}
          </time>
        </p>
      </a>
    </li>
  );
};

export function WeekView() {
  const container = useRef<HTMLDivElement>(null);
  const containerNav = useRef<HTMLDivElement>(null);
  const containerOffset = useRef<HTMLDivElement>(null);
  const months = useAtomValue(monthsAtom);

  const curMonth = dayjs().format("MMMM");
  const today = dayjs();
  // TODO: use selected chats indtead of hard-coded 'Me' object
  const chats = useAtomValue(chatsAtom).find((v) => v.name === "Personal");
  const currentDays = chats?.months.find((v) => v.name === curMonth)?.days;
  const startIdx = currentDays?.findIndex(
    (v) => dayjs(v.date).date() === today.day(0).date(),
  );
  const weeksEvents = currentDays
    ?.slice(startIdx, (startIdx ?? 0) + 7)
    .map((v) => v.events);

  console.log(weeksEvents, startIdx, currentDays);

  const month = months.find(({ name }) => name === curMonth);
  const days = month!.days;
  const dayShortString = dayjs().format("dddd").substring(0, 3);
  const dayShortArray: string[] = ["S", "M", "T", "W", "T", "F", "S"];
  const dayArray: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  useEffect(() => {
    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60;
    container.current!.scrollTop =
      ((container.current!.scrollHeight -
        containerNav.current!.offsetHeight -
        containerOffset.current!.offsetHeight) *
        currentMinute) /
      1440;
  }, []);

  return (
    <>
      <div
        ref={container}
        className="isolate flex flex-auto flex-col overflow-auto bg-white"
      >
        <div
          style={{ width: "165%" }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          <div
            ref={containerNav}
            className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
          >
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              {dayShortArray.map((v, vIndex) => {
                return (
                  <button
                    type="button"
                    className="flex flex-col items-center pb-3 pt-2"
                    key={vIndex}
                  >
                    {v}
                    <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                      {dayjs().day(vIndex).date()}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />
              {dayArray.map((v, vIndex) => {
                return (
                  <div
                    key={v}
                    className="flex items-center justify-center py-3"
                  >
                    <span
                      className={clsx({
                        "flex items-baseline": v === dayShortString,
                      })}
                    >
                      {v}
                      <span
                        className={clsx(
                          "items-center justify-center font-semibold text-gray-900",
                          {
                            "ml-1.5 flex h-8 w-8 rounded-full bg-indigo-600 text-white":
                              v === dayShortString,
                          },
                        )}
                      >
                        {" " + dayjs().day(vIndex).date()}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    12AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    1AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    2AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    3AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    4AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    5AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    6AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    7AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    8AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    9AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    12PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    1PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    2PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    3PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    4PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    5PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    6PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    7PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    8PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    9PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11PM
                  </div>
                </div>
                <div />
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                <div className="col-start-1 row-span-full" />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full" />
                <div className="col-start-8 row-span-full w-8" />
              </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                style={{
                  gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
                }}
              >
                {weeksEvents?.flatMap((v, i) =>
                  v.map((val) => {
                    console.log(val);
                    const hhmm = val.closeTime
                      .split(":")
                      .map((v) => parseInt(v));
                    const start = dayjs(val.startTime);
                    const end = start.hour(hhmm[0]).minute(hhmm[1]);
                    return ScheduleSegment(
                      i + 1,
                      val.name,
                      start,
                      end,
                      chats!.color,
                    );
                  }),
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
