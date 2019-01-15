var canvas, idTimer, figures;
var x, y;
var chaos = false;
var random = false;

class Figure {
    constructor(pX, pY) {
        this.posX = pX;
        this.posY = pY;
        this.deltaX = 0;
        this.deltaY = 0;
        this.colour = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
        this.radius = 5 + Math.random() * 25;
    }
}

class Circle extends Figure {
    draw(ctx) {
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
    }
}


class Rectangle extends Figure {
    draw(ctx) {
        ctx.fillStyle = this.colour
        ctx.fillRect(this.posX, this.posY, 2 * this.radius, 2 * this.radius);
    }
}

class Triangle extends Figure {
    draw(ctx) {
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.moveTo(this.posX, this.posY);
        ctx.lineTo(this.posX + this.radius, this.posY + this.radius);
        ctx.lineTo(this.posX + this.radius, this.posY - this.radius);
        ctx.fill();
    }
}

function drawBack(ctx, col1, col2, w, h) {
    // закрашиваем канвас градиентным фоном
    ctx.save();
    var g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(1, col1);
    g.addColorStop(0, col2);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
}

function createRandomFigure(x, y) {
    var which = Math.floor(Math.random() * 3) + 1;
    if (which == 1) return new Rectangle(x, y);
    if (which == 2) return new Circle(x, y);
    if (which == 3) return new Triangle(x, y);
}

function init() {
    canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        drawBack(ctx, '#4169E1', '#ADD8E6', canvas.width, canvas.height);

        figures = [];
        var x = 0;
        var y = 0;
        for (var i = 1; i <= 10; i++) {
            x = 10 + Math.random() * (canvas.width - 30);
            y = 10 + Math.random() * (canvas.height - 30);
            var item = createRandomFigure(x, y);
            item.draw(ctx);
            figures.push(item);
        }
    }
}

function goInput(event) {
    var x = event.clientX;
    var y = event.clientY;
    var item = createRandomFigure(x, y);
    item.draw(ctx);
    figures.push(item);
}

function moveBall() {
    //реализация движения шариков, находящихся в массиве figures
    drawBack(ctx, '#4169E1', '#ADD8E6', canvas.width, canvas.height);

    for (var i = 0; i < figures.length; i) {
        if (chaos) {
            figures[i].posX = figures[i].posX + (Math.random() * 50 - 25);
            figures[i].posY = figures[i].posY + (Math.random() * 50 - 25);
        }
        else {
            if (random) {
                figures[i].posX = figures[i].posX + figures[i].deltaX
                figures[i].posY = figures[i].posY + figures[i].deltaY
            }
            else {
                figures[i].posX = figures[i].posX + x
                figures[i].posY = figures[i].posY + y
            }
        }
        figures[i].radius += 0.25;
        figures[i].draw(ctx);


        if (
            ((figures[i].posX + figures[i].radius) > canvas.width)
            || ((figures[i].posX - figures[i].radius) < 0)
            || ((figures[i].posY - figures[i].radius) < 0)
            || ((figures[i].posY + figures[i].radius) > canvas.height)
            || figures[i].radius > 40
        )
            figures.splice(i, 1);
        else
            i++;
    }
}

function move() {
    idTimer = setInterval('moveBall();', 50);
}

function stop() {
    idTimer = clearInterval(idTimer)
    x = 0;
    y = 0;
}

function right() {
    x = 1;
    y = 0;
}

function left() {
    x = -1;
    y = 0;
}

function up() {
    x = 0;
    y = -1;
}

function down() {
    x = 0;
    y = 1;
}

function chaos_() {
    chaos = !chaos;
}


function random_() {
    random = !random;
    for (var i = 0; i < figures.length; i++) {
        figures[i].deltaX = (Math.random() * 50 - 25);
        figures[i].deltaY = (Math.random() * 50 - 25);
    }
}
