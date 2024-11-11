const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// console.log(ctx);

// GETTING WINDOW HEIGHT AND WIDTH
let window_height = window.innerHeight;
let window_width = window.innerWidth;

// CANVAS HEIGHT/WIDTH
canvas.height = 600;
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
    }

    checkColision(ypos, context){
        if (ypos >= canvas.height){
            context.clearRect(this.xpos, this.ypos, this.width, this.height);
            this.status = 0;
        }
    }

    disappear(context){
        context.clearRect(this.xpos, this.ypos, this.width, this.height);
        this.status = 0;
        // console.log('disappeared');
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

const TILE_HEIGHT = 80;
const TILE_WIDTH = 50;

const LINE_ONE = 100;
const LINE_TWO = 45;
const LINE_THREE = 10;
const LINE_FOUR = 65;

const MOVE_SPEED = 2;

const AUDIO_POP = new Audio('../sounds/drum-hitclap.ogg');

let score = 0;
let total_combo = 1;

let hitAreaFirst = new HitArea((canvas.width / 2) - LINE_ONE, canvas.height - 80, TILE_WIDTH, TILE_HEIGHT);
let hitAreaSecond = new HitArea((canvas.width / 2) - LINE_TWO, canvas.height - 80, TILE_WIDTH, TILE_HEIGHT);
let hitAreaThird = new HitArea((canvas.width / 2) + LINE_THREE, canvas.height - 80, TILE_WIDTH, TILE_HEIGHT);
let hitAreaFourth = new HitArea((canvas.width / 2) + LINE_FOUR, canvas.height - 80, TILE_WIDTH, TILE_HEIGHT);

let tileFirst = new Tile((canvas.width / 2) - LINE_ONE, -100, TILE_WIDTH, TILE_HEIGHT);
let tileSecond = new Tile((canvas.width / 2) - LINE_TWO, -0, TILE_WIDTH, TILE_HEIGHT);
let tileThird = new Tile((canvas.width / 2 ) + LINE_THREE, -200, TILE_WIDTH, TILE_HEIGHT);
let tileFourth = new Tile((canvas.width / 2) + LINE_FOUR, -300, TILE_WIDTH, TILE_HEIGHT);

let tileX5 = new Tile((canvas.width / 2) - LINE_ONE, -700, TILE_WIDTH, TILE_HEIGHT);
let tileX6 = new Tile((canvas.width / 2) - LINE_ONE, -450, TILE_WIDTH, TILE_HEIGHT);
let tileX7 = new Tile((canvas.width / 2) + LINE_THREE, -400, TILE_WIDTH, TILE_HEIGHT);
let tileX8 = new Tile((canvas.width / 2) + LINE_FOUR, -500, TILE_WIDTH, TILE_HEIGHT);

let testArray = [tileFirst, tileSecond, tileThird, tileFourth, tileX5, tileX6, tileX7, tileX8];

console.log(tileFirst instanceof Tile);

function newDetect(array, hitArea){
    let hitConnected = false;
    let tileHitbox;
    let hitTiming;
    for (let i = 0; i < array.length; i++){
        if (hitArea.ypos <= array[i].ypos + array[i].height && hitArea.xpos === array[i].xpos && array[i].status === 1){
            hitConnected = true;
            tileHitbox = array[i];
            hitTiming = Math.floor((tileHitbox.ypos + (tileHitbox.ypos + tileHitbox.height)) / 2);
            // console.log(tileHitbox, hitTiming);
        }
    }
    // console.log(tileHitbox, hitTiming);
    if (hitConnected === true){
        AUDIO_POP.play();
        tileHitbox.disappear(ctx);
        console.log(tileHitbox.status);
        scoreCounter(hitArea, tileHitbox, hitTiming);
    } else {
        failedHit();
    }
}

function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// function detectHit(hitArea, tileHitbox){
//     const audioPop = new Audio('../sounds/drum-hitclap.ogg');
//     if (hitArea.ypos <= tileHitbox.ypos + tileHitbox.height && hitArea.xpos === tileHitbox.xpos && tileHitbox.status === 1){
//         let hitTiming = Math.floor((tileHitbox.ypos + (tileHitbox.ypos + tileHitbox.height)) / 2);
//         audioPop.play();
//         scoreCounter(hitArea, tileHitbox, hitTiming);
//     } else {
//         console.log('miss');
//         failedHit()
//     }
// }

let tileArray = [];


function succesfullHit(points){
    score += (points * total_combo);
    total_combo += 1;
    console.log(`points: ${score}pts`);
    console.log(`combo: ${total_combo}x`);
}

function failedHit(){
    total_combo = 1;
    console.log(`points: ${score}pts`);
    console.log(`combo: ${total_combo}x`);
}

function scoreCounter(hitArea, tileHitbox, hitTiming){
    let hitAreaTop = hitArea.ypos - tileHitbox.height;
    let hitAreaBottom = hitArea.ypos + hitArea.height;
    let okArray = [];
    let niceArray = [];
    let greatArray = [];
    for (let o = hitAreaTop; o <= hitAreaBottom; o++){
        okArray.push(o);
    }
    let middleArrayIndex = Math.floor(okArray.length / 2) + 20;
    for (let n = okArray[middleArrayIndex] - Math.floor(okArray.length / 6) ;n < okArray[middleArrayIndex] + Math.floor(okArray.length / 6) ;n++){
        niceArray.push(n);
    }
    for (let g = okArray[middleArrayIndex] - Math.floor(okArray.length / 16);g < okArray[middleArrayIndex] + Math.floor(okArray.length / 16);g++){
        greatArray.push(g);
    }
    if (greatArray.includes(hitTiming)){
        console.log('great');
        succesfullHit(300);
    } else if (niceArray.includes(hitTiming)){
        console.log('nice');
        succesfullHit(100);
    } else if (okArray.includes(hitTiming)){
        console.log('ok');
        succesfullHit(50);
    }
}

function drawScore(score){
    // console.log(ctx);
    ctx.font = "48px serif";
    ctx.fillText(`${score}pts`, canvas.width - 180, 50);
}

function drawCombo(combo){
    ctx.font = "48px serif";
    ctx.fillText(`${combo}x`, 20, canvas.height - 25);
}

// function newPos(){
//     tileFirst.xpos += 1;
//     tileFirst.ypos += 1;
// }

function update(){
    clear();

    testArray.forEach((obj) => {
        obj.draw(ctx);
    })

    // tileFirst.draw(ctx);
    // tileSecond.draw(ctx);
    // tileThird.draw(ctx);
    // tileFourth.draw(ctx);
    // tileX5.draw(ctx);
    // tileX6.draw(ctx);
    // tileX7.draw(ctx);
    // tileX8.draw(ctx);

    testArray.forEach((obj) => {
        obj.move(MOVE_SPEED);
    });

    // tileFirst.move(1);
    // tileSecond.move(1);
    // tileThird.move(1);
    // tileFourth.move(1);
    // tileX5.move(1);
    // tileX6.move(1);
    // tileX7.move(1);
    // tileX8.move(1);

    hitAreaFirst.appear(ctx);
    hitAreaSecond.appear(ctx);
    hitAreaThird.appear(ctx);
    hitAreaFourth.appear(ctx);

    // detectHit(hitAreaFirst, tileFirst);
    // detectHit(hitAreaSecond, tileSecond);
    // detectHit(hitAreaThird, tileThird);
    // detectHit(hitAreaFourth, tileFourth);

    // for (let i = 0; i < testArray.length; i++){
    //     // console.log(testArray[i]);
    //     if (testArray[testArray.length - 1].status === 0){
    //         // console.log('done')
    //         return;
    //     }
    // }

    drawScore(score);
    drawCombo(total_combo);

    requestAnimationFrame(update);
}

update();


