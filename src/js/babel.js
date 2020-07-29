
async function f() {
    return 'asyn work in ie11'
}

f().then(console.log)

class Class {
    constructor(time, days) {
        this.time = time;
        this.days = days;
    }
    show() {
        console.log(`Today is ${this.time} and ${this.days} days`)
    }
}

const time  = new Class('10:10', 'Sunday');

time.show()
