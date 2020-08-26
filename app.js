require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);
const app = express();
const cors = require('cors')
require('./configs/database.config')

app.use(session({
  secret: 'plaundry-project',
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: 60*60*24*1000
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60,
    autoRemove: 'disabled',
  })
}));  

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

// Middleware Setup
app.use(logger('dev'));
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


const authRoutes = require('./routes/auth.routes')
app.use('/api', authRoutes);

const adminRoutes = require('./routes/admin.routes')
app.use('/api', adminRoutes);

const LaundryRoutes = require('./routes/laundry.routes')
app.use('/api', LaundryRoutes);

// const index = require('./routes/index');
// app.use('/', index);


module.exports = app;
