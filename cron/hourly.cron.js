const cron = require('cron');
const CronJob = cron.CronJob;
const { scrapeDailyFlightsForRoutes } = require('./cron.handler');

//hourly => '0 * * * *'
//day => '0 0 * * *'
//20 min => '*/20 * * * *'
const task = new CronJob(
    '0 0 * * *',
    async () => {
        try {
            Promise.all([
                scrapeDailyFlightsForRoutes()
            ])
        } catch (error) {
            console.log('Error hourly cron job:', error)
        }
    },
    null,
    false,
    'Asia/Kolkata'
);

module.exports = task;