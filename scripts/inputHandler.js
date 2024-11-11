function inputHandler(){
    document.body.addEventListener('keydown', (event) => {
        // console.log(event);
        keyPressed = event.code;
        // console.log(keyPressed)
        switch (keyPressed) {
            case 'KeyF':
                // console.log(keyPressed,'1');
                newDetect(tileArray, hitAreaFirst);
                break;
            case 'KeyG':
                // console.log(keyPressed, '2');
                newDetect(tileArray, hitAreaSecond);
                break;
            case 'KeyH':
                // console.log(keyPressed, '3');
                newDetect(tileArray, hitAreaThird);
                break;
            case 'KeyJ':
                // console.log(keyPressed, '4');
                newDetect(tileArray, hitAreaFourth);
                break;
            default:
                // console.log(keyPressed)
                break;
        }
    });
    
    // document.body.addEventListener('keyup', (event) => {
    //     console.log(event);
    // });
}

inputHandler();