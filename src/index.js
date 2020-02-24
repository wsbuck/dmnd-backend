const express = require('express');
const createError = require('http-errors');
// const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');

const app = express();

const ads = [
  { title: 'Hello World' },
];
// Set up default mongoose connection.
const mongoDB = 'mongodb://127.0.0.1/dmnd';
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(logger('dev'));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ error: 'error' });
});

app.listen(9000, () => {
  console.log('listening on port 9000');
});
