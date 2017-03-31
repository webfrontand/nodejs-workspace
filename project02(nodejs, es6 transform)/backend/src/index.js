import express from 'express';
import api from './routes';

require('babel-polyfill');

const app = express();
const port = 3000;

app.use('/api', api);

app.listen(port, () => {
  console.log(`Expressjs is running on port ${port} !!!!!!!!!!`);
});
