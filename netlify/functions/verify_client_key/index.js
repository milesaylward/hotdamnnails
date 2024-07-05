const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appPnFPGlYYKyYTxf');

const getKey = () => new Promise((resolve, reject) => {
  base('Table 1').find('recNVPs96mRyxusfb', (err, record) => {
    if (err) reject(err)
    else resolve(record.fields.value.trim());
  });
});

const authUser = async (data) => {
  const key = await getKey();
  return new Promise((resolve, reject) => {
    const isValid = data.key === key;
    if (isValid) {
      resolve({ authenticated: true }); 
    } else {
      reject({ message: 'Key provided is not valid.' }); 
    }
  });
};

export const handler = async (event) => {
  try {
    const data = await authUser(JSON.parse(event.body));
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 401, body: JSON.stringify(error) };
  }
}
