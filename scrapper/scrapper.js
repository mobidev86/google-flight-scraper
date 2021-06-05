const selectors = require('./elements');

class ScrapperService {
    constructor() {
        this.config = {
            rootPage: 'https://www.google.co.in/travel/flights',
            selectors: selectors,
            enableScreenshot: true
        }
    }

    async attachBrowser(browser) {
        this.browserInstance = browser;
    }

    async init(options) {
        this.page = await this.browserInstance.initPage(this.config.rootPage, options);
    }

    async takeScreenshot(options) {
        if (this.config.enableScreenshot === true) {
            await this.page.screenshot(options);
        }
    }

    async setTripType(tripType) {
        return await this.page.evaluate(async (selectors, tType) => {
            return await new Promise(async (resolve, reject) => {
                try {
                    //open round trip popup and relative option selection
                    let [roundTripPopupButton, passengerPopupButton, flightClassPopupButton] = document.querySelectorAll(selectors.popupButton);
                    if (roundTripPopupButton) {
                        await roundTripPopupButton.click();

                        let currentPopupOptions = document.querySelector(selectors.roundTripPopup);
                        let tripOption = selectors.roundTripOptions[tType];
                        if (currentPopupOptions && tripOption) {
                            currentPopupOptions.querySelector(tripOption).click();
                        }
                        resolve()
                    } else {
                        resolve()
                    }
                } catch (error) {
                    reject(error)
                }
            })
        }, this.config.selectors.popupOptions, tripType);
    }

    async setFlightClass(flightClass) {
        return await this.page.evaluate(async (selectors, classType) => {
            return await new Promise(async (resolve, reject) => {
                try {
                    //open round trip popup and relative option selection
                    let [roundTripPopupButton, passengerPopupButton, flightClassPopupButton] = document.querySelectorAll(selectors.popupButton);
                    if (flightClassPopupButton) {
                        await flightClassPopupButton.click();

                        let currentPopupOptions = document.querySelector(selectors.classPopup);
                        let classOption = selectors.classOptions[classType];
                        if (currentPopupOptions && classOption) {
                            currentPopupOptions.querySelector(classOption).click();
                        }
                        resolve()
                    } else {
                        resolve()
                    }
                } catch (error) {
                    reject(error)
                }
            })
        }, this.config.selectors.popupOptions, flightClass);
    }

    async setOriginAirport(originAirport) {
        return await this.page.evaluate(async (selectors, origin) => {
            return await new Promise(async (resolve, reject) => {
                try {
                    let originInput = document.querySelector(selectors.originAirport);
                    if (originInput) {
                        originInput.value = origin;
                        originInput.click()
                        setTimeout(() => {
                            let [firstOption] = document.querySelector(selectors.originAirportList).querySelectorAll(selectors.originAirportListOptions);
                            if (firstOption) firstOption.click();
                            resolve()
                        }, 600)
                    } else {
                        resolve()
                    }
                } catch (error) {
                    reject(error)
                }
            })
        }, this.config.selectors.searchOptions, originAirport)
    }

    async setDestinationAirport(destinationAirport) {
        return await this.page.evaluate(async (selectors, destination) => {
            return await new Promise(async (resolve, reject) => {
                try {
                    let destinationInput = document.querySelector(selectors.destinationAirport);
                    if (destinationInput) {
                        destinationInput.value = destination;
                        destinationInput.click();
                        setTimeout(() => {
                            let [firstOption] = document.querySelector(selectors.destinationAirportList).querySelectorAll(selectors.destinationAirportListOptions);
                            if (firstOption) firstOption.click();
                            resolve()
                        }, 600)
                    } else {
                        resolve()
                    }
                } catch (error) {
                    reject(error)
                }
            })
        }, this.config.selectors.searchOptions, destinationAirport)
    }

    async setDepartureAndReturnDate(departureDate, returnDate) {
        return await this.page.evaluate(async (selectors, deptDate, retnDate) => {
            return await new Promise(async (resolve, reject) => {
                try {
                    let datePicker = document.querySelector(selectors.departureDatePicker);
                    if (datePicker) {
                        await datePicker.click();
                        setTimeout(() => {
                            let leftDatePicked = false, rightDatePicked = false;
                            let departureDate = document.querySelector("[data-iso='" + deptDate + "']");
                            if (departureDate) {
                                departureDate.click();
                                leftDatePicked = true;
                                if (rightDatePicked) resolve()
                            }

                            setTimeout(async () => {
                                let returnDate = document.querySelector("[data-iso='" + retnDate + "']");
                                if (returnDate) {
                                    returnDate.click();
                                    rightDatePicked = true;
                                    if (leftDatePicked) resolve()
                                }
                            }, 800)
                        }, 3000)
                    } else {
                        resolve()
                    }
                } catch (error) {
                    reject(error)
                }
            })
        }, this.config.selectors.datePicker, departureDate, returnDate)
    }

    async setOneWayDepartureDate(departureDate) {
        return await this.page.evaluate(async (selectors, deptDate) => {
            return await new Promise(async (resolve, reject) => {
                try {
                    let datePicker = document.querySelector(selectors.departureDatePicker);
                    if (datePicker) {
                        await datePicker.click();
                        setTimeout(() => {
                            let departureDate = document.querySelector("[data-iso='" + deptDate + "']")
                            if (departureDate) {
                                departureDate.click();
                            }
                            resolve()
                        }, 1000)
                    } else {
                        resolve()
                    }
                } catch (error) {
                    reject(error)
                }
            })
        }, this.config.selectors.datePicker, departureDate)
    }

    async loadResultPage() {
        return await new Promise(async (resolve, reject) => {
            try {
                return await this.page.waitForNavigation({ waitUntil: 'networkidle2' }).then(() => {
                    setTimeout(() => {
                        console.log('Searched succesfully')
                        resolve(true)
                    }, 7000)
                });
            } catch (error) {
                resolve(true)
            };
        })
    }

    async submitSearch() {
        console.log("Search submited..")
        await this.takeScreenshot({ path: 'screen/before-submit.png' });
        await this.page.click(this.config.selectors.datePicker.datepickerDoneButton);
        this.page.evaluate(() => document.location.reload())
    }

    async checkAndExpandMoreItems() {
        return await this.page.evaluate(async (selectors) => {
            return await new Promise(async (resolve, reject) => {
                try {
                    let results = document.querySelectorAll(selectors.results);
                    if (results.length > 0) {
                        let lastSection = results[results.length - 1];
                        let secItems = lastSection ? lastSection.querySelectorAll(selectors.resultListItems) : [];
                        if (secItems.length > 0) {
                            let lastItem = secItems[secItems.length - 1] || null;
                            if (lastItem) {
                                let findMore = lastItem.querySelector(selectors.findMoreItem);
                                if (findMore) findMore.click()
                                setTimeout(() => resolve(), 5000)
                            } else {
                                resolve()
                            }
                        } else {
                            resolve()
                        }
                    } else {
                        resolve()
                    }
                } catch (error) {
                    reject(error)
                }
            })
        }, this.config.selectors.flightList)
    }
}

module.exports = ScrapperService;