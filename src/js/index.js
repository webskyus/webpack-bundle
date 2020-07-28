import clock from './models/clock.js';
import '../styles/style.css';
import '../sass/main.sass'

const counter = clock(),
      timer   = document.querySelector('.timeout');

setInterval(() => {
    timer.innerHTML = counter();
}, 1000)