const canvas = document.querySelector('#canvas');

const context = canvas.getContext('2d');

console.log(context);

let window_height = window.innerHeight;
let window_width = window.innerWidth;

canvas.height = window_height - 64;
canvas.width = window_width / 2;

// context.fillRect(100, 100, 100, 200);
// X, Y, Width, Height

context.beginPath();
context.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2, false);

context.stroke();
context.closePath();

let tileYPosition = 0;

let tile1 = context.fillRect(200, tileYPosition, 50, 100);
let tile2 = context.fillRect(300, tileYPosition, 50, 100);
let tile3 = context.fillRect(400, tileYPosition, 50, 100);
let tile4 = context.fillRect(500, tileYPosition, 50, 100);






