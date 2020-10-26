class Momentum {

    constructor() {
        this.time = document.querySelector('.time');
        this.greeting = document.querySelector('.greeting');
        this.name = document.querySelector('.name');
        this.focus = document.querySelector('.focus');

        this.name.addEventListener('keypress', (e) => this.setToLocalStorageByKeyPress(e,'name'));
        this.name.addEventListener('blur', (e) =>  this.setToLocalStorageByKeyPress(e,'name'));
        this.focus.addEventListener('keypress', (e) =>  this.setToLocalStorageByKeyPress(e,'focus'));
        this.focus.addEventListener('blur', (e) =>  this.setToLocalStorageByKeyPress(e,'focus'));
        this.timeZone = 'Europe/Moscow';
        console.log('init');
        this.updateGUI();
        this.updateText();
    }

    showTime() {
        let date = new Date();
        let dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',};
        let timeOptions = {hour: '2-digit', hour12: true, minute: '2-digit', second: '2-digit'};
        //timeOptions.timeZone = 'Europe/Moscow';
        //dateOptions.timeZone = 'Europe/Moscow';
        //options.timeZoneName = 'short';

        // console.log(date.toLocaleString('ru-RU', dateOptions));
        // console.log(date.toLocaleString('ru-RU', timeOptions));

        this.time.innerHTML = date.toLocaleString('ru-RU', timeOptions);
    }

    setBgGreet() {
        let hour = new Date().getHours();
        if (hour > 12) {
            document.body.style.backgroundImage =
                "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
          this.greeting.textContent = 'Good Morning, ';
        }
        else if (hour < 18) {
            document.body.style.backgroundImage =
                "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
          this.greeting.textContent = 'Good Afternoon, ';
        }
        else {
            document.body.style.backgroundImage =
                "url('https://i.ibb.co/924T2Wv/night.jpg')";
          this.greeting.textContent = 'Good Evening, ';
        }
    }

    getFromLocalStorage(key, defaultString) {
        if (localStorage.getItem(key) === null || localStorage.getItem(key) === '') {
            return  defaultString;
        }
        else {
            return  localStorage.getItem(key);
        }
    }

    setToLocalStorageByKeyPress(event, key) {
        if (event.type === 'keypress') {
            if (event.which === 13 || event.keyCode === 13) {
                localStorage.setItem(key, event.target.innerText);
                event.target.blur();
                this.updateText();
            }
        }
        else {
            localStorage.setItem(key, event.target.innerText);
            this.updateText();
        }

    }

    getLocation() {
        fetch('http://ip-api.com/json/').then(response => response.json()).then(ipInfo => this.timeZone = ipInfo.timezone);
        console.log(this.timeZone);
    }

    updateText() {
        this.name.textContent = this.getFromLocalStorage('name', 'John Dove');
        this.focus.textContent = this.getFromLocalStorage('focus', '[What Is Your Focus For Today?]');
    }

    updateGUI() {
        this.showTime();
        this.setBgGreet();
        //this.getLocation();
        setTimeout(() => this.updateGUI(), 1000);
    }



}



const momentum = new Momentum();


