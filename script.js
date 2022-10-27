import playList from './playList.js';

const time = document.querySelector('.time')
const date = document.querySelector('.date')
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')
let body = document.querySelector('body')
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const nextSlideBtn = document.querySelector('.slide-next')
const prevSlideBtn = document.querySelector('.slide-prev')
const changeQuoteBtn = document.querySelector('.change-quote')
const quote = document.querySelector('.quote');
const author = document.querySelector('.author')
const changeLanguageBtn = document.querySelector('.language_btn')
let language = 'en';

function showTime() {
    const date = new Date;
    const currentTime = date.toLocaleTimeString('en-US', {hour12: false});
    time.textContent = currentTime;
    setTimeout(showTime, 1000)
    showDate()
    getTimeOfDay()
}

showTime();

function showDate() {
    const newDate = new Date;
    const options = {month: 'long', day: 'numeric', weekday: 'long', timeZone: 'Europe/Moscow'};
    let currentDate = '';
    language === 'en' ? 
      currentDate = newDate.toLocaleDateString('en-US', options) :
      currentDate = newDate.toLocaleDateString('ru', options) 
    date.textContent = currentDate;
}
showDate();
function getTimeOfDay() {
  let timeOfDay = '';
  let timeOfDayRu = '';
  const date = new Date;
  const hours = date.getHours()
  if(hours >=6 && hours <= 11) {
    timeOfDay = 'morning' 
    language === 'en' ? timeOfDayRu = '': timeOfDayRu = 'утро'
  }
  else if (hours >= 12 && hours <= 17) { 
    timeOfDay = 'afternoon'
    language === 'en' ? timeOfDayRu = '': timeOfDayRu = 'день'
  }
  else if (hours >= 18 && hours <= 23) { 
    timeOfDay = 'evening'
    language === 'en' ? timeOfDayRu = '': timeOfDayRu = 'вечер'
  }
  else if (hours >= 0 && hours <= 5) { 
    timeOfDay = 'night'
    language === 'en' ? timeOfDayRu = '': timeOfDayRu = 'ночи'
  }

  language === 'en' ? greeting.textContent = `Good ${timeOfDay}` : greeting.textContent = `Добрый ${timeOfDayRu}`
  language === 'en' ? name.placeholder = '[Enter your name]' : name.placeholder = '[Введите ваше имя]'

  return timeOfDay
}

window.addEventListener('onload', getTimeOfDay)

function setLocalStorage() {
    localStorage.setItem('name', name.value);
  }
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage)
function getRandomNum() {

  let num = Math.floor(Math.random() * (20-1) + 1)
  return num > 9 ? num : `0${num}`
}
let bgNum = getRandomNum();
function setBg() {

  let timeOfDay = getTimeOfDay();
  let url = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`
  let img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
  img.onload = () => {     
    body.style.backgroundImage = url;
  };
}
window.addEventListener('load', setBg)

function getSlideNext() {
  if(bgNum < 20) {
    bgNum = (+bgNum + 1) > 9 ? +bgNum + 1 : `0${+bgNum + 1}`
    setBg()  
  } else if(bgNum === 20) {
    bgNum = '01'
    setBg()
  }
}
function getSlidePrev() {
  if(bgNum > 1) {
    bgNum = (+bgNum - 1) > 9 ? +bgNum - 1 : `0${+bgNum - 1}`
    setBg()  
  } else if(bgNum === '01') {
    bgNum = 20
    setBg()
  }
}
nextSlideBtn.addEventListener('click', getSlideNext)
prevSlideBtn.addEventListener('click', getSlidePrev)

async function getWeather() {  
  const currentCity  = localStorage.getItem('city')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&lang=${language}&appid=b9089f3ea29f299a5caa5645f6fa7d7d&units=metric`;
  const res = await fetch(url);

  const data = await res.json(); 
  
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.floor(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  if(language === 'en') {
    wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`
  } else {
    wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `Влажность: ${data.main.humidity}%`
  }
}
getWeather()

function setLocalStorage1() {
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage1)
window.addEventListener('keypress', (event) => event.code === 'Enter' ? setLocalStorage1() : void(0))
city.addEventListener('focusout', setLocalStorage1)


function getLocalStorage1() {
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
  getWeather()
}
window.addEventListener('load', getLocalStorage1)
window.addEventListener('keypress', (event) => event.code === 'Enter' ? getLocalStorage1() : void(0))
city.addEventListener('focusout', getLocalStorage1)


changeLanguageBtn.addEventListener('click', () => {
  language === 'en' ? language = 'ru' : language = 'en';
  getQuotes()
  language === 'en' ? changeLanguageBtn.textContent = 'En' : changeLanguageBtn.textContent = 'Ru'
  getWeather()
  
  
})

async function getQuotes() {
  bgNum = getRandomNum()
  let quotes = '';
  language === 'en' ? quotes = "https://type.fit/api/quotes" : quotes = 'data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  if(data[+bgNum].author != null){
    quote.textContent = data[+bgNum].text
    author.textContent = data[+bgNum].author
  } else {
    quote.textContent = data[+bgNum].text
    author.textContent = "Author not found"
  }
}
window.addEventListener('load', getQuotes)
changeQuoteBtn.addEventListener('click', getQuotes)


const playBtn = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev')
const playNext = document.querySelector('.play-next')

let isPlay = false;

const audio = new Audio();
let playNum = 0;

function playAudio() {
  audio.src = playList[playNum].src;
  if(!isPlay) {
    audio.play();
    isPlay = true;
    playBtn.classList.add('pause')
    playBtn.classList.remove('play')
  } else if(isPlay) {
    audio.pause()
    isPlay = false;
    playBtn.classList.add('play')
    playBtn.classList.remove('pause')
  }
}
const playListContainer = document.querySelector('.play-list')


function createPlayList() {
  playList.forEach(element => {
    const li = document.createElement('li')
    li.classList.add('play-item')
    li.textContent = element.title
    playListContainer.append(li)
  });
}
createPlayList()

playBtn.addEventListener('click', playAudio)

function nextSong() {
  playNum += 1
  isPlay = false
  if(playNum  < playList.length){
    playAudio()
  } else if(playNum === playList.length) {
    playNum = 0;
    playAudio()
  }
}

playNext.addEventListener('click', nextSong)

function prevSong() {
  if(playNum < playList.length && playNum != 0){
    playNum -= 1
    isPlay = false
    playAudio()
  } else if(playNum === 0) {
    playNum = playList.length - 1;
    isPlay = false
    playAudio()

  }
}
playPrev.addEventListener('click', prevSong)
