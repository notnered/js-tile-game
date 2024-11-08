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
    constructor(xpos, ypos, width, height, speed){
        this.xpos = xpos,
        this.ypos = ypos,
        this.width = width,
        this.height = height,
        this.speed = speed,
        this.status = 1
    }

    draw(context){
        if(this.status === 1){
            context.fillRect(this.xpos, this.ypos, this.width, this.height);
        }
    }

    move(speed){
        if (this.status === 1){
            this.ypos += speed;
            this.checkColision(this.ypos, ctx);
        }
        // console.log(this.ypos);
    }

    checkColision(ypos, context){
        // console.log('colision', ypos);
        if (ypos >= canvas.height){
            // console.log('colision!!!!!');
            context.clearRect(this.xpos, this.ypos, this.width, this.height);
            this.status = 0;
        }
    }

}

class HitArea {
    constructor(xpos, ypos, width, height, color){
        this.xpos = xpos,
        this.ypos = ypos,
        this.width = width,
        this.height = height,
        this.color = color
    }

    appear(context){
        context.fillRect(this.xpos, this.ypos, this.width, this.height);
    }
}

let hitAreaFirst = new HitArea((canvas.width / 2) - 100, canvas.height - 50, 50, 50);
let hitAreaSecond = new HitArea((canvas.width / 2) - 45, canvas.height - 50, 50, 50);
let hitAreaThird = new HitArea((canvas.width / 2) + 10, canvas.height - 50, 50, 50);
let hitAreaFourth = new HitArea((canvas.width / 2) + 65, canvas.height - 50, 50, 50);


let tileFirst = new Tile((canvas.width / 2) - 100, 100, 50, 100);
let tileSecond = new Tile((canvas.width / 2) - 45, 0, 50, 100);
let tileThird = new Tile((canvas.width / 2 ) + 10, 200, 50, 100);
let tileFourth = new Tile((canvas.width / 2) + 65, 0, 50, 100);

// tileFirst.draw(ctx);
// tileSecond.draw(ctx);


function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function detectHit(hitArea, tileHitbox){
    // console.log(hitArea.ypos);
    // console.log(tileHitbox.ypos);
    if (hitArea.ypos <= tileHitbox.ypos + tileHitbox.height && hitArea.xpos === tileHitbox.xpos && tileHitbox.status === 1){
        console.log('hit', hitArea.ypos, tileHitbox.ypos);
        // console.log(hitArea.xpos, tileHitbox.xpos);
        scoreCounter(hitArea, tileHitbox)
    }
}

function scoreCounter(hitArea, tileHitbox){
    // let bottomHitArea = tileHitbox.ypos + tileHitbox.height;
    let hitAreaTop = hitArea.ypos;
    let hitAreaBottom = hitArea.ypos + hitArea.height;
    console.log('HitArea T/B', hitAreaTop, hitAreaBottom);
    let okArray = [];
    let niceArray = [];
    let greatArray = [];
    console.log('for arguments: ', hitAreaTop, (hitAreaBottom - hitAreaTop));
    for (let o = hitAreaTop; o <= hitAreaBottom; o++){
        okArray.push(o);
    }
    console.log(okArray);
    let middleArrayIndex = okArray.length / 2;
    console.log('middleArrayIndex: ',middleArrayIndex)
    for (let n = hitAreaTop;n < middleArrayIndex + 10 ;n++){
        niceArray.push(n);
    }
    // console.log('bottomY: ', bottomHitArea);
    // if (tileHitbox.ypos + tileHitbox.height){

    // }
    console.log(hitArea.ypos, tileHitbox.ypos);
}

// function newPos(){
//     tileFirst.xpos += 1;
//     tileFirst.ypos += 1;
// }

function update(){
    clear();

    tileFirst.draw(ctx);
    tileSecond.draw(ctx);
    tileThird.draw(ctx);
    tileFourth.draw(ctx);

    tileFirst.move(1);
    tileSecond.move(1);
    tileThird.move(1);
    tileFourth.move(1);


    hitAreaFirst.appear(ctx);
    hitAreaSecond.appear(ctx);
    hitAreaThird.appear(ctx);
    hitAreaFourth.appear(ctx);

    // detectHit(hitAreaFirst, tileFirst);
    // detectHit(hitAreaSecond, tileSecond);
    // detectHit(hitAreaThird, tileThird);
    // detectHit(hitAreaFourth, tileFourth);

    requestAnimationFrame(update);
}

update();


