const fetch = require('node-fetch')
const ACCOUNT_ID = 'a2301f28-e24d-4a86-9ea9-cba13b91948c'
const API_URL = `https://api.youcanbook.me/v1/${ACCOUNT_ID}`
const API_KEY = 'ak_QfbBNGmhQYcocpZSEWHoTzNiJrTfSntwE6n3QjJiuokF94SF89'
const USER_NAME = 'miles.aylward@gmail.com'
const AUTH = USER_NAME + ":" + API_KEY;

const handler = async function () {
  const headers = {
    'Authorization': `Basic ${Buffer.from(AUTH).toString('base64')}`
  };
  try {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'GET',
      headers: headers,
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()
    return {
      statusCode: 200,
      body: JSON.stringify({ ...data }),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
