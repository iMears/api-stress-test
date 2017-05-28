const rp = require('request-promise');

const options = {
  uri: 'http://localhost:3000/v1/users',
  json: true
};

const promises = [];
const attempts = 1000;
const callback = (users) => console.log(users);

for (i = 0; i < attempts; i++) {
  const promise = rp(options).then(callback);
  promises.push(promise);
}

Promise.all(promises).then((values) => console.log('done'));