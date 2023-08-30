import moment from "moment-timezone";

export const utcToLocal = (date: string, format:string = "YYYY-MM-D H:mm A z") => {
  const timezone = moment.tz.guess();
  const localDate = moment.utc(date).tz(timezone).format(format);
  return localDate;
};
