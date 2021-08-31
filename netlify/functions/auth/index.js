const authUser = (data) => new Promise((resolve, reject) => {
  const isAdmin = data.name === process.env.ADMIN_NAME;
  const isUser = data.name === process.env.USER_NAME;
  let passwordMatch = false;
  if (isAdmin && data.password === process.env.ADMIN_PASSWORD) passwordMatch = true;
  if (isUser && data.password === process.env.USER_PASSWORD) passwordMatch = true;
  if ((isAdmin || isUser) && passwordMatch) {
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
