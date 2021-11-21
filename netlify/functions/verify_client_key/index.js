const authUser = (data) => new Promise((resolve, reject) => {
  const isValid = data.key === process.env.RETURNING_CLIENT_KEY;
  if (isValid) {
    resolve({ authenticated: true }); 
  } else {
    reject({ message: 'Key provided is not valid.' }); 
  }
});

const handler = async (event) => {
  try {
    const data = await authUser(JSON.parse(event.body));
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 401, body: JSON.stringify(error) };
  }
}

module.exports = { handler }
