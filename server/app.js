const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');

const app = express();
app.use(express.static(path.resolve('../client/build')));

const authRout = require('./routes/authRout');
const wordsRouter = require('./routes/words');
const topicRout = require('./routes/topicRout')
const allWordRout = require('./routes/allWordRout')
const letterRout = require('./routes/letterRout')
const statisticRout = require('./routes/statisticRout')

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
  name: 'englishCookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 3 },
};

app.use(session(sessionConfig));

app.use((req, res, next) => {
  res.locals.username = req.session?.user?.name;
  next();
});

app.use('/auth', authRout);
app.use('/words', wordsRouter);
app.use('/topic', topicRout);
app.use('/word', allWordRout);
app.use('/letter', letterRout);
app.use('/statistic', statisticRout);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('../client/build/index.html'));
})

app.listen(process.env.PORT ?? 3001, () => {
  console.log('Server started at port', process.env.PORT);
});
