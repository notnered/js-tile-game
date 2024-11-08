function inputHandler(){
    document.body.addEventListener('keydown', (event) => {
        // console.log(event);
        keyPressed = event.code;
        // console.log(keyPressed)
        switch (keyPressed) {
            case 'KeyF':
                // console.log(keyPressed,'1');
                detectHit(hitAreaFirst, tileFirst);
                break;
            case 'KeyG':
                // console.log(keyPressed, '2');
                detectHit(hitAreaSecond, tileSecond);
                break;
            case 'KeyH':
                // console.log(keyPressed, '3');
                detectHit(hitAreaThird, tileThird);
                break;
            case 'KeyJ':
                // console.log(keyPressed, '4');
                detectHit(hitAreaFourth, tileFourth);
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