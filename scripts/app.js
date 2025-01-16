function sayHello() {
    console.log('Hello');
}

function init() {
    console.log('Hello World');

    sayHi('Chris');
    sayHello();
}

function sayHi(name) {
    console.log('Hi ' + name);
}

window.onload = init;

// Variable Scope