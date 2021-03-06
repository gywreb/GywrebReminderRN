import dayjs from "dayjs";

export const isScheduleBehind = (schedule, now) => {
  return schedule.isBefore(now);
};

export const addDate = (scheduleToAdd) => {
  return scheduleToAdd.add(1, "day");
};

export default function calcNext(date) {
  const now = dayjs();

  // 1) set nextNotifTime to today's date
  let nextNotificationTime = dayjs(date)
    .year(now.year())
    .month(now.month())
    .date(now.date());

  // 2) IF nextNotifTime date is < right now
  if (isScheduleBehind(nextNotificationTime, now)) {
    //  THEN add 1day to NotifTime
    nextNotificationTime = addDate(nextNotificationTime);
  }

  return nextNotificationTime.toDate();
}
