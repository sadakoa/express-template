/* eslint-disable no-console */

// express set
const app = express();

// --------------------------------------------------------------------

// module
// import favicon from 'serve-favicon';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import stylus from 'stylus';
import autoprefixer from 'autoprefixer-stylus';

// --------------------------------------------------------------------

// routeing variable
import routes from './routes/index';
import users from './routes/users';

// --------------------------------------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// stylesheet engine setup
app.use(stylus.middleware({
  src: path.join(__dirname, 'assets'),
  compile: (str, path) => {
    return stylus(str)
      .set('filename', path)
      .set('compress', true)
      .use(autoprefixer({ browser: ['last 2 versions'] }));
  },
}));

// --------------------------------------------------------------------

// use PATH
// app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));

// --------------------------------------------------------------------

// routes
app.use('/', routes);
app.use('/users', users);

// --------------------------------------------------------------------

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

// --------------------------------------------------------------------

// port setting
const port = process.env.PORT || 3000;
app.set('port', port);

app.listen(app.get('port'), (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('listen:', app.get('port'));
  }
});

// --------------------------------------------------------------------

module.exports = app;
