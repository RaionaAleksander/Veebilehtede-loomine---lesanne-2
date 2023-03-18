(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            // Lisaülesanne
            c.style.color = "red";
            s += 1;

            if (s > 59) {
                s = 0;
                m += 1;
                if (m > 59) {
                    m = 0;
                    h += 1;
                    if (h > 23) {
                        h = 0;
                    }
                }
            }
            //


            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            // Ülesanne 1
            if (h < 12) { 
                c.innerHTML = h + ":" + m + ":" + s + " EL";
            }
            else {
                c.innerHTML = (h - 12) + ":" + m + ":" + s + " PL";
            }

            //c.innerHTML = h + ":" + m + ":" + s;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");

        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else if (form.elements["payment-method"].value === ""){
            alert("Palun valige makse. Ärge jätke seda tühjaks");
            
            linn.focus();
            
            return;

        } else { 
            
            // Ülesanne 2
            let linnanimi = linn.value;
            let euro = 0;

            switch (linnanimi) {
                case "tln":
                    euro += 0;
                    //e.innerHTML = "0,00 &euro;";
                    break; 
                case "trt":
                    euro += 2.50;
                    //e.innerHTML = "2,50 &euro;";
                    break;
                case "nrv":
                    euro += 2.50;
                    //e.innerHTML = "2,50 &euro;";
                    break;
                case "prn":
                    euro += 3.00;
                    //e.innerHTML = "3,00 &euro;";
                    break;
                default:
                    e.innerHTML = "x,xx &euro;";
                    return;
            }

            let checkbox1 = document.getElementById("v1");
            let checkbox2 = document.getElementById("v2");

            if (checkbox1.checked) {
                euro += 5.00;
            } 
            if (checkbox2.checked) {
                euro += 1.00;
            }

            e.innerHTML = euro + " &euro;"
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AnU4Hcypl_aLtMdvcVDipFdl6gYXVItpeXh8Yq8CCENvR9v1aXjzzseM16acDV8E";

let map, infobox;

function GetMap() {
    
    "use strict";

    // Ülesanne 5, Ülesanne 6

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: new Microsoft.Maps.Location(58.20940962068769, 26.6670545285465), // Ma kasutan keskpunktina koordinaate umbes esimese ja teise märgi vahel.
        zoom: 8.5, // Kuna märkide vaheline kaugus on suur, vähendasin muutuja väärtust - zoom
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    infobox.setMap(map);

    let TartuLocation = new Microsoft.Maps.Location(
        58.38104, 
        26.71992
    ); // Ma olen muutuja nime ümber nimetanud, et oleks selge, millisele linnale see asukoht kuulub.

    // Otepää on vallasisene linn Põhja-Valgamaal Otepää kõrgustikul, Otepää valla keskus.
    // Huvitav fakt: Otepää on ka Eesti talvepealinn.
    let OtepaaLocation = new Microsoft.Maps.Location(
            58.04464303205059, 
            26.477206750627793
        ); // Märgistusena täpsustan Otepää linnas asuvat parki.

    
    let Tartupushpin = new Microsoft.Maps.Pushpin(TartuLocation, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });

    let Otepaapushpin = new Microsoft.Maps.Pushpin(OtepaaLocation, { // Loodud on teine märk, mis asub Otepää linnas.
            title: 'Otepää looduskeskus',
            //subTitle: 'Hea koht',
            //text: 'looduskeskus'
        });

    Tartupushpin.metadata = {
        title: 'Tartu Ülikool',
        description: 'Tartu Ülikool on Baltimaade juhtiv ülikool, kuuludes ainukesena regioonis maailma 1,2% parima sekka.'
    };

    Otepaapushpin.metadata = {
        title: 'Otepää looduskeskus',
        description: 'Otepää looduskeskus tegutseb endises Pühajärve metskonna majas Pühajärve lähistel.'
    };


    Microsoft.Maps.Events.addHandler(Tartupushpin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(Otepaapushpin, 'click', pushpinClicked);

    map.entities.push(Tartupushpin);
    map.entities.push(Otepaapushpin);
}

function pushpinClicked(e) {
    if (e.target.metadata) {
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}


// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

