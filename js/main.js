const regionDataUrl = 'https://raw.githubusercontent.com/Gelelus/internship/master/new.json';

const region = document.getElementById('reg');
const city = document.getElementById('city');
const btn = document.getElementById('showBtn');
const tempNow = document.getElementById('tempNow');
const tempMore = document.getElementById('tempMore');
let dataCordinate = null;



async function getUsers() {

    let response1 = await fetch(regionDataUrl);
    let dataCordinates = await response1.json();
    console.log(dataCordinates[0]);

    let string1 = '<option  selected="selected" disabled>Выберите регион</option>';
    let string2 = '<option  selected="selected" disabled>Выберите город</option>';

    dataCordinates[0].regions.forEach(function (a) {
        string1 += `<option>${a.name}</option>`
        a.cities.forEach(function (an) {
            string2 += `<option value = ${an.name} data-lat = ${an.lat} data-lon = ${an.lng}>${an.name}</option>`
        })
    })

    region.innerHTML = string1;
    city.innerHTML = string2;

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
    

    btn.onclick = async function (){
        if(city.value === "Выберите город"){return}
        const option = city.querySelector(`option[value="${city.value}"]`);
        const lon = option.dataset.lon;
        const lat = option.dataset.lat;
        
        const URL = `https://api.darksky.net/forecast/a7a43ea3b9f462f090b35a65b9a5cda3/${lat},${lon}`
        const PROXYURL = "https://cors-anywhere.herokuapp.com/";

        let response2 = await fetch(PROXYURL + URL);
        //console.log(response2)
        let dataTemp = await response2.json();
        console.log(dataTemp)
        tempNow.innerHTML = Math.floor((dataTemp.currently.temperature - 32)*5/9) + 'C&deg';
     
        str = '';
        for(let data of dataTemp.daily.data){
            str += Math.floor((((data.temperatureMax + data.temperatureMin)/2)-32)*5/9) + 'C&deg' + ' ';
       }
       tempMore.innerHTML = str;
    } 
    //let response2 = await fetch(PROXYURL + URL);
    //let dataTemp = await response2.json();
    //console.log(dataTemp)

}
getUsers();
