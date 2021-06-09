const Airtable = require('airtable');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base('appPnFPGlYYKyYTxf');

const fetchData = () => new Promise((resolve, reject) => {
  const response = {};
  base('Table 1').select({
      maxRecords: 1000,
      view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        const attachment = record.get('Attachments');
        let value = record.get('value');
        const small = record.get('small');
        let links = record.get('Links');
        if (links) links = links.split('\n').filter(link => !!link);
        if (attachment && !value) value = attachment[0].url;
        response[record.get('id')] = {
          value,
          smallCopy: small,
          links,
        };
      });
      fetchNextPage();
  }, function done(err) {
      if (err) { reject(err); return; }
      resolve(response);
  });
});

const handler = async () => {
  try {
    const data = await fetchData();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
}

module.exports = { handler }
