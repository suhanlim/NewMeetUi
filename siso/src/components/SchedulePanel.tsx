export function SchedulePanel() {
  return (
    <div className="pt-5 h-full flex flex-col gap-2">
      <ul role="list" className="space-y-3">
        <li className="font-bold text-white text-center overflow-hidden bg-blue-500 px-4 py-4 shadow sm:rounded-md sm:px-6">
          나의 캘린더
        </li>
      </ul>
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-sky-50 px-3 text-base font-semibold leading-6 text-gray-900">
            친구 캘린더 목록
          </span>
        </div>
      </div>

      <ul role="list" className="space-y-3">
        <li className=" font-bold text-white text-center overflow-hidden bg-pink-400 px-4 py-4 shadow sm:rounded-md sm:px-6">
          친구 1 캘린더
        </li>
        <li className=" font-bold text-white text-center overflow-hidden bg-pink-400 px-4 py-4 shadow sm:rounded-md sm:px-6">
          친구 2 캘린더
        </li>
      </ul>
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-sky-50 px-3 text-base font-semibold leading-6 text-gray-900">
            그룹 캘린더 목록
          </span>
        </div>
      </div>
      <ul role="list" className="space-y-3">
        <li className=" font-bold text-white text-center overflow-hidden bg-indigo-400 px-4 py-4 shadow sm:rounded-md sm:px-6">
          그룹 1 캘린더
        </li>
        <li className=" font-bold text-white text-center overflow-hidden bg-indigo-400 px-4 py-4 shadow sm:rounded-md sm:px-6">
          그룹 2 캘린더
        </li>
      </ul>
    </div>
  );
}
