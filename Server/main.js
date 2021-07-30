const express = require('express');
const usersRouter = require('./routers/usersRouter');
const moviesRouter = require('./routers/moviesRouter');
const subscriptionsRouter = require('./routers/sbscriptionsRouter');
const membersRouter = require('./routers/memberRouter');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

require('./config/database');
app.use('/', express.static(path.join(__dirname, './public')));
app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/subscriptions', subscriptionsRouter);
app.use('/api/members', membersRouter);
app.listen(port, () => console.log('Listening on port: ', port));
