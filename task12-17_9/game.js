const arr = [
    'black',
    'black',
    'black',
    'black',
    'black',
    'black',
    'black',
    'black',
    'black',
    'black',
    'black',
    'black',
    'black',
    'black',
    'black',
    'red',
    'red',
    'red',
    'red',
    'red',
    'red',
    'red',
    'red',
    'red',
    'red',
    'red',
    'red',
    'red',
    'red',
    'red',
    'green',
];
function random() {
    const indexResult = Math.floor(Math.random() * arr.length);
    return arr[indexResult];
}

function game(times) {
    var coins = times;
    for (var i = 1; i <= times; i++) {
        // chơi 1 lần sẽ trừ đo 1 coin
        coins -= 1;
        const result = random();

        if (result == 'black') {
        } else if (result == 'red') {
            coins += 1;
        } else if (result == 'green') {
            coins += 10;
        }
    }
    return coins;
}

const result = game(1000);
console.log(result);
