/*
Modul 152, LB - Space Race
08.01.2021, Alessia Siegrist und Tanja Wyder
*/

/**
 * Klasse zum Erstellen von Canvas-Texten
 */
class myText {
    // Konstruktor
    constructor(text, font, x, y, fillStyle){
        this.text = text;
        this.font = font;
        this.x = x;
        this.y = y;
        this.fillStyle = fillStyle;
    }

    /**
     * Zeichnen des Textes
     * @param ctx   // Canvas Context zum Zeichnen 
     */
    draw(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.fillStyle;
        ctx.fillText(this.text, this.x, this.y);
    }

    /**
     * Zeichnet Text mit aktualisiertem Inhalt
     * @param ctx   // Canvas-Context zum Zeichnen
     * @param text  // aktualisierter Text
     */
    drawUpdatedText(ctx, text) {
        ctx.font = this.font;
        ctx.fillStyle = this.fillStyle;
        ctx.fillText(text, this.x, this.y);

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
        this.lives = 3;
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
            this.y = this.y - 2;
        // Bewegung nach unten
        }else if(this.isDown && this.y < 450){
            this.y = this.y + 2;
        }
        // Oberer Spielrand wird erreicht
        if(this.y <= 0){
            this.score ++;
            console.log("Score " + this.name + ": " + this.score);
            this.startPosition();
        }
    }
}

class smallHeart {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
                    
        // Linken Kreis zeichnen
        ctx.strokeStyle = '#f00';
        ctx.fillStyle = '#f00';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 7, 0, 2*Math.PI, true);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        // Rechten Kreis zeichnen
        ctx.beginPath();
        ctx.arc(this.x+14, this.y, 7, 0, 2*Math.PI, true);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        // Herzspitze zeichnen
        ctx.strokeStyle = '#000';
        ctx.lineWidth = '2';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 7, 0, 135*Math.PI/180, false);
        ctx.lineTo(this.x+7, this.y+15);
        ctx.lineTo(this.x+7, this.y);
        ctx.lineTo(this.x+14, this.y);
        ctx.arc(this.x+14, this.y, 7, 0, 45*Math.PI/180, false);
        ctx.lineTo(this.x+7, this.y+15);
        ctx.fill();
        ctx.closePath();
        

    }
}

/**
 * Klass zum erstellen der Hindernisse (Kreis)
 * Das Attribut direction beinhaltet einen boolean wecher
 * die Richtung bestimmt -> True = Links und False = Rechts
 */
class myObstacle {
    constructor(x, y, r, direction) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.style = "#fff";
        this.sAngle = 0;
        this.eAngle = 2 * Math.PI;
        this.direction = direction;
    }
    
    /**
     * Zeichnen des Hindernis (Kreis)
     * @param ctx 
     */
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, this.sAngle, this.eAngle);
        ctx.strokeStyle = this.style;
        ctx.fillStyle = this.style;
        ctx.stroke();
        ctx.fill();
    }

    // Startposition anpassen sobald der Rand vom Canvas erreicht wurde
    startPosition() {
        if (this.direction) {
            // Links
            this.x = 603;
        } else {
            // Rechts
            this.x = -3;
        }
    }

    // Verschieben der Position anhand der direction
    updatePosition() {
        if (this.direction) {
            if (this.x > -4 && this.x < 604) {
                console.log(this.x);
                this.x--;
            } else {
                console.log(this.x);
                this.startPosition();
            }
        } else {
            if (this.x > -4 && this.x < 604) {
                console.log(this.x);
                this.x++;
            } else {
                console.log(this.x);
                this.startPosition();
            }
        }
    }
}