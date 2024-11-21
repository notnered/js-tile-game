import { newDetect, tileArray, hitAreaFirst, hitAreaSecond, hitAreaThird, hitAreaFourth, startGame } from './canvas.js';

function inputHandler(){
    document.body.addEventListener('keydown', (event) => {
        let keyPressed = event.code;
        switch (keyPressed) {
            case 'KeyF':
                newDetect(tileArray, hitAreaFirst);
                break;
            case 'KeyG':
                newDetect(tileArray, hitAreaSecond);
                break;
            case 'KeyH':
                newDetect(tileArray, hitAreaThird);
                break;
            case 'KeyJ':
                newDetect(tileArray, hitAreaFourth);
                break;
            case 'Space':
                startGame();
                break;
            default:
                break;
        }
    });
}

inputHandler();