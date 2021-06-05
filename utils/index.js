const moment = require('moment');

module.exports = {
    getCitiesForStaticRoutes() {
        var places = ['Ahmedabad', 'San Francisco', 'New Delhi', 'Miami', 'Bengaluru', 'Dubai'];
        return places;
    },
    createUniqRoutesFromCities(cities) {
        let routes = [];
        for (let i = 0; i < cities.length - 1; i++) {
            for (let j = i + 1; j < cities.length; j++) {
                routes.push({
                    origin: cities[i],
                    destination: cities[j]
                });

                routes.push({
                    origin: cities[j],
                    destination: cities[i]
                });
            }
        }
        return routes;
    },
    getDepartureToReturnDate() {
        let departureDate = moment(new Date()).format("YYYY-MM-DD");
        let returnDate = moment(departureDate, "YYYY-MM-DD").add(325, 'days').format("YYYY-MM-DD");

        return {
            departureDate,
            returnDate
        }
    },
    getInputParameters: function () {
        let { departureDate, returnDate } = this.getDepartureToReturnDate();
        var places = this.getCitiesForStaticRoutes();

        function getRendomPlace() {
            let originItem = places[Math.floor(Math.random() * places.length)];
            let destinationItem = places[Math.floor(Math.random() * places.length)];

            if (originItem === destinationItem) {
                return getRendomPlace()
            } else {
                return {
                    originItem,
                    destinationItem
                }
            }
        }

        let { originItem, destinationItem } = getRendomPlace()

        const args = {
            ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
            debug: false,
            origin: originItem,
            destination: destinationItem,
            departureDate,
            returnDate,
            tripType: 'roundTrip', // enum(oneWay, roundTrip)
            flightClass: 'economy', // enum(economy, premiumEconomy, business, first)
        };

        return args;
    },
    fakingUserInteraction: async function (page) {
        await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                // Click random point
                document.elementFromPoint(10, 20).click();
                function getRandomNumber(min, max) {
                    return Math.floor(Math.random() * (max - min)) + min;
                }

                // Mouse move on random element in the page (maybe we can use await mouse.move())
                for (var i = 0; i < getRandomNumber(15, 40); i++) {
                    var mouseMoveEvent = document.createEvent("MouseEvents");
                    mouseMoveEvent.initMouseEvent(
                        "mousemove",
                        true, // canBubble
                        false, // cancelable
                        window, // event's AbstractView : should be window 
                        1, // detail : Event's mouse click count 
                        getRandomNumber(50, 600), // screenX
                        getRandomNumber(50, 600), // screenY
                        getRandomNumber(50, 600), // clientX
                        getRandomNumber(50, 600), // clientY
                        false, // ctrlKey
                        false, // altKey
                        false, // shiftKey
                        false, // metaKey 
                        0, // button : 0 = click, 1 = middle button, 2 = right button  
                        null // relatedTarget
                    );

                    document.dispatchEvent(mouseMoveEvent)
                };

                var counter = getRandomNumber(10, 30);
                var iterator = 0;

                //Scrolling down a little bit, smootly
                var timer = setInterval(() => {
                    window.scrollBy(0, getRandomNumber(40, 60));
                    iterator++;
                    if (iterator >= counter) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 300);
            });
        });
    },
}