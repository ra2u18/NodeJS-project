const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Tour = require('../../models/tourModel');
const { getConnectionString } = require('../../utilities/utils');

dotenv.config({ path: './config.env' });

mongoose
  .connect(getConnectionString(), {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((con) => console.log('DB Connection Successful!'));

// Read the JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import data into db
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded to the db!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete all data from db
const deleteData = async () => {
  try {
    await Tour.deleteMany({});
    console.log('Data deleted successfully!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
