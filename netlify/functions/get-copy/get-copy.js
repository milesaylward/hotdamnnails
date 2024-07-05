import Airtable from 'airtable';

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
        let active = record.get('active');
        const small = record.get('small');
        let links = record.get('Links');
        if (links) links = links.split('\n').filter(link => !!link);
        if (attachment && !value) {
          if (attachment.length === 1) value = attachment[0].url;
          else value = attachment.map(val => val.url);
        }
        if (!value && !attachment && active !== undefined) value = active;
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

export const handler = async () => {
  try {
    const data = await fetchData();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
}
