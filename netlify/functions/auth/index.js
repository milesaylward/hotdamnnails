const authUser = (data) => new Promise((resolve, reject) => {
  if (data.name === process.env.ADMIN_NAME && data.password && process.env.ADMIN_PASSWORD) {
    resolve({ authenticated: true }); 
  } else {
    reject({ authenticated: false }); 
  }
});

const handler = async (event) => {
  try {
    const data = await authUser(JSON.parse(event.body));
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) };
  }
}

module.exports = { handler }
