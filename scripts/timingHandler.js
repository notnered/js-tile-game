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


// function detectHitNew(lineArray){
//     for (let i = 0; i < lineArray.length; i++){
//         console.log(lineArray[i].ypos);
//     }
// };