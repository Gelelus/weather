const regionDataUrl = 'https://raw.githubusercontent.com/Gelelus/internship/master/new.json';
let lat = '53.9045398'
let lon = '25.5615244'

const URL = `https://api.darksky.net/forecast/d6ae9c88c11b19627f55899f38ecc6db/${lat},${lon}`
const region = document.getElementById('reg');
const city = document.getElementById('city');
let dataCordinate = null;
const PROXYURL = "https://cors-anywhere.herokuapp.com/";


async function getUsers() {

let response1 = await fetch(regionDataUrl);
let dataCordinates = await response1.json();
console.log(dataCordinates);

let response2 = await fetch(PROXYURL + URL);
let dataTemp = await response2.json();
console.log(dataTemp)

}
getUsers();
