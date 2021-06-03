const cron = require('cron');
const CronJob = cron.CronJob;
const { scrapeGoogleFlight } = require('./cron.handler');

//hourly => '0 * * * *'
const task = new CronJob(
    '0 * * * *',
    async () => {
        try {
            Promise.all([
                scrapeGoogleFlight()
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