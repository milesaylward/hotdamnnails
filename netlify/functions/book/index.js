const Acuity = require('acuityscheduling');
const { Duration } = require('luxon');

const acuity = Acuity.basic({
  userId: process.env.ACUITY_USER_ID,
  apiKey: process.env.ACCUITY_API_KEY,
});

const parseDuration = (app) => {
  let duration_parsed = '';
  let hoursDeposit = 0;
  let hoursCopy = 'hour';
  const duration = Duration.fromObject({ minutes: app.duration });
  const hours = parseFloat(duration.toFormat('h'));
  const minutes = parseFloat(duration.toFormat('mm')) - (hours * 60);
  if (hours > 0) {
    if (hours > 1) {
      hoursDeposit = ((hours - 1) * 5);
      hoursCopy = 'hours';
    }
    duration_parsed += `${hours} ${hoursCopy}`
  }
  if (minutes > 0) duration_parsed += `${hours > 0 ? ' & ' : ''}${minutes} minutes`;
  app.duration_parsed = duration_parsed;
  app.deposit = 10 + hoursDeposit;
}

const bookAppointment = (data) => new Promise((resolve, reject) => {
  var options = {
    method: 'POST',
    body: {
      appointmentTypeID: data.id,
      datetime: data.time.time,
      firstName: data.user.name.split(' ')[0],
      lastName: data.user.name.split(' ')[1] || '',
      email: data.user.email,
      phone: data.user.number,
      addonIDs: data.addons,
      timezone: 'America/New_York',
    }
  };
  acuity.request('/appointments', options, function (err, res, appointment) {
    if (res.statusCode !== 200) reject(appointment);
    parseDuration(appointment);
    resolve(appointment);
  });
});


const handler = async (event) => {
  try {
    const data = await bookAppointment(JSON.parse(event.body));
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) };
  }
}

module.exports = { handler }
