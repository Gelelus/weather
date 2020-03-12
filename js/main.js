const regionDataUrl = 'https://raw.githubusercontent.com/Gelelus/internship/master/new.json';

const region = document.getElementById('reg');
const city = document.getElementById('city');

const regionTest = document.getElementById('regTest');
const cityTest = document.getElementById('cityTest');

const btn = document.getElementById('showBtn');
const tempNow = document.getElementById('tempNow');
const tempMore = document.getElementById('tempMore');
const choosing = document.getElementById('choosing');
let dataCordinate = null;



async function getUsers() {

    let response1 = await fetch(regionDataUrl);
    let dataCordinates = await response1.json();
    console.log(dataCordinates[0]);

    let allRegions = '';
    let allCities = '';

    dataCordinates[0].regions.forEach(function (a) {
        allRegions += `<div style = 'width:49.999%'>${a.name}</div>`
        a.cities.forEach(function (an) {
            allCities += `<div name = ${an.name} data-lat = ${an.lat} data-lon = ${an.lng}>${an.name}</div>`
        })
    })

   


    region.onchange = function () {
        let inCity = '<option  selected="selected" disabled>Выберите город</option>';
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
    
    regionTest.onclick = function (){
        choosing.innerHTML = allRegions;
        choosing.style.left = 0;
    }
    choosing.onclick = function (e){
      
       this.style.left = '';

    }

    btn.onclick = async function (){
        if(city.value === "Выберите город"){return}
        const option = city.querySelector(`option[value="${city.value}"]`);
        const lon = option.dataset.lon;
        const lat = option.dataset.lat;
        
        //for api.darksky
        //const URL = `https://api.darksky.net/forecast/a7a43ea3b9f462f090b35a65b9a5cda3/${lat},${lon}`
        //const PROXYURL = "https://cors-anywhere.herokuapp.com/";
        
        //for api.openweather
        const apiKey = 'aa27abf40894c61df831e8dde64c5503';
        const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        console.log(URL);

        let response2 = await fetch(URL);
        //let response2 = await fetch(URL+PROXYURL);
        console.log(response2)

        let dataTemp = await response2.json();
        console.log(dataTemp)
        //for api.openweather
    

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
