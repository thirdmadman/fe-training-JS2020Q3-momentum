class Momentum {

    constructor() {
        this.imagesUrl = 'https://rolling-scopes-school.github.io/thirdmadman-JS2020Q3/momentum/assets/images/';
        this.date = document.querySelector('.date');
        this.time = document.querySelector('.time');
        this.greeting = document.querySelector('.greeting__text');
        this.name = document.querySelector('.name');
        this.focus = document.querySelector('.focus');
        this.quote = document.querySelector('.quote');

        this.buttonChangeBacbround = document.querySelector('.btn-change-background');

        this.buttonChangeBacbround.addEventListener('click', () => this.changeBackground());
        this.name.addEventListener('keydown', (e) => this.setToLocalStorageByKeyPress(e, 'name'));
        this.name.addEventListener('blur', (e) => this.setToLocalStorageByKeyPress(e, 'name'));
        this.focus.addEventListener('keydown', (e) => this.setToLocalStorageByKeyPress(e, 'focus'));
        this.focus.addEventListener('blur', (e) => this.setToLocalStorageByKeyPress(e, 'focus'));
        this.quote.addEventListener('click', () => this.setQuote());

        this.timeZone = 'Europe/Moscow';
        console.log('init');
        this.updateGUI();
        this.updateText();
        this.setQuote();
        this.locales = 'en-US';
        this.is12hourTimeFormat = false;

        this.quoteOfTheDay = 'All is GG WP NAVI!';

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
        // console.log(date.toLocaleString('ru-RU', timeOptions));
        this.date.innerHTML = date.toLocaleString(this.locales, dateOptions);
        this.time.innerHTML = date.toLocaleString(this.locales, timeOptions);
    }

    setBackground() {
        let hour = new Date().getHours();
        let number = Math.floor(Math.random() * 20) + 1;
        number = number >= 10 ? number.toString(10) : "0" + number.toString(10);
        if (hour >= 6 && hour < 12) {
            document.body.style.backgroundImage = "url('" + this.imagesUrl + "morning/" + number + ".jpg')";
            this.greeting.textContent = 'Good morning, ';
        } else if (hour >= 12 && hour < 18) {
            document.body.style.backgroundImage = "url('" + this.imagesUrl + "day/" + number + ".jpg')";
            this.greeting.textContent = 'Good afternoon, ';
        } else if (hour >= 18 && hour < 24) {
            document.body.style.backgroundImage = "url('" + this.imagesUrl + "evening/" + number + ".jpg')";
            this.greeting.textContent = 'Good evening, ';
        } else if (hour >= 0 && hour < 6) {
            document.body.style.backgroundImage = "url('" + this.imagesUrl + "night/" + number + ".jpg')";
            this.greeting.textContent = 'Good night, ';
        }
    }

    updateBackground() {
        let hour = new Date().getHours();
        let minute = new Date().getMinutes();
        if (hour !== this.lastHourChangedBackground) {
            this.setBackground();
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
        this.focus.textContent = this.getFromLocalStorage('focus', '[What Is Your Focus For Today?]');
    }

    updateGUI() {
        this.showTime();
        this.updateBackground();
        //this.getLocation();
        setTimeout(() => this.updateGUI(), 1000);
    }


}


const momentum = new Momentum();


