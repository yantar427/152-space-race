/*
Modul 152, LB - Space Race
08.01.2021, Alessia Siegrist und Tanja Wyder
*/

// Konstanten für die Angabe zur aktuellen Seite
const pageOne = 1;
const pageTwo = 2;
const pageThree = 3;

// Initialisierung für die Angabe zum Level
var difficultyLevel = 0;

// Ausführen der Startfunktion auf das fertige Laden der Seite
window.onload = function() { startNewGame(); }

/**
 * 
 * @param canvas        //  Canvas-Objekt zum Zeichnen
 * @param ctx           //  Canvas-Context zum Zeichnen
 * @param playerRed     //  Player-Objekt für Player Red
 * @param playerBlue    //  Player-Objekt für Player Blue
 * @param gameOver      //  Spielstatus
 */
function showFrame(canvas, ctx, playerRed, playerBlue, gameOver) {
    // if(gameOver){
    //     return;
    // }

    // Positionen der Player prüfen und aktualisieren
    playerRed.updatePosition();
    playerBlue.updatePosition();

    // Canvas löschen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Player-Objekte neu zeichnen
    playerRed.draw(ctx);
    playerBlue.draw(ctx);

    // Nächster Schritt der Animation
    window.requestAnimationFrame(function(actualTime){
        showFrame(canvas, ctx, playerRed, playerBlue);
    })
}

/**
 * Funktion, um den Startbildschirm anzuzeigen
 */
function startNewGame() {
    console.log("halloooo");
    // Canvas Object
    /** @type {HTMLCanvasElement} */
    var canvas = document.getElementById("space-race");
    var ctx = canvas.getContext("2d");

    // Style anhand der numerischen Seitenangabe wechseln
    changeStyle(pageOne, canvas);
    var buttons = drawGameStartPage(ctx);

    canvas.addEventListener("click", function() {
        setDifficulty(event, buttons.easyButton, buttons.mediumButton, 
            buttons.difficultButton, buttons.startButton, ctx, canvas)});

}

/**
 * Funktion, um den Style des Canvas festzulegen
 *  @param page     // Numerische Angabe, von welche Seite her die Funktion aufgerufen wird
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
 * Funktion zum Setzen des Schwirigkeitsgrads und für das Starten des Spiels, sofern ein 
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
    // Konstatendeklaration für die Schwierigkeitsstufen
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
        // Schwierigkeitsstufe setzen
        difficultyLevel = easy;
    } else if (mouseX > mediumButton.x && mouseX < mediumButton.x + mediumButton.width && 
               mouseY > mediumButton.y && mouseY < mediumButton.y + mediumButton.height) {
        // Schwierigkeitsstufe setzen
        difficultyLevel = medium;
    } else if (mouseX > difficultButton.x && mouseX < difficultButton.x + difficultButton.width && 
               mouseY > difficultButton.y && mouseY < difficultButton.y + difficultButton.height) {
        // Schwierigkeitsstufe setzen
        difficultyLevel = difficult;
    } else if (mouseX > startButton.x && mouseX < startButton.x + startButton.width && 
               mouseY > startButton.y && mouseY < startButton.y + startButton.height) {
            // Check ob eine Schwierigkeitsstufe gesetzt ist
            // Wenn keine gesetzt wurde, Warnung ausgeben, sonst Spiel starten
            if (difficultyLevel==none) {
                alert("Bitte wählen Sie einen Schwierigkeitsgrad!")
            } else {
                startGame(difficultyLevel, ctx, canvas);
            }
    } else {
        // Schwierigkeitsstufe setzen
        difficultyLevel = none;
    }
}

function startGame(difficultyLevel, ctx, canvas) {

    window.requestAnimationFrame(function(actualTime){

        changeStyle(pageTwo, canvas);

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

/**
 * Alle Texte und den Button (Rechteck) für die Game-Over-Seite erstellen und zeichnen
 * @param ctx       // Canvas Context für das Zeichnen der Texte und des Buttons (Rechteck) 
 * @param winner    // Spieler-Objekt des Gewinners für die Score anzeigen
 * @param loser     // Spieler-Objekt des Verlierers für die Score anzeigen
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

    // Rückgabe des Buttons, um ein neues Spiel zu starten
    return newGameButton;
 }

 /**
  * Funktion, um ein neues Spiel zu starten, solange die Maus auf dem Button (Rechteck) 
  * lag, während der Event ausgelöst wurde
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
        // Neues Spiel starten
        startNewGame();
    }
 }

/**
 * Funktion zur Bewegung der Spielfiguren per Tastendruck
 * @param event         // Event Tastendruck
 * @param playerRed     // Spieler-Objekt von Player Red
 * @param playerBlue    // Spieler-Objekt von Player Blue
 */
 function keyDown(event, playerRed, playerBlue) {
    // Bewegung der Figur von Player Red (links)
    if (event.keyCode == 87) {
        // Taste 'w' für Aufwärtsbewegung
        playerRed.isUp = true;
        playerRed.isDown = false;
    } else if (event.keyCode == 83) {
        // Taste 's' für Abwärtsbewegung
        playerRed.isDown = true;
        playerRed.isUp = false;
    }
    // Bewegung der Figur von Player Blue (rechts)
    if (event.keyCode == 38) {
        // Taste 'Pfeil nach oben'für Aufwärtsbewegung
        playerBlue.isUp = true;
        playerBlue.isDown = false;
    } else if (event.keyCode == 40) {
        // Taste 'Pfeil nach unten'für Abwärtsbewegung
        playerBlue.isDown = true;
        playerBlue.isUp = false;
    }
     
}

/**
 * Funktion, um Bewegung der Spielfiguren zu stoppen
 * @param event         // Event Tastenfreigabe
 * @param playerRed     // Spieler-Objekt von Player Red
 * @param playerBlue    // Spieler-Objekt von Plsyer Blue
 */
function keyUp(event, playerRed, playerBlue) {
    // Bewegung der Figur von Player Red stoppen
    if (event.keyCode == 87) {
        // Taste 'w' freigegeben
        playerRed.isUp = false;
    } else if (event.keyCode == 83) {
        // Taste 's' freigegeben
        playerRed.isDown = false;
    }
    // Bewegung der Figur von Player Blue stoppen
    if (event.keyCode == 38) {
        // Taste 'Pfeil nach oben' freigegeben
        playerBlue.isUp = false;
    } else if (event.keyCode == 40) {
        // Taste 'Pfeil nach unten' freigegeben
        playerBlue.isDown = false;
    }
}
