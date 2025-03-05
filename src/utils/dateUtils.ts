import * as dayjs from 'dayjs';

export const getDayDiff = (date1: string | Date, date2: string | Date) => {
  const formattedDate1 = dayjs(
    date1 instanceof Date ? date1.toISOString() : date1,
  );
  const formattedDate2 = dayjs(
    date2 instanceof Date ? date2.toISOString() : date2,
  );
  return formattedDate2.diff(formattedDate1, 'day', true);
};
