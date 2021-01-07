// Konstanten für die Angabe zur aktuellen Seite
const pageOne = 1;
const pageThree = 3;

// Initialisierung für die Angabe zum Level
var difficultyLevel = 0;

// Ausführen der Startfunktion auf das fertige Laden der Seite
window.onload = function() { startNewGame(); }

/**
 * Funktion um den Startbildschirm anzuzeigen
 */
function startNewGame() {
    console.log("halloooo");
    // Canvas Object
    /** @type {HTMLCanvasElement} */
    var canvas = document.getElementById("space-race");
    var ctx = canvas.getContext("2d");

    // Style anhand der nummerischen Seitenangabe zu wechseln
    changeStyle(pageOne, canvas);
    var buttons = drawGameStartPage(ctx);

    canvas.addEventListener("click", function() {
        setDifficulty(event, buttons.easyButton, buttons.mediumButton, 
            buttons.difficultButton, buttons.startButton, ctx, canvas)});

}

/**
 * Funktion um den Style des Canvas festzulegen
 *  @param page     // Numerische Angabe von welche Seite her die Funktion aufgerufen wird
 *  @param canvas   // Canvas Objekt um den Style anzupassen
 */
function changeStyle(page, canvas) {
    if (page==pageOne || page==pageThree) {
        canvas.style.backgroundColor = "white";
        canvas.style.border = "2px solid black";
    } else {
        canvas.style.backgroundColor = "black";
    }
}

/**
 * Alle Texte und Buttons (Rechtecke) mithilfe der Klassen erstellen und zeichnen
 * @param ctx   // Canvas Context um die Texte und Buttons (Rechtecke) zu zeichnen 
 */
function drawGameStartPage(ctx) {
    var titleText = new myText("Space Race", "50px Raleway", 150, 100);
    titleText.draw(ctx);

    var difficultyText = new myText("Schwierigkeitsgrad", "30px Raleway", 150, 150);
    difficultyText.draw(ctx);

    var easyButton = new myButton(50, 200, 150, 40, 2, "#000");
    easyButton.draw(ctx);
    var easyText = new myText("Leicht", "24px Raleway", 90, 230);
    easyText.draw(ctx);
    
    var mediumButton = new myButton(220, 200, 150, 40, 2, "#000");
    mediumButton.draw(ctx);
    var mediumText = new myText("Mittel", "24px Raleway", 260, 230);
    mediumText.draw(ctx);
    
    var difficultButton = new myButton(390, 200, 150, 40, 2, "#000");
    difficultButton.draw(ctx);
    var difficultText = new myText("Schwierig", "24px Raleway", 410, 230);
    difficultText.draw(ctx);

    var startButton = new myButton(150, 330, 300, 80, 2, "#000");
    startButton.draw(ctx);
    var startText = new myText("Start", "40px Raleway", 250, 380);
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
 * Funktion zu setzten des Schwirigkeitsgrads und für das starten des Spiels solange ein 
 * Schwierigkeitsgrad gesetzt ist
 * @param e                 // Event um die Mausposition zu erhalten 
 * @param easyButton        // Buttonobjekt für die Schwierigkeitsstuffe "Leicht"  
 * @param mediumButton      // Buttonobjekt für die Schwierigkeitsstuffe "Mittel"
 * @param difficultButton   // Buttonobjekt für die Schwierigkeitsstuffe "Schwierig"
 * @param startButton       // Buttonobjekt um das Spiel zu starten
 * @param ctx               // Canvas Context zur Weitergabe
 * @param canvas            // Canvas Objekt zur Weitergabe
 */
function setDifficulty(e, easyButton, mediumButton, difficultButton, startButton, ctx, canvas) {
    // Konstatendeklaration für die Schwierigkeitsstuffe
    const easy = 1;
    const medium = 2;
    const difficult = 3;
    const none = 0;

    // Erfassen der Mausposition
    let boundingCanvas = document.getElementById("space-race").getBoundingClientRect();
    let mouseX = e.clientX - boundingCanvas.left;
    let mouseY = e.clientY - boundingCanvas.top;

    // Check ob Maus auf einem Button liegt oder nicht
    if (mouseX > easyButton.x && mouseX < easyButton.x + easyButton.width && 
        mouseY > easyButton.y && mouseY < easyButton.y + easyButton.height) {
        // Schwierigkeitsstuffe setzten
        difficultyLevel = easy;
    } else if (mouseX > mediumButton.x && mouseX < mediumButton.x + mediumButton.width && 
               mouseY > mediumButton.y && mouseY < mediumButton.y + mediumButton.height) {
        // Schwierigkeitsstuffe setzten
        difficultyLevel = medium;
    } else if (mouseX > difficultButton.x && mouseX < difficultButton.x + difficultButton.width && 
               mouseY > difficultButton.y && mouseY < difficultButton.y + difficultButton.height) {
        // Schwierigkeitsstuffe setzten
        difficultyLevel = difficult;
    } else if (mouseX > startButton.x && mouseX < startButton.x + startButton.width && 
               mouseY > startButton.y && mouseY < startButton.y + startButton.height) {
            // Check ob eine Schwierigkeitsstuffe gesetzt ist
            // Wenn keine gesetzt wurde Warnung ausgeben, sonst Spiel starten
            if (difficultyLevel==none) {
                alert("Bitte wählen Sie einen Schwierigkeitsgrad!")
            } else {
                startGame(difficultyLevel, ctx, canvas);
            }
    } else {
        // Schwierigkeitsstuffe setzten
        difficultyLevel = none;
    }
}

function startGame(difficultyLevel) {
    // TODO
}

/**
 * Alle Texte und den Button (Rechtecke) für die Game Over Seite erstellen und zeichnen
 * @param ctx       // Canvas Context für das Zeichnen der Texte und des Buttons (Rechteck) 
 * @param winner    // Spieler Objekt welcher gewonnen hat für die Score anzeige
 * @param loser     // Spieler Objekt welcher verlohren hat für die Score anzeige
 */
function drawGameOverPage(ctx, winner, loser) {
    var gameOverText = new myText("Game Over", "50px Raleway", 160, 100);
    gameOverText.draw(ctx);

    var winnerText = new myText("Gewinner: " + winner.name, "30px Raleway", 144, 170);
    winnerText.draw(ctx);
    var winnerScoreText = new myText("Score: " + winner.score, "30px Raleway", 197, 200);
    winnerScoreText.draw(ctx);

    var loserText = new myText("Verlierer: " + loser.name, "30px Raleway", 155, 270);
    loserText.draw(ctx);
    var loserScoreText = new myText("Score: " + loser.score, "30px Raleway", 193, 300);
    loserScoreText.draw(ctx);

    var newGameButton = new myButton(200, 350, 200, 60, 2, "#000");
    newGameButton.draw(ctx);
    var newGameText = new myText("Neues Spiel", "28px Raleway", 218, 390);
    newGameText.draw(ctx);

    // Rückgabe des Buttons um ein neues Spiel zu starten
    return newGameButton;
 }

 /**
  * Funktion um ein neues Spiel zu starten, solange die Maus auf dem Button (Rechteck) 
  * lag während der Event ausgelöst wurde
  * @param e        // Event um die Position der Maus zu erhalten 
  * @param button   // Buttonobjekt um ein neues Spiel zu starten 
  */
 function newGameButton(e, button) {
    // Mausposition ermitteln
    let boundingCanvas = document.getElementById("space-race").getBoundingClientRect();
    let mouseX = e.clientX - boundingCanvas.left;
    let mouseY = e.clientY - boundingCanvas.top;

    if (mouseX > button.x && mouseX < button.x + button.width && 
        mouseY > button.y && mouseY < button.y + button.height) {
        // Neuses Spiel startne
        startNewGame();
    }
 }