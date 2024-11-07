function inputHandler(){
    document.body.addEventListener('keydown', (event) => {
        // console.log(event);
        keyPressed = event.code;
        // console.log(keyPressed)
        switch (keyPressed) {
            case 'KeyW':
                console.log(keyPressed,'up');
                break;
            case 'KeyS':
                console.log(keyPressed, 'down');
                break;
            case 'KeyD':
                console.log(keyPressed, 'right');
                break;
            case 'KeyA':
                console.log(keyPressed, 'left');
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