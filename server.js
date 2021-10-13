const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { getConnectionString } = require('./utilities/utils');

dotenv.config({ path: './config.env' });

const app = require('./app');

mongoose
  .connect(getConnectionString(), {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((con) => console.log('DB Connection Successful!'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}!`);
});
