import { Chat } from "@/components/Chat";
import { GroupCalendar } from "@/components/GroupCalendar";
import { Provider } from "jotai";

export default function Page() {
  return (
    <Provider>
      <div className="flex flex-row gap-2">
        <div className="flex-none">
          <Chat />
        </div>
        <div className="flex-auto">
          <GroupCalendar />
        </div>
      </div>
    </Provider>
  );
}
