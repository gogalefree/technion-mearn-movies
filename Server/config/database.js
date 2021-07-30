require('dotenv').config();
const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => {
  console.log(error);
  db.close();
});

db.once('open', () => console.log('Connected to Database'));

const dataLoader = require('./initialDataLoader')
dataLoader.fetchInitialData()