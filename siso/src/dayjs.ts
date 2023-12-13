import ko from "dayjs/esm/locale/ko";
import localizedFormat from "dayjs/esm/plugin/localizedFormat";
import dayjs from "dayjs/esm";
import weekday from "dayjs/esm/plugin/weekday";

dayjs.extend(localizedFormat);
dayjs.extend(weekday);
dayjs.locale(ko);

export default dayjs;
