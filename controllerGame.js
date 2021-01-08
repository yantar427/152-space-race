/*
Modul 152, LB - Space Race
Enthält alle Funktionen um die Game Over Seite zu zeichnen und zu verarbeiten sowie
die Weiterleitung zur Startseite
08.01.2021, Alessia Siegrist und Tanja Wyder
*/

/**
 * Alle Texte und den Button (Rechteck) für die Game-Over-Seite erstellen und zeichnen
 * @param canvas    // Canvas-Objekt zum Zeichnen
 * @param ctx       // Canvas Context für das Zeichnen der Texte und des Buttons (Rechteck) 
 * @param winner    // Spieler-Objekt des Gewinners für die Score anzeigen
 * @param loser     // Spieler-Objekt des Verlierers für die Score anzeigen
 */
function drawGameOverPage(canvas, ctx, winner, loser) {
    // Canvas leeren um die Game Over Seite zu zeichnen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Texte erstellen und zeichnen
    var gameOverText = new myText("Game Over", "50px Raleway", 160, 100);
    gameOverText.draw(ctx);

    // Gewinner Angaben erstellen und zeichnen
    var winnerText = new myText("Gewinner: " + winner.name, "30px Raleway", 144, 170);
    winnerText.draw(ctx);
    var winnerScoreText = new myText("Score: " + winner.score, "30px Raleway", 197, 200);
    winnerScoreText.draw(ctx);

    // Verliere Angaben erstellen und zeichen
    var loserText = new myText("Verlierer: " + loser.name, "30px Raleway", 155, 270);
    loserText.draw(ctx);
    var loserScoreText = new myText("Score: " + loser.score, "30px Raleway", 193, 300);
    loserScoreText.draw(ctx);

    // Button um neues Game zu starten erstellen und zeichnen
    var newGameButton = new myButton(200, 360, 200, 60, 2, "#000");
    newGameButton.draw(ctx);
    var newGameText = new myText("Neues Spiel", "28px Raleway", 218, 400);
    newGameText.draw(ctx);

    // Eventlistener für den Klick auf den Button erstellen
    canvas.addEventListener("click", function() {
        newGame(event, newGameButton, ctx, canvas);
    });

}

 /**
  * Funktion, um ein neues Spiel zu starten, solange die Maus auf dem Button (Rechteck) 
  * lag, während der Event ausgelöst wurde
  * @param e        // Event um die Position der Maus zu erhalten 
  * @param button   // Buttonobjekt um ein neues Spiel zu starten 
  * @param ctx      // Canvas Contex
  * @param canvas   // Canvas Objekt
  */
 function newGame(e, button, ctx, canvas) {
    // Mausposition ermitteln
    let boundingCanvas = document.getElementById("space-race").getBoundingClientRect();
    let mouseX = e.clientX - boundingCanvas.left;
    let mouseY = e.clientY - boundingCanvas.top;

    if (mouseX > button.x && mouseX < button.x + button.width && 
        mouseY > button.y && mouseY < button.y + button.height) {
        // Neues Spiel starten
        drawGameStartPage(ctx, canvas);
    }
 }
