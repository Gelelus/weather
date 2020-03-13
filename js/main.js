const regionDataUrl = 'https://raw.githubusercontent.com/Gelelus/internship/master/new.json';



const display = document.getElementById('display');
const regionTest = document.getElementById('regTest');
const cityTest = document.getElementById('cityTest');

//const btn = document.getElementById('showBtn');
const tempNow = document.getElementById('tempNow');
const tempMore = document.getElementById('tempMore');
const choosing = document.getElementById('choosing');
let dataCordinate = null;


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

async function getUsers() {

    let response1 = await fetch(regionDataUrl);
    let dataCordinates = await response1.json();
    console.log(dataCordinates[0]);

    let allRegions = '';
    let allCities = '';

    dataCordinates[0].regions.forEach(function (a) {
        allRegions += `<div class = 'region' data-name = '${a.name}' >${a.name}</div>`
        a.cities.forEach(function (an) {
            allCities += `<div class = 'city' data-name = '${an.name}' data-lat = ${an.lat} data-lon = ${an.lng}>${an.name}</div>`
        })
    })



    /*
        region.onchange = function () {
            let CitiseInRegion = '<option  selected="selected" disabled>Выберите город</option>';
            let reg;
            for (let a of dataCordinates[0].regions) {
                if (a.name === this.value) {
                    reg = a;
                    break;
                }
            }
            reg.cities.forEach(function (an) {
                inCity += `<option value = ${an.name} data-lat = ${an.lat} data-lon = ${an.lng}>${an.name}</option>`
            })
            city.innerHTML = inCity;
        }
        */
    regionTest.onclick = function () {
        choosing.innerHTML = allRegions;
        choosing.style.left = 0;

    }

    cityTest.onclick = function () {
        if (regionTest.textContent === 'Выберите регион') {
            choosing.innerHTML = allCities;
        } else {
            let CitiesInRegion = '';
            let reg;

            for (let a of dataCordinates[0].regions) {
                if (a.name === regionTest.textContent) {
                    reg = a;
                    break;
                }
            }

            console.log(reg);
            reg.cities.forEach(function (an) {
                CitiesInRegion += `<div class = 'city' data-name = '${an.name}' data-lat = ${an.lat} data-lon = ${an.lng}>${an.name}</div>`
            })


            choosing.innerHTML = CitiesInRegion;
        }

        choosing.style.left = 0;
    }

    dayTest.onclick = function (){
        
        let dates = new Date();
        let days = `<div data-number ='${formatDate(dates)}' class = 'date' >` + dates.toLocaleString('ru', { year: 'numeric', month: 'long', day: 'numeric' }) + "</div>";
        for(let i = 1;i<5;i++){
            dates.setDate(dates.getDate() + 1);
            days += `<div data-number ='${formatDate(dates)}' class = 'date' >` + dates.toLocaleString('ru', { year: 'numeric', month: 'long', day: 'numeric' }) + "</div>";
        }
        choosing.innerHTML = days;
        choosing.style.left = 0;
    }

    choosing.onclick = function (e) {

        if (e.target.className === 'region') {
            regionTest.textContent = e.target.dataset.name;
            cityTest.textContent = 'Выберите город';
        }
        else if (e.target.className === 'city') {
            let target = e.target;
            cityTest.textContent = target.dataset.name;
            cityTest.dataset.lat = target.dataset.lat;
            cityTest.dataset.lon = target.dataset.lon;
        }
        else if (e.target.className === 'date') {

            dayTest.textContent = e.target.textContent;
            dayTest.dataset.number = e.target.dataset.number;
        }
        this.style.left = '';
        this.innerHTML = '';
        go()
    }



    async function go () {
        if (cityTest.textContent === "Выберите город" || dayTest.textContent === 'Выберите день') { return }

        
        const lon = cityTest.dataset.lon;
        const lat = cityTest.dataset.lat;

        //for api.darksky
        //const URL = `https://api.darksky.net/forecast/a7a43ea3b9f462f090b35a65b9a5cda3/${lat},${lon}`
        //const PROXYURL = "https://cors-anywhere.herokuapp.com/";

        //for api.openweather
        const apiKey = 'aa27abf40894c61df831e8dde64c5503';
        const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        console.log(URL);

        let response2 = await fetch(URL);
        //let response2 = await fetch(URL+PROXYURL);
        //console.log(response2)

        let dataTemp = await response2.json();
        console.log(dataTemp)
        //for api.openweather
        const main = dataTemp.list;
        let dayWeather = '';
        
        main.forEach(function(a){
          if(a['dt_txt'].slice(0,10) === dayTest.dataset.number){
            
            dayWeather += '<div class ="weatherDay">' +

            a['dt_txt'].slice(-8,-3) +

            `<br/><img src = 'http://openweathermap.org/img/wn/${a.weather[0].icon}@2x.png'></img><br/>` +

            Math.floor(a.main.temp - 273.15) + 'C&deg'  +

            '</div>';
          
        }
        })
       
        display.innerHTML = dayWeather;
        
        /////for api.darksky
        /*tempNow.innerHTML = Math.floor((dataTemp.currently.temperature - 32)*5/9) + 'C&deg';
     
        str = '';
        for(let data of dataTemp.daily.data){
            str += Math.floor((((data.temperatureMax + data.temperatureMin)/2)-32)*5/9) + 'C&deg' + ' ';
       }
       tempMore.innerHTML = str;*/
        /////////
    }

}
getUsers();
