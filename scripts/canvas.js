const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// console.log(ctx);

// GETTING WINDOW HEIGHT AND WIDTH
let window_height = window.innerHeight;
let window_width = window.innerWidth;

// CANVAS HEIGHT/WIDTH
canvas.height = window_height - 64;
canvas.width = window_width / 2;

// RECTANGLE
// ctx.fillRect(100, 100, 100, 200);
// X, Y, Width, Height

// CIRCLE
// ctx.beginPath();
// ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2, false);
// ctx.stroke();
// ctx.closePath();

// SIMPLE RECTANGLES
// ctx.fillRect(200, 0, 50, 100);
// ctx.fillRect(300, 0, 50, 100);
// ctx.fillRect(400, 0, 50, 100);
// ctx.fillRect(500, 0, 50, 100);

// TODO: Реализовать функцию перемещения для пробы
// Затем перейти к реализации ритм игры
class Tile {
    constructor(xpos, ypos, width, height){
        this.xpos = xpos,
        this.ypos = ypos,
        this.width = width,
        this.height = height,
        this.speed = speed
    }

    draw(context){
        context.fillRect(this.xpos, this.ypos, this.width, this.height);
    }

    move(speed){
        console.log(speed);
    }


}

let tileFirst = new Tile(500, 0, 50, 100, 5);
tileFirst.draw(ctx);

function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos(){
    tileFirst.xpos += 1;
    tileFirst.ypos += 1;
}

function update(){
    clear();

    tileFirst.draw(ctx);

    newPos();

    requestAnimationFrame(update);
}

update();


