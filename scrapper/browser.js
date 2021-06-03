const puppeteer = require('puppeteer-extra');
const pluginStealth = require("puppeteer-extra-plugin-stealth");
puppeteer.use(pluginStealth());
const chalk = require('chalk');


class Browser {
    constructor(args) {
        this.options = {
            headless: !args['debug']
        };
    }

    async init() {
        this.browserInstance = await puppeteer.launch({
            headless: this.options.headless,
            defaultViewport: {
                width: 1600,
                height: 900
            },
        }).catch((err) => {
            throw Error(err)
        });
    }

    async initPage(url, options) {
        try {
            const page = await this.browserInstance.newPage();
            await page.setUserAgent(options['ua']);

            if (options['intercept-request'] !== undefined) {
                await page.setRequestInterception(true);

                page.on('request', (req) => {
                    if (req.resourceType() == 'font' || req.resourceType() == 'image') {
                        req.abort();
                    } else {
                        req.continue();
                    }
                });
            }

            console.log(chalk.yellow('Loading: ' + url))
            await page.goto(url);

            return page;
        } catch (error) {
            console.log(chalk.red("Error:", error.message))
        }
    }
}


module.exports = Browser;