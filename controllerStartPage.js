/*
Modul 152, LB - Space Race
Enthält alle Funktionen um die Startseite zu zeichnen und zu verarbeiten sowie
die Weiterleitung zum start des Games
08.01.2021, Alessia Siegrist und Tanja Wyder
*/

// Variable für das Game Over Flag setzten
var gameOver = false;
// Variablen für die Geschwindigkeit der Hindernisse
var speed = 1;
// Initialisierung für die Angabe zum Level
var difficultyLevel = 0;

// Konstatendeklaration für die Schwierigkeitsstufen
const easy = 1;
const medium = 2;
const difficult = 3;
const none = 0;

// Ausführen der Startfunktion auf das fertige Laden der Seite
window.onload = function() { startNewGame(); }

/**
 * Funktion, um den Startbildschirm anzuzeigen
 */
function startNewGame() {
    // Canvas Object
    /** @type {HTMLCanvasElement} */
    var canvas = document.getElementById("space-race");
    var ctx = canvas.getContext("2d");

    var buttons = drawGameStartPage(ctx, canvas);

    canvas.addEventListener("mousemove", function() {
        onMouseMove(event, buttons.easyButton, buttons.mediumButton, buttons.difficultButton,
            buttons.startButton, ctx, canvas)});

    canvas.addEventListener("click", function() {
        setDifficulty(event, buttons.easyButton, buttons.mediumButton, 
            buttons.difficultButton, buttons.startButton, ctx, canvas)});

}

/**
 * Alle Texte und Buttons (Rechtecke) mithilfe der Klassen erstellen und zeichnen
 * @param ctx     // Canvas Context um die Texte und Buttons (Rechtecke) zu zeichnen 
 * @param canvas  // Canvas-Objekt zum Zeichnen
 */
function drawGameStartPage(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var titleText = new myText("Space Race", "50px Raleway", 150, 100);
    titleText.draw(ctx);

    var difficultyText = new myText("Schwierigkeitsgrad", "30px Raleway", 150, 150);
    difficultyText.draw(ctx);

    var easyButton = new myButton(50, 200, 150, 40, 2, "#000");
    easyButton.draw(ctx,'#000');
    var easyText = new myText("Leicht", "24px Raleway", 90, 230);
    easyText.draw(ctx);
    
    var mediumButton = new myButton(220, 200, 150, 40, 2, "#000");
    mediumButton.draw(ctx,'#000');
    var mediumText = new myText("Mittel", "24px Raleway", 260, 230);
    mediumText.draw(ctx);
    
    var difficultButton = new myButton(390, 200, 150, 40, 2, "#000");
    difficultButton.draw(ctx, '#000');
    var difficultText = new myText("Schwierig", "24px Raleway", 410, 230);
    difficultText.draw(ctx);

    var startButton = new myButton(150, 280, 300, 60, 2, "#000");
    startButton.draw(ctx);
    var startText = new myText("Start", "40px Raleway", 250, 325);
    startText.draw(ctx);

    // Rückgabe aller Buttons (Rechtecke) mit Label
    return {
        easyButton: easyButton,
        mediumButton: mediumButton,
        difficultButton: difficultButton,
        startButton: startButton
    };
}

/**
 * Funktion für Mouseover-Animation
 * @param e                 // Event um die Mausposition zu erhalten 
 * @param easyButton        // Buttonobjekt für die Schwierigkeitsstufe "Leicht"  
 * @param mediumButton      // Buttonobjekt für die Schwierigkeitsstufe "Mittel"
 * @param difficultButton   // Buttonobjekt für die Schwierigkeitsstufe "Schwierig"
 * @param startButton       // Buttonobjekt um das Spiel zu starten
 * @param ctx               // Canvas Context zur Weitergabe
 * @param canvas            // Canvas Objekt zur Weitergabe
 */
function onMouseMove(e, easyButton, mediumButton, difficultButton, startButton, ctx, canvas) {

    // Erfassen der Mausposition
    let boundingCanvas = document.getElementById("space-race").getBoundingClientRect();
    let mouseX = e.clientX - boundingCanvas.left;
    let mouseY = e.clientY - boundingCanvas.top;

    // Check ob Maus auf einem Button liegt oder nicht
    if (mouseX > easyButton.x && mouseX < easyButton.x + easyButton.width && 
        mouseY > easyButton.y && mouseY < easyButton.y + easyButton.height) {
        // Cursor ändern
        canvas.style.cursor = 'pointer';
    } else if (mouseX > mediumButton.x && mouseX < mediumButton.x + mediumButton.width && 
               mouseY > mediumButton.y && mouseY < mediumButton.y + mediumButton.height) {
        // Cursor ändern
        canvas.style.cursor = 'pointer';
    } else if (mouseX > difficultButton.x && mouseX < difficultButton.x + difficultButton.width && 
               mouseY > difficultButton.y && mouseY < difficultButton.y + difficultButton.height) {
        // Cursor ändern
        canvas.style.cursor = 'pointer';
    } else if (mouseX > startButton.x && mouseX < startButton.x + startButton.width && 
               mouseY > startButton.y && mouseY < startButton.y + startButton.height) {
        // Cursor ändern
        canvas.style.cursor = 'pointer';
    } else {
        canvas.style.cursor = 'default';
    }
}

/**
 * Funktion zum Setzen des Schwierigkeitsgrads und für das Starten des Spiels, sofern ein 
 * Schwierigkeitsgrad gesetzt ist
 * @param e                 // Event um die Mausposition zu erhalten 
 * @param easyButton        // Buttonobjekt für die Schwierigkeitsgrad "Leicht"  
 * @param mediumButton      // Buttonobjekt für die Schwierigkeitsgrad "Mittel"
 * @param difficultButton   // Buttonobjekt für die Schwierigkeitsgrad "Schwierig"
 * @param startButton       // Buttonobjekt um das Spiel zu starten
 * @param ctx               // Canvas Context zur Weitergabe
 * @param canvas            // Canvas Objekt zur Weitergabe
 */
function setDifficulty(e, easyButton, mediumButton, difficultButton, startButton, ctx, canvas) {
    // Erfassen der Mausposition
    let boundingCanvas = document.getElementById("space-race").getBoundingClientRect();
    let mouseX = e.clientX - boundingCanvas.left;
    let mouseY = e.clientY - boundingCanvas.top;

    // Check ob Maus auf einem Button liegt oder nicht
    if (mouseX > easyButton.x && mouseX < easyButton.x + easyButton.width && 
        mouseY > easyButton.y && mouseY < easyButton.y + easyButton.height) {
        // Schwierigkeitsstufe setzen
        difficultyLevel = easy;
        // Gewählten Button farblich abheben
        easyButton.strokeStyle = '#f00';
        mediumButton.strokeStyle = '#000';
        difficultButton.strokeStyle = '#000';
        easyButton.draw(ctx);
        mediumButton.draw(ctx);
        difficultButton.draw(ctx);
    } else if (mouseX > mediumButton.x && mouseX < mediumButton.x + mediumButton.width && 
               mouseY > mediumButton.y && mouseY < mediumButton.y + mediumButton.height) {
        // Schwierigkeitsstufe setzen
        difficultyLevel = medium;
        easyButton.strokeStyle = '#000';
        mediumButton.strokeStyle = '#f00';
        difficultButton.strokeStyle = '#000';
        easyButton.draw(ctx);
        mediumButton.draw(ctx);
        difficultButton.draw(ctx);
    } else if (mouseX > difficultButton.x && mouseX < difficultButton.x + difficultButton.width && 
               mouseY > difficultButton.y && mouseY < difficultButton.y + difficultButton.height) {
        // Schwierigkeitsstufe setzen
        difficultyLevel = difficult;
        easyButton.strokeStyle = '#000';
        mediumButton.strokeStyle = '#000';
        difficultButton.strokeStyle = '#f00';
        easyButton.draw(ctx);
        mediumButton.draw(ctx);
        difficultButton.draw(ctx);
    } else if (mouseX > startButton.x && mouseX < startButton.x + startButton.width && 
               mouseY > startButton.y && mouseY < startButton.y + startButton.height) {
            // Check ob eine Schwierigkeitsstufe gesetzt ist
            // Wenn keine gesetzt wurde, Warnung ausgeben, sonst Spiel starten
            if (difficultyLevel==none) {
                alert("Bitte wählen Sie einen Schwierigkeitsgrad!");
            } else {
                startGame(difficultyLevel, ctx, canvas);
            }
    } else {
        // Schwierigkeitsstufe setzen
        difficultyLevel = none;
        easyButton.strokeStyle = '#000';
        mediumButton.strokeStyle = '#000';
        difficultButton.strokeStyle = '#000';
        easyButton.draw(ctx);
        mediumButton.draw(ctx);
        difficultButton.draw(ctx);

    }
}
