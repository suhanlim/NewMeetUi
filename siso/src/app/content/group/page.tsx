import { Chat } from "@/components/Chat";
import { GroupCalendar } from "@/components/GroupCalendar";

export default function Page() {
  return (
    <div className="flex flex-row gap-2">
      <Chat />
      <GroupCalendar />
    </div>
  );
}
