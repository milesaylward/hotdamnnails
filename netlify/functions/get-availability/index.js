import Acuity from 'acuityscheduling';
import { DateTime } from 'luxon';

const acuity = Acuity.basic({
  userId: process.env.ACUITY_USER_ID,
  apiKey: process.env.ACCUITY_API_KEY,
});

const fetchDates = (months, data) => {
  const promises = [];
  const out_dates = [];
  let url = `/availability/dates?appointmentTypeID=${data.appointment.id}`;
  data.addons.forEach(addon => { url += `&addonIDs[]=${addon}`; });
  months.filter(dt => dt).forEach(month => {
    promises.push(new Promise((resolve, reject) => {acuity.request(
      `${url}&month=${month}&timezone=America/New_York`,
      (err, res, dates) => {
        if (err) reject(err);
        out_dates.push(...dates);
        resolve();
      });
    }));
  });
  return Promise.all(promises).then(() => out_dates).catch(err => { throw new Error(err) });
};

const fetchTimes = (days, data) => {
  const promises = [];
  const out_times = {};
  let url = `/availability/times?appointmentTypeID=${data.appointment.id}`;
  data.addons.forEach(addon => { url += `&addonIDs[]=${addon}`; });
  days.filter(dt => dt).forEach(day => {
    promises.push(new Promise((resolve, reject) => {acuity.request(
      `${url}&date=${day.date}&timezone=America/New_York`,
      (err, res, times) => {
        if (err) reject(err);
        times.forEach(time => {
          time.time_parsed = DateTime.fromISO(time.time, { zone: 'America/New_York' }).toLocaleString(DateTime.TIME_SIMPLE, {
            timeZone: 'America/New_York',
          });
        });
        out_times[day.date] = times;
        resolve();
      });
    }));
  });
  return Promise.all(promises).then(() => out_times).catch(err => { throw new Error(err) });
};

const fetchData = async (data) => {
  try {
    const out = [];
    const date = DateTime.now().setZone('America/New_York');
    const currMonth = date.toISODate().substr(0, 7);
    const nextMonth = date.plus({ month: 1 }).toISODate().substr(0, 7);
    const followingMonth = date.plus({ month: 2 }).toISODate().substr(0, 7);
    const dates = await fetchDates([currMonth, currMonth !== nextMonth && nextMonth, followingMonth !== nextMonth && followingMonth], data);
    const times = await fetchTimes(dates, data);
    Object.keys(times)
      .sort((a, b) => DateTime.fromISO(a).toMillis() - DateTime.fromISO(b).toMillis())
      .forEach(time => {
        const d = DateTime.fromISO(time);
        const data = {};
        date.time = d;
        data.day_of_week = d.toFormat('ccc');
        data.date = d.toFormat('MMM dd');
        data.times = times[time];
        data.normal_hours = times[time].filter(time => {
          const hours = DateTime.fromISO(time.time, { zone: 'America/New_York' }).toLocaleString(DateTime.TIME_24_SIMPLE, { zone: 'America/New_York' }).replace(':', '');
          if (hours < 1700) return time;
        });
        data.after_hours = times[time].filter(time => {
          const hours = DateTime.fromISO(time.time, { zone: 'America/New_York' }).toLocaleString(DateTime.TIME_24_SIMPLE, { zone: 'America/New_York' }).replace(':', '');
          if (hours >= 1700) {
            time.after_hours = true;
            return time;
          }
        });
        out.push(data);
      });
    return out;
  } catch (error) {
    throw new Error(error);
  }
};

export const handler = async (event) => {
  try {
    const data = await fetchData(JSON.parse(event.body));
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
}