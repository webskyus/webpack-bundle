import * as $ from 'jquery';
import clock from '@models/clock';
import '../styles/style.css';
import '../sass/main.sass'
import xml from '@assets/data'
import csv from '@assets/data'
import './babel'

const counter = clock(),
      timer   = document.querySelector('.timeout');

setInterval(() => {
    timer.innerHTML = counter();
}, 1000)

// xml support show
console.log(xml)

// csv support show
console.log(csv)

// jquery work show
let wrapper = $('.wrapper')

wrapper.addClass('wrapper--added-new-class')
