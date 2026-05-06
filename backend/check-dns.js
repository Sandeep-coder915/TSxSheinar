const dns = require('dns');

dns.resolveSrv('_mongodb._tcp.cluster0.vejegeh.mongodb.net', (err, records) => {
  if (err) {
    console.error('SRV error', err);
    process.exit(1);
  }
  console.log('SRV records:', records);
});
