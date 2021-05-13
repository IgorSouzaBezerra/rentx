import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayJsDateProvider implements IDateProvider {
  public compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utd = this.convertToUTC(start_date);

    return dayjs(end_date_utc).diff(start_date_utd, "hours");
  }

  public compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utd = this.convertToUTC(start_date);

    return dayjs(end_date_utc).diff(start_date_utd, "days");
  }

  public convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  public dateNow(): Date {
    return dayjs().toDate();
  }

  public addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }
}

export { DayJsDateProvider };
