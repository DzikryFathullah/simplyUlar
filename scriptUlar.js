var canvas = document.getElementById('canvasArea');
var c = canvas.getContext('2d');

var ular = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 }
];

let stepX = 10;
let stepY = 0;

makanan()
main();

document.addEventListener("keydown", arah);

function main() {
    if (gameOver()) {
        c.fillStyle = "blue";
        c.textBaseLine = "middle";
        c.textAlign = "center";
        c.font = "normal bold 13px arial"

        c.fillText("press F5 to Restart", canvas.width / 2, (canvas.height / 2) + 20)
        return gameOverWord()
    }
    setTimeout(function onTick() {
        refreshCanvas();
        tampilMakanan()
        bergerak();
        gambarUlar();
        main();
    }, 100)
}


function arah(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const arahConsole = event.keyCode;
    const goingUp = stepY === -10;
    const goingDown = stepY === 10;
    const goingRight = stepX === 10;
    const goingLeft = stepX === -10;

    if (arahConsole === LEFT_KEY && !goingRight) {
        stepX = -10;
        stepY = 0;
    }
    if (arahConsole === UP_KEY && !goingDown) {
        stepY = -10;
        stepX = 0;
    }
    if (arahConsole === RIGHT_KEY && !goingLeft) {
        stepX = 10;
        stepY = 0;
    }
    if (arahConsole === DOWN_KEY && !goingUp) {
        stepY = 10;
        stepX = 0;
    }
}


function gambarUlar() {
    ular.forEach(ularPola);
}

function ularPola(pola) {
    c.fillStyle = "green";
    c.strokeStyle = "black";

    c.fillRect(pola.x, pola.y, 10, 10);
    c.strokeRect(pola.x, pola.y, 10, 10);
}

function bergerak() {
    ular.unshift({ x: ular[0].x + stepX, y: ular[0].y + stepY });

    if (ular[0].x === makananX && ular[0].y === makananY) {
        makanan();
    } else {
        ular.pop();
    }
}

function refreshCanvas() {
    c.fillStyle = "lightblue"
    c.strokeStyle = 'black'

    c.fillRect(0, 0, canvas.width, canvas.height);
    c.strokeRect(0, 0, canvas.width, canvas.height);
}

function bersihArea() {
    c.fillStyle = "white"
    c.strokeStyle = 'black'

    c.fillRect(0, 0, canvas.width, canvas.height);
    c.strokeRect(0, 0, canvas.width, canvas.height);
}
function cariAngka(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function makanan() {
    makananX = cariAngka(0, canvas.width - 10);
    makananY = cariAngka(0, canvas.height - 10);

    ular.forEach(function letakMakanan(letak) {
        const letakMakanan = letak.x == makananX && letak.y == makananY;
        if (letakMakanan) {
            makanan();
        }
    });
}

function tampilMakanan() {
    c.fillStyle = "orange";
    c.strokeStyle = "darkgreen";
    c.fillRect(makananX, makananY, 10, 10);
    c.strokeRect(makananX, makananY, 10, 10);
}

function gameOver() {
    for (let i = 4; i < ular.length; i++) {
        if (ular[i].x === ular[0].x && ular[i].y === ular[0].y) {
            return true
        }
    }
    const failLeftSide = ular[0].x < 0
    const failRightSide = ular[0].x > canvas.width - 10
    const failUpSide = ular[0].y < 0
    const failDownSide = ular[0].y > canvas.height - 10

    return failLeftSide || failRightSide || failUpSide || failDownSide
}

function gameOverWord() {
    c.fillStyle = "red";
    c.textBaseLine = "middle";
    c.textAlign = "center";
    c.font = "normal bold 25px arial"

    c.fillText("G A M E   O V E R ", canvas.width / 2, canvas.height / 2)
}

