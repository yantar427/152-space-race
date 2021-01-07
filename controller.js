/*
Modul 152, LB - Space Race
07.01.2021, Alessia Siegrist und Tanja Wyder
*/

window.onload = function() {

    window.requestAnimationFrame(function(actualTime){
    
        // Canvas object
        /** @type {HTMLCanvasElement} */
        let canvas = document.getElementById('space-race');
        let ctx = canvas.getContext('2d');

        let startTime = actualTime;

        let playerRed = new myPlayer(150, 450, '#f00', 'Player Red');
        let playerBlue = new myPlayer(430, 450, '#00f', 'Player Blue');
        playerRed.draw(ctx);
        playerBlue.draw(ctx);

        window.addEventListener('keydown', function(){keyDown(event, playerRed, playerBlue)});
        window.addEventListener('keyup', function(){keyUp(event, playerRed, playerBlue)});

        showFrame(canvas, ctx, playerRed, playerBlue);

    });
}

function keyDown(event, playerRed, playerBlue) {
    // Key functions for Player Red (left side)
    if (event.keyCode == 87) {
        // keycode is 'w'
        playerRed.isUp = true;
        playerRed.isDown = false;
    } else if (event.keyCode == 83) {
        // keycode is 's'
        playerRed.isDown = true;
        playerRed.isUp = false;
    }
    // Key functions for Player Blue (right side)
    if (event.keyCode == 38) {
        // Keycode is 'arrow up'
        playerBlue.isUp = true;
        playerBlue.isDown = false;
    } else if (event.keyCode == 40) {
        // Keycode is 'arrow down'
        playerBlue.isDown = true;
        playerBlue.isUp = false;
    }
     
}

function keyUp(event, playerRed, playerBlue) {
    // Keys released for PlayerRed (left side)
    if (event.keyCode == 87) {
        // keyCode for 'w'
        playerRed.isUp = false;
    } else if (event.keyCode == 83) {
        // keyCode for 's'
        playerRed.isDown = false;
    }
    // Keys released for PlayerBlue (right side)
    if (event.keyCode == 38) {
        // keyCode for 'arrow up'
        playerBlue.isUp = false;
    } else if (event.keyCode == 40) {
        // keyCode for 'arrow down'
        playerBlue.isDown = false;
    }
}

class myPlayer {
    constructor(x, y, color, name) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 50;
        this.color = color;
        this.name = name;
        this.score = 0;
        this.isUp = false;
        this.isDown = false;
    }
    
    // Draw rectangle
    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Start position after life is lost or point is scored
    startPosition(){
        this.y = 450;
        this.isUp = false;
        this.isDown = false;
    }

    // Update position
    updatePosition() {
        if(this.isUp && this.y > 0) {
            this.moveUp();
        }else if(this.isDown && this.y < 450){
            this.moveDown();
        }
        if(this.y == 0){
            this.score++;
            this.startPosition();
        }
    }

    // Decrease Y value to move upwards
    moveUp(){
        this.y--;
    }
    // Increase Y value to move downwards
    moveDown(){
        this.y++;
    }

}

function showFrame(canvas, ctx, playerRed, playerBlue, gameOver) {
    // if(gameOver){
    //     return;
    // }

    // Check and update position of players
    playerRed.updatePosition();
    playerBlue.updatePosition();
    // Clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    playerRed.draw(ctx);
    playerBlue.draw(ctx);

    // Next animation step
    window.requestAnimationFrame(function(actualTime){
        showFrame(canvas, ctx, playerRed, playerBlue);
    })
}