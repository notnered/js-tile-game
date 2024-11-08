function inputHandler(){
    document.body.addEventListener('keydown', (event) => {
        // console.log(event);
        keyPressed = event.code;
        // console.log(keyPressed)
        switch (keyPressed) {
            case 'KeyF':
                // console.log(keyPressed,'1');
                newDetect(testArray, hitAreaFirst);
                break;
            case 'KeyG':
                // console.log(keyPressed, '2');
                newDetect(testArray, hitAreaSecond);
                break;
            case 'KeyH':
                // console.log(keyPressed, '3');
                newDetect(testArray, hitAreaThird);
                break;
            case 'KeyJ':
                // console.log(keyPressed, '4');
                newDetect(testArray, hitAreaFourth);
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