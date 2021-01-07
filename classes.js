/**
 * Klasse zum erstellen von Canvas Texten
 */
class myText {
    // Konstruktor
    constructor(text, font, x, y){
        this.text = text;
        this.font = font;
        this.x = x;
        this.y = y;
    }

    /**
     * Zeichnen des Textes
     * @param ctx   // Canvas Context zum zeichnen 
     */
    draw(ctx) {
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }
}

/**
 * Klasse zum erstellen von Canvas Buttons (Rechtecke)
 */
class myButton {
    // Konstruktor
    constructor(x, y, width, height, lineWidth, strokeStyle){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.linewidth = lineWidth;
        this.strokestyle = strokeStyle;
    }

    /**
     * Zeichnen des Buttons (Rechteck)
     * @param ctx   // Canvas Context zum zeichnen 
     */
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();
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