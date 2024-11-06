const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

if (!process.env.DATABASE) {
  throw new Error('DATABASE environment variable is not defined');
}

const DB = process.env.DATABASE.replace(
  '<DATABASE_PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, { useNewUrlParser: true }).then((con) => {
  console.log('DB connection successful!');
});

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
