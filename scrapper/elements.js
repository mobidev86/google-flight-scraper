module.exports = {
    popupOptions: {
        popupButton: '.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-INsAgc.VfPpkd-LgbsSe-OWXEXe-Bz112c-UbuQg.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.Rj2Mlf.OLiIxf.PDpWxe.BobFtf', //document.querySelectorAll()-> based on type select index (trip=0, pasenger=1, class=2)
        roundTripPopup: '.v0tSxb.SOcuWe.iWO5td .A8nfpe.yRXJAe.iWO5td',
        roundTripOptions: {
            roundTrip: "ul .uT1UOd:nth-of-type(1)", //first click popup button -> open perticluar popup -> document.querySelector(".A8nfpe.yRXJAe.iWO5td").querySelector('ul .uT1UOd:nth-of-type(2)')
            oneWay: "ul .uT1UOd:nth-of-type(2)",
            multiCity: "ul .uT1UOd:nth-of-type(3)",
        },
        classPopup: '.JQrP8b.PLrkBc .A8nfpe.yRXJAe.iWO5td',
        classOptions: {
            economy: "ul .uT1UOd:nth-of-type(1)",
            premiumEconomy: "ul .uT1UOd:nth-of-type(2)",
            business: "ul .uT1UOd:nth-of-type(3)",
            first: "ul .uT1UOd:nth-of-type(4)",
        }
    },
    searchOptions: {
        originAirport: '.e5F5td.BGeFcf .V00Bye.ESCxub.KckZb .II2One.j0Ppje.zmMKJ.LbIaRd', //document.querySelector
        originAirportList: '#h0T7hb-113 [role="listbox"]',
        originAirportListOptions: '[role="option"]',
        destinationAirport: '.e5F5td.vxNK6d .dvO2xc.k0gFV .II2One.j0Ppje.zmMKJ.LbIaRd',  //document.querySelector
        destinationAirportList: '#h0T7hb-114 [role="listbox"]',
        destinationAirportListOptions: '[role="option"]',
    },
    datePicker: {
        departureDatePicker: '.bgJkKe.K0Tsu .oSuIZ.YICvqf.kStSsc.ieVaIb .RKk3r.eoY5cb.j0Ppje', //document.querySelector
        departureDatePickerInput: '.X4feqd.wDt51d .oSuIZ.YICvqf.kStSsc.ieVaIb .RKk3r.eoY5cb.j0Ppje',
        returndateDatePicker: '.bgJkKe.K0Tsu .oSuIZ.YICvqf.lJODHb.qXDC9e .RKk3r.eoY5cb.j0Ppje', //document.querySelector
        returndateDatePickerInput: '.X4feqd.wDt51d .oSuIZ.YICvqf.lJODHb.qXDC9e .RKk3r.eoY5cb.j0Ppje', //document.querySelector
        datepickerDoneButton: '.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.z18xM' //document.querySelector
    },
    flightList: {
        results: ".PSZ8D.EA71Tc .hJYf4 .MvTd5e [role='list']",
        resultListItems: "[role='listitem']",
        findMoreItem: ".zISZ5c.QB2Jof",
        departTime: '.wtdjmc.YMlIz.ogfYpf.tPgKwe', // item index + this
        arrivalTime: '.XWcVob.YMlIz.ogfYpf.tPgKwe', // item index + this
        origin: '.G2WY5c.sSHqwe.ogfYpf.tPgKwe', // item index + this
        duration: '.hF6lYb.sSHqwe.ogfYpf.tPgKwe span:nth-child(4)', // item index + this
        destination: '.c8rWCd.sSHqwe.ogfYpf.tPgKwe', // item index + this
        stops: '.hF6lYb.sSHqwe.ogfYpf.tPgKwe .rGRiKd', // item index + this
        price: '.BVAVmf.tPgKwe .YMlIz.FpEdX span' // item index + this
    },
}