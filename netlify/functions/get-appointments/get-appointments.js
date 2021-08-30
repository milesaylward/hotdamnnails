const Acuity = require('acuityscheduling');

const acuity = Acuity.basic({
  userId: process.env.ACUITY_USER_ID,
  apiKey: process.env.ACCUITY_API_KEY,
});

const fetchTypes = () => new Promise((resolve, reject) => {
  acuity.request('/appointment-types', (err, res, types) => {
    if (err) reject(err);
    resolve(types)
  });
});

const fetchAddons = () => new Promise((resolve, reject) => {
  acuity.request('/appointment-addons', (err, res, types) => {
    if (err) reject(err);
    resolve(types)
  });
});

const fetchData = async () => {
  const types = await fetchTypes();
  const addons = await fetchAddons();
  types.forEach(type => {
    type.addons = [];
    type.price = parseFloat(type.price);
    type.addonIDs.forEach(id => {
      const addon = addons.find(addon => addon.id === id);
      type.addons.push(addon);
    });
    type.designs_opts = [];
    type.length_opts = [];
    type.pre_opts = [];
    type.shape_opts = [];
    type.fill_opts = [];
    type.fill_time_opts = [];
    type.addons.forEach(item => {
      item.price = parseFloat(item.price);
      if (item.name.includes('Design:')) {
        item.parsed_name = item.name.replace('Design:', '');
        type.designs_opts.push(item);
      }
      if (item.name.includes('Pre:')) {
        item.parsed_name = item.name.replace('Pre:', '');
        type.pre_opts.push(item);
      }
      if (item.name.includes('Length:')) {
        item.parsed_name = item.name.replace('Length:', '');
        type.length_opts.push(item);
      }
      if (item.name.includes('Shape:')) {
        item.parsed_name = item.name.replace('Shape:', '');
        type.shape_opts.push(item);
      }
      if (item.name.includes('FillTime:')) {
        item.parsed_name = item.name.replace('FillTime:', '');
        type.fill_time_opts.push(item);
      }
      if (item.name.includes('Fill:')) {
        item.parsed_name = item.name.replace('Fill:', '');
        type.fill_opts.push(item);
      }
    });
  });
  return [...types];
};


const handler = async () => {
  try {
    const data = await fetchData();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
}

module.exports = { handler }
