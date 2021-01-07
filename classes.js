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