const elements = require('../elements')['flightList'];

module.exports = class FlightList {
    constructor(scraperInstance) {
        this.config = {};
        this.scraperInstance = scraperInstance;
    }

    async getData() {
        let result = await this.scraperInstance.page.evaluate(async (selectors) => {
            var ulLists = document.querySelectorAll(selectors.results)

            let data = [];
            for (var i = 0; i < ulLists.length; i++) {
                let ulItem = ulLists[i];
                let listItems = ulItem.querySelectorAll(selectors.resultListItems)

                for (var j = 0; j < listItems.length - 1; j++) {
                    let departTime = listItems[j].querySelector(selectors.departTime);
                    let arrivalTime = listItems[j].querySelector(selectors.arrivalTime);
                    let origin = listItems[j].querySelector(selectors.origin);
                    let duration = listItems[j].querySelector(selectors.duration);
                    let destination = listItems[j].querySelector(selectors.destination);
                    let stops = listItems[j].querySelector(selectors.stops);
                    let price = listItems[j].querySelector(selectors.price);

                    data.push({
                        origin: origin && origin.innerText ? origin.innerText : '',
                        destination: destination && destination.innerText ? destination.innerText : '',
                        departTime: departTime && departTime.innerText ? departTime.innerText : '',
                        arrivalTime: arrivalTime && arrivalTime.innerText ? arrivalTime.innerText : '',
                        duration: duration && duration.innerText ? duration.innerText : '',
                        stops: stops && stops.innerText ? stops.innerText : '',
                        price: price && price.innerText ? price.innerText : '',
                    })
                }
            }
            return data;
        }, elements);

        return result;
    }

}