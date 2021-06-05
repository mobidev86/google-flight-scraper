require('dotenv').config();
require('events').EventEmitter.prototype.setMaxListeners(100);
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const config = require('./config');
const { sequelize: db } = require('./models');
const hourlyCronTask = require('./cron/hourly.cron');
app.locals.moment = require('moment');

//middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));


//Hanldebars Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//static file middleware
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(path.join(__dirname, 'node_modules')));

//serve routes
require('./routes')(app);

//database connection
db.authenticate().then(() => {
    console.log('DB Connection successful.');
}).catch((error) => {
    console.log("DB Connection Error:", error)
});

//cron job instance
hourlyCronTask.start();

//server listen
app.listen(config.port, async () => {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});