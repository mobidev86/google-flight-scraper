

module.exports = app => {
    app.use('/', require('./ui'));
    app.use('/api', require('./api'));
};