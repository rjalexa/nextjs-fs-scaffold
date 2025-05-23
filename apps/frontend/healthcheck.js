import http from 'http';

const options = {
  host: 'localhost',
  port: process.env.PORT || 3000,
  timeout: 2000,
  path: '/api/health'
};

const request = http.request(options, (res) => {
  console.info(`STATUS: ${res.statusCode}`);
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', function(err) {
  console.error('ERROR', err);
  process.exit(1);
});

request.end();
