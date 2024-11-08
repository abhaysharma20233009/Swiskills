const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

const Skill = require('../../models/skillsModel');
const User = require('../../models/userModel');

if (!process.env.DATABASE) {
  throw new Error('DATABASE environment variable is not defined');
}

const DB = process.env.DATABASE.replace(
  '<DATABASE_PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// if you want to use localdata base then replace db with process.env.LOCAL_DATABASE and declare this config file
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connection successful!');
  })
  .catch((err) => {
    console.error('DB connection error:', err.message);
  });

//READ JSON FILE
const skills = JSON.parse(fs.readFileSync(`${__dirname}/skills.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

//Import Data INTO DB
const importData = async () => {
  try {
    await Skill.create(skills);
    // await User.create(users);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//Delete All Data from DB
const deleteData = async () => {
  try {
    await Skill.deleteMany();
    // await User.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
