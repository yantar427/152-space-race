/*
Modul 152, LB - Space Race
08.01.2021, Alessia Siegrist und Tanja Wyder
*/

/**
 * Klasse zum Erstellen von Canvas-Texten
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
     * @param ctx   // Canvas Context zum Zeichnen 
     */
    draw(ctx) {
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }
}

/**
 * Klasse zum Erstellen von Canvas Buttons (Rechtecke)
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
     * @param ctx   // Canvas Context zum Zeichnen 
     */
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();
    }
}

/**
 * Klasse zum Erstellen der Player-Figuren
 */
class myPlayer {
    // Konstruktor
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
    
    /**
     * Zeichnen der Player-Figuren
     * @param ctx   // Canvas-Context zum Zeichnen
     */
    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    /**
     * Startposition nach Kollision oder Punktgewinn
     */
    startPosition(){
        this.y = 450;
        this.isUp = false;
        this.isDown = false;
    }

    /**
     * Neue Position setzen
    */
    updatePosition() {
        // Bewegung nach oben
        if(this.isUp && this.y > 0) {
            this.y--;
        // Bewegung nach unten
        }else if(this.isDown && this.y < 450){
            this.y++;
        }
        // Oberer Spielrand wird erreicht
        if(this.y == 0){
            this.score++;
            this.startPosition();
        }
    }
}