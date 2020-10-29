class OpenWeather {
    constructor() {
        this.API_KEY = 'f7f47ae792c7c76739c1b32317c665be';

        this.weatherIcon = document.querySelector('.weather-icon');
        this.temperature = document.querySelector('.temperature');
        this.error = document.querySelector('.error');
        this.content = document.querySelector('.weather-content');
        this.city = document.querySelector('.city');
        this.weatherDescription = document.querySelector('.weather-description');

        this.city.addEventListener('keypress', (e) => this.setCity(e));
        this.city.addEventListener('blur', (e) => this.setCity(e));


        this.cityName = this.getFromLocalStorage('city','Moscow');
        this.city.textContent = this.cityName;
        this.getWeather();
    }

    setCity(event) {
        if (event.type === 'keypress') {
            if (event.code === 'Enter') {
                if (event.target.innerText.trim().length !== 0) {
                    localStorage.setItem('city', event.target.innerText);
                    this.city = event.target.innerText;
                    event.target.blur();
                    //this.city.textContent = this.cityName;
                    this.getWeather();
                }
            }
        }
        else if (event.type === 'blur') {
            if (event.target.innerText.trim().length !== 0) {
                localStorage.setItem('city', event.target.innerText);
                this.city = event.target.innerText;
                console.log(this.city);

                //this.city.textContent = this.cityName;
                this.getWeather();
            }
        }

    }


    async getWeather() {
        const res = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+this.getFromLocalStorage('city', 'Moscow')+'&lang=en&appid='+this.API_KEY+'&units=metric');
        if (!res.ok) {
            this.error.style.display = 'block';
            this.content.style.display = 'none';
        } else {
            const data = await res.json();
            this.error.style.display = 'none';
            this.content.style.display = 'block';
            this.weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            this.temperature.textContent = `${data.main.temp}°C`;
            this.weatherDescription.textContent = data.weather[0].description;
        }

    }

    getFromLocalStorage(key, defaultString) {
        if (localStorage.getItem(key) === null || localStorage.getItem(key) === '') {
            return defaultString;
        } else {
            return localStorage.getItem(key);
        }
    }



}


class Momentum {

    constructor() {
        this.imagesUrl = 'https://raw.githubusercontent.com/irinainina/ready-projects/momentum/momentum/assets/images//';
        this.date = document.querySelector('.date');
        this.time = document.querySelector('.time');
        this.greeting = document.querySelector('.greeting__text');
        this.name = document.querySelector('.greeting__name');
        this.focus = document.querySelector('.focus__input');
        this.quote = document.querySelector('.quote');

        this.buttonChangeBacbround = document.querySelector('.btn-change-background');

        this.buttonChangeBacbround.addEventListener('click', () => this.changeBackground());
        this.name.addEventListener('keydown', (e) => this.setToLocalStorageByKeyPress(e, 'name'));
        this.name.addEventListener('blur', (e) => this.setToLocalStorageByKeyPress(e, 'name'));
        this.focus.addEventListener('keydown', (e) => this.setToLocalStorageByKeyPress(e, 'focus'));
        this.focus.addEventListener('blur', (e) => this.setToLocalStorageByKeyPress(e, 'focus'));
        this.quote.addEventListener('click', () => this.setQuote());

        this.currentBackgroundNumber = 1;

        this.timeZone = 'Europe/Moscow';
        console.log('init');
        this.updateGUI();
        this.updateText();
        this.setQuote();
        this.locales = 'en-GB';
        this.is12hourTimeFormat = false;
        this.setBackground();
        this.lastHourChangedBackground = new Date().getHours();
    }

    showTime() {
        let date = new Date();
        let dateOptions = {weekday: 'long', month: 'long', day: 'numeric',};
        let timeOptions = {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: this.is12hourTimeFormat};
        //timeOptions.timeZone = 'Europe/Moscow';
        //dateOptions.timeZone = 'Europe/Moscow';
        //options.timeZoneName = 'short';

        // console.log(date.toLocaleString('ru-RU', dateOptions));
        this.date.innerHTML = date.toLocaleString(this.locales, dateOptions);
        this.time.innerHTML = date.toLocaleString(this.locales, timeOptions);
    }

    setBackgroundImg(url) {
        const img = document.createElement('img');
        img.src = url;
        img.onload = () => {
            document.body.style.backgroundImage = "url('" + url + "')";
        };
    }

    setBackground() {
        let hour = new Date().getHours();
        //let number = Math.floor(Math.random() * 20) + 1;
        //number = number >= 10 ? number.toString(10) : "0" + number.toString(10);
        let number = this.currentBackgroundNumber >= 10 ? this.currentBackgroundNumber.toString(10) : "0" + this.currentBackgroundNumber.toString(10);
        this.currentBackgroundNumber++;
        console.log(this.currentBackgroundNumber);
        this.currentBackgroundNumber = this.currentBackgroundNumber >= 20 ? 1 : this.currentBackgroundNumber;
        if (hour >= 6 && hour < 12) {
            this.setBackgroundImg(this.imagesUrl + "morning/" + number + ".jpg");
            this.greeting.textContent = 'Good morning, ';
        } else if (hour >= 12 && hour < 18) {
            this.setBackgroundImg(this.imagesUrl + "day/" + number + ".jpg");
            this.greeting.textContent = 'Good afternoon, ';
        } else if (hour >= 18 && hour < 24) {
            this.setBackgroundImg(this.imagesUrl + "evening/" + number + ".jpg");
            this.greeting.textContent = 'Good evening, ';
        } else if (hour >= 0 && hour < 6) {
            this.setBackgroundImg(this.imagesUrl + "night/" + number + ".jpg");
            this.greeting.textContent = 'Good night, ';
        }
    }

    updateBackground() {
        let hour = new Date().getHours();
        let minute = new Date().getMinutes();
        if (hour !== this.lastHourChangedBackground) {
            this.currentBackgroundNumber = 1;
            this.lastHourChangedBackground = hour;
        }
    }

    changeBackground() {
        this.setBackground();
        this.buttonChangeBacbround.disabled = true;
        setTimeout(() => this.buttonChangeBacbround.disabled = false, 1000);
    }

    getFromLocalStorage(key, defaultString) {
        if (localStorage.getItem(key) === null || localStorage.getItem(key) === '') {
            return defaultString;
        } else {
            return localStorage.getItem(key);
        }
    }

    setToLocalStorageByKeyPress(event, key) {
        if (event.type === 'keydown') {
            console.log(event.code);
            if (event.code === 'Enter') {
                localStorage.setItem(key, event.target.innerText);
                event.target.blur();
                this.updateText();
            }
        } else {
            localStorage.setItem(key, event.target.innerText);
            this.updateText();
        }

    }

    getLocation() {
        fetch('http://ip-api.com/json/').then(response => response.json()).then(ipInfo => this.timeZone = ipInfo.timezone);
        console.log(this.timeZone);
    }

    async setQuote() {
        let url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
        let res = await fetch(url);
        let data = await res.json();
        this.quote.textContent = data.quoteText;
    }

    updateText() {
        this.name.textContent = this.getFromLocalStorage('name', 'John Dove');
        this.focus.textContent = this.getFromLocalStorage('focus', 'What Is Your Focus For Today?');
    }

    updateGUI() {
        this.showTime();
        this.updateBackground();
        //this.getLocation();
        setTimeout(() => this.updateGUI(), 1000);
    }


}


const momentum = new Momentum();
const openWeather = new OpenWeather();


