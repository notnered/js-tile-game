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

    succesfullHit(timing){

    }

    failedHit(timing){

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

let hitAreaFirst = new HitArea((canvas.width / 2) - 100, canvas.height - 80, 50, 80);
let hitAreaSecond = new HitArea((canvas.width / 2) - 45, canvas.height - 80, 50, 80);
let hitAreaThird = new HitArea((canvas.width / 2) + 10, canvas.height - 80, 50, 80);
let hitAreaFourth = new HitArea((canvas.width / 2) + 65, canvas.height - 80, 50, 80);


let tileFirst = new Tile((canvas.width / 2) - 100, 100, 50, 80);
let tileSecond = new Tile((canvas.width / 2) - 45, 0, 50, 80);
let tileThird = new Tile((canvas.width / 2 ) + 10, 200, 50, 80);
let tileFourth = new Tile((canvas.width / 2) + 65, 0, 50, 80);

// tileFirst.draw(ctx);
// tileSecond.draw(ctx);


function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function detectHit(hitArea, tileHitbox){
    // console.log(hitArea.ypos);
    const audioPop = new Audio('../sounds/drum-hitclap.ogg');
    if (hitArea.ypos <= tileHitbox.ypos + tileHitbox.height && hitArea.xpos === tileHitbox.xpos && tileHitbox.status === 1){
        
        // console.log('hit: ', hitArea.ypos, 'hitBottom: ', hitArea.ypos + hitArea.height);
        // console.log('hitTiming: ',hitTiming);
        // console.log(hitArea.xpos, tileHitbox.xpos);
        // console.log(tileHitbox.ypos);
        // let topHitTiming = tileHitbox.ypos;
        // let bottomHitTiming = tileHitbox.ypos + tileHitbox.height;
        // console.log(topHitTiming, bottomHitTiming);
        // console.log(tileHitbox.ypos, tileHitbox.height);
        let hitTiming = Math.floor((tileHitbox.ypos + (tileHitbox.ypos + tileHitbox.height)) / 2);
        audioPop.play();
        // console.log('timing', hitTiming);
        // console.log('Hit Timing !!!!', hitTiming);
        scoreCounter(hitArea, tileHitbox, hitTiming);
    }
}

function scoreCounter(hitArea, tileHitbox, hitTiming){
    // let bottomHitArea = tileHitbox.ypos + tileHitbox.height;
    let hitAreaTop = hitArea.ypos - tileHitbox.height;
    let hitAreaBottom = hitArea.ypos + hitArea.height;
    // console.log(hitAreaTop, hitAreaBottom);
    // let timingBox = tileHitbox.ypos + (tileHitbox.ypos + tileHitbox.height) / 2;
    // console.log('timingBox', timingBox);
    // console.log('HitArea T/B', hitAreaTop, hitAreaBottom);
    let okArray = [];
    let niceArray = [];
    let greatArray = [];
    // console.log('for arguments: ', hitAreaTop, (hitAreaBottom - hitAreaTop));
    for (let o = hitAreaTop; o <= hitAreaBottom; o++){
        okArray.push(o);
    }
    // console.log('ok:', okArray);
    let middleArrayIndex = Math.floor(okArray.length / 2) + 20;
    // console.log('middleArrayIndex: ',middleArrayIndex)
    for (let n = okArray[middleArrayIndex] - Math.floor(okArray.length / 6) ;n < okArray[middleArrayIndex] + Math.floor(okArray.length / 6) ;n++){
        niceArray.push(n);
    }
    // console.log('niceArray: ',niceArray);
    for (let g = okArray[middleArrayIndex] - Math.floor(okArray.length / 16);g < okArray[middleArrayIndex] + Math.floor(okArray.length / 16);g++){
        greatArray.push(g);
    }
    // console.log('tileHitbox: ', tileHitbox);
    // console.log('hitArea', hitArea);
    // console.log('greatArray: ', greatArray);
    if (greatArray.includes(hitTiming)){
        console.log('great');
    } else if (niceArray.includes(hitTiming)){
        console.log('nice');
    } else if (okArray.includes(hitTiming)){
        console.log('ok');
    }
    // console.log('bottomY: ', bottomHitArea);
    // if (tileHitbox.ypos + tileHitbox.height){

    // }
    // console.log(hitArea.ypos, tileHitbox.ypos);
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


