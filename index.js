const rp       = require('request-promise');
const inquirer = require('inquirer');

const methods     = ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'];
const dataMethods = ['PUT', 'POST', 'PATCH'];

const questions = [
  { message: 'enter test uri: ',  name: 'uri',            type: 'input',   default: 'http://localhost:3000/v1/users' },
  { message: 'iterations? ',      name: 'iterations',     type: 'input',   default: 100 },
  { message: 'method? ',          name: 'method',         type: 'list',    default: 0, choices: methods },
  { message: 'enter data: ',      name: 'body',           type: 'input',   when: (answers) => dataMethods.includes(answers.method) },
  { message: 'include headers? ', name: 'includeHeaders', type: 'confirm', default: true },
  { message: 'enter headers: ',   name: 'headers',        type: 'input',   when: (answers) => answers.includeHeaders, default: {'Authorization': 'Token realm="weZgc42G2UNHqhzx29nQrAtt"'} },
  { message: 'json response? ',   name: 'json',           type: 'confirm', default: true },
];

function stressTest(options, promises = []) {
  console.time('elapsed-time');

  for (i = 0; i < options.iterations; i += 1) {
    promises.push(rp(options).then(console.log).catch(console.log));
  }

  Promise.all(promises).then((values) => console.timeEnd('elapsed-time'));
}

inquirer.prompt(questions).then(stressTest);