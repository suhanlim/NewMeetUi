import { Calendar } from "@/components/Calendar";
import { SchedulePanel } from "@/components/SchedulePanel";

export default function Page() {
  return (
    <div className=" flex h-screen flex-col md:flex-row md:overflow-hidden gap-2">
      <div className="w-full flex-none max-w-sm">
        <SchedulePanel />
      </div>
      <Calendar />
    </div>
  );
}
