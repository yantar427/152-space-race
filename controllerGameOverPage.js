/*
Modul 152, LB - Space Race
Enthält alle Funktionen um das Game zu zeichnen und zu verarbeiten sowie
die Weiterleitung zur Game Over Seite.
08.01.2021, Alessia Siegrist und Tanja Wyder
*/

/**
 * 
 * @param canvas        //  Canvas-Objekt zum Zeichnen
 * @param ctx           //  Canvas-Context zum Zeichnen
 * @param playerRed     //  Player-Objekt für Player Red
 * @param playerBlue    //  Player-Objekt für Player Blue
 * @param gameOver      //  Spielstatus
 */
function showFrame(canvas, ctx, playerRed, playerBlue, scorePlayerRedText, scorePlayerBlueText, livesPlayerRedText, livesPlayerBlueText, heartPlayerRed, heartPlayerBlue, obstacleArrays, gameOver, startTime, actualTime) {

    checkCollision(obstacleArrays, playerRed, playerBlue);
    // Positionen der Player prüfen und aktualisieren
    playerRed.updatePosition();
    playerBlue.updatePosition();

    // Canvas löschen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
    // Spieler-Objekte neu zeichnen
    drawGameObjects(ctx, playerRed, playerBlue, livesPlayerRedText, livesPlayerBlueText, 
        heartPlayerRed, heartPlayerBlue, scorePlayerRedText, scorePlayerBlueText);

    // Alle Hindernisse zeichnen
    obstacleArrays.forEach(obstacle => {
        obstacle.updatePosition(speed);
        obstacle.draw(ctx);
    })

    // Schwierigkeitsgrad abfragen für Geschwindigkeitserhöhung
    if (difficultyLevel == difficult) {
        // Aktuelle Zeit Setzten
        var currentTime = new Date();
        // Vergleichen ob Zeit bereits abgelaufen
        if (Math.abs(currentTime.getTime()-startTime.getTime()) >= 10000) {
            // Geschwindigkeit erhöhen
            increaseObstacleSpeed(obstacleArrays);
        }
    }

    // Anhand der zur Verfügung stehenden Leben überprüfen, ob das Spiel vorbei ist
    if (playerBlue.lives <= 0 || playerRed.lives <= 0) {
        gameOver = true;
    }
    
    // Wenn das Spiel vorbei ist
    if(gameOver){
        // Abfrage welcher Spieler gewonnen hat
        if (playerBlue.score > playerRed.score) {
            var winner = playerBlue;
            var loser = playerRed;
        } else if (playerBlue.score == playerRed.score) {
            if (playerBlue.lives > playerRed.lives) {
                var winner = playerBlue;
                var loser = playerRed;
            } else {
                var winner = playerRed;
                var loser = playerBlue;
            }
        } else {
            var winner = playerRed;
            var loser = playerBlue;
        }

        drawGameOverPage(canvas, ctx, winner, loser);
    } else {
        // Nächster Schritt der Animation
        window.requestAnimationFrame(function(actualTime){
            showFrame(canvas, ctx, playerRed, playerBlue, scorePlayerRedText, scorePlayerBlueText, livesPlayerRedText, livesPlayerBlueText, heartPlayerRed, heartPlayerBlue, obstacleArrays, gameOver, startTime, actualTime);
        })
    }
}

/**
 * Funktion um die Geschwindigkeit der Hindernisse zu erhöhen
 * @param obstacleArray // Array mit allen Hindernissen
 */
function increaseObstacleSpeed(obstacleArray) {
    var newSpeed = speed + 1;
    obstacleArray.forEach(obstacle => {
        obstacle.updatePosition(newSpeed);
    })
}

/**
 * Funktion, um ein neues Spiel zu starten
 * @param {*} difficultyLevel 
 * @param {*} ctx 
 * @param {*} canvas 
 */
function startGame(difficultyLevel, ctx, canvas) {

    // Canvas löschen
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Animation-Frame anfordern
    window.requestAnimationFrame(function(actualTime){
        let startTime = new Date();

        // Spieler Objekte erstellen
        let playerRed = new myPlayer(150, 450, '#f00', 'Player Red');
        let playerBlue = new myPlayer(430, 450, '#00f', 'Player Blue');

        // Spieler Leben Text Objekt erstellen
        var livesPlayerRedText = new myText(playerRed.lives, "30px Raleway", 20, 40, '#fff');
        var livesPlayerBlueText = new myText(playerBlue.lives, "30px Raleway", 530, 40, '#fff');

        // Herz Objekte erstellen
        let heartPlayerRed = new smallHeart(50, 30);
        let heartPlayerBlue = new smallHeart(560, 30);

        // Spieler Punktzahl Text Objekt erstellen
        var scorePlayerRedText = new myText(playerRed.score, "72px Raleway", 50, 480, '#fff');
        var scorePlayerBlueText = new myText(playerBlue.score, "72px Raleway", 500, 480, '#fff');

        // Anhand des Schwierigkeitsgrad Hindernisse (Kreise) erstellen
        if (difficultyLevel==easy) {
            var obstacleArrays = createObstaclesLowLevel(ctx);
        } else {
            var obstacleArrays = createObstaclesHighLevel(ctx);
        }

        // Spieler-Objekte zeichnen
        drawGameObjects(ctx, playerRed, playerBlue, livesPlayerRedText, livesPlayerBlueText, 
            heartPlayerRed, heartPlayerBlue, scorePlayerRedText, scorePlayerBlueText)
        
        // Hindernisse (Kreise) zeichnen
        obstacleArrays.forEach(obstacle => {
            obstacle.draw(ctx);                                                                             
        })

        // Event-Listener für Tastaturbewegungen setzen
        window.addEventListener('keydown', function(){keyDown(event, playerRed, playerBlue)});
        window.addEventListener('keyup', function(){keyUp(event, playerRed, playerBlue)});

        // Frame anzeigen
        showFrame(canvas, ctx, playerRed, playerBlue, scorePlayerRedText, scorePlayerBlueText, 
            livesPlayerRedText, livesPlayerBlueText, heartPlayerRed, heartPlayerBlue, 
            obstacleArrays, gameOver, startTime, actualTime);
    });
}

/**
 * Funktion, die prüft, ob ein Spieler mit einem Hindernis kollidiert. Im Kollisionsfall
 * wird die Anzahl Leben um 1 vermindert und das Spieler-Objekt in die Startposition
 * zurückversetzt.
 * @param obstacleArray     // Array mit allen Hindernissen
 * @param playerRed         // Spieler-Objekt
 * @param playerBlue        // Spieler-Objekt
 */
function checkCollision(obstacleArray, playerRed, playerBlue){
    obstacleArray.forEach(obstacle => {
        // Kollision mit Player Red?
        if (obstacle.x >= playerRed.x && obstacle.x <= playerRed.x + playerRed.width &&
            obstacle.y >= playerRed.y && obstacle.y <= playerRed.y + playerRed.height) {
            playerRed.lives--;
            playerRed.startPosition();
        // Kollision mit Player Blue?
        } else if(obstacle.x >= playerBlue.x && obstacle.x <= playerBlue.x + playerBlue.width &&
            obstacle.y >= playerBlue.y && obstacle.y <= playerBlue.y + playerBlue.height) {
            playerBlue.lives--;
            playerBlue.startPosition();
        }
    })
}

 /**
  * Funktion, um alle Game-Objekte zu zeichnen
  * @param ctx                  // Canvas-Context zum Zeichnen aller Objekte
  * @param playerRed            // Spieler-Objekt
  * @param playerBlue           // Spieler-Objekt
  * @param livesPlayerRedText   // Anzahl Leben Player Red
  * @param livesPlayerBlueText  // Anzahl Leben Player Blue
  * @param heartPlayerRed       // Herzsymbol
  * @param heartPlayerBlue      // Herzsymbol
  * @param scorePlayerRedText   // Spielstand Player Red
  * @param scorePlayerBlueText  // Spielstand Player Blue
  */
function drawGameObjects(ctx, playerRed, playerBlue, livesPlayerRedText, livesPlayerBlueText, 
    heartPlayerRed, heartPlayerBlue, scorePlayerRedText, scorePlayerBlueText) {

    playerRed.draw(ctx);
    playerBlue.draw(ctx);
    livesPlayerRedText.drawUpdatedText(ctx, playerRed.lives);
    livesPlayerBlueText.drawUpdatedText(ctx, playerBlue.lives);
    heartPlayerRed.draw(ctx);
    heartPlayerBlue.draw(ctx);
    scorePlayerRedText.drawUpdatedText(ctx, playerRed.score);
    scorePlayerBlueText.drawUpdatedText(ctx, playerBlue.score);
    drawDivider(ctx);

}

/**
 * Funktion, die kleine Abtrennung zwischen den Spielern zeichnet
 * @param ctx   // Canvas-Context zum Zeichnen
 */
function drawDivider(ctx){
    ctx.strokeStyle = '#bbb';
    ctx.lineWidth = '2';
    ctx.beginPath();
    ctx.moveTo(300, 500);
    ctx.lineTo(300, 420);
    ctx.closePath();
    ctx.stroke();
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

/**
 * Erstellen und Vorzeichnen aller Hindernisse (Kreise)
 * @param ctx // Canvas Kontext
 */
function createObstaclesLowLevel(ctx) {
    // Erstellen aller Hindernisse (Kreise)
    // True steht für die Richtung Links
    let obstacle1 = new myObstacle(470, 70, 3, true);
    let obstacle2 = new myObstacle(150, 200, 3, true);
    let obstacle3 = new myObstacle(50, 100, 3, true);
    let obstacle4 = new myObstacle(250, 300, 3, true);
    let obstacle5 = new myObstacle(150, 370, 3, true);
    let obstacle6 = new myObstacle(450, 340, 3, true);
    let obstacle7 = new myObstacle(310, 270, 3, true);
    let obstacle8 = new myObstacle(240, 90, 3, true);
    let obstacle9 = new myObstacle(380, 150, 3, true);
    let obstacle10 = new myObstacle(400, 240, 3, true);

    // Vorzeichnen aller Hindernisse (Kreise)
    obstacle1.draw(ctx);
    obstacle2.draw(ctx);
    obstacle3.draw(ctx);
    obstacle4.draw(ctx);
    obstacle5.draw(ctx);
    obstacle6.draw(ctx);
    obstacle7.draw(ctx);
    obstacle8.draw(ctx);
    obstacle9.draw(ctx);
    obstacle10.draw(ctx);

    // Eindimensionales Array mit allen Hindernissen (Kreise)
    var obstacleArray = [obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, 
                             obstacle6, obstacle7, obstacle8, obstacle9, obstacle10];

    // Finales Array zurückgeben
    return obstacleArray;
}

/**
 * Erstellen und Vorzeichnen aller Hindernisse (Kreise)
 * Gibt ein Array mit allen Hindernissen zurück
 * @param ctx   // Canvas Context 
 */
function createObstaclesHighLevel(ctx) {
    // Erstellen aller Hindernisse (Kreise)
    // False steht für die Richtung Rechts
    let obstacle11 = new myObstacle(550, 390, 3, false);
    let obstacle12 = new myObstacle(430, 250, 3, false);
    let obstacle13 = new myObstacle(50, 320, 3, false);
    let obstacle14 = new myObstacle(300, 380, 3, false);
    let obstacle15 = new myObstacle(580, 210, 3, false);
    let obstacle16 = new myObstacle(80, 300, 3, false);
    let obstacle17 = new myObstacle(280, 230, 3, false);
    let obstacle18 = new myObstacle(130, 140, 3, false);
    let obstacle19 = new myObstacle(510, 110, 3, false);
    let obstacle20 = new myObstacle(480, 280, 3, false);

    // Vorzeichnen aller Hindernisse (Kreise)
    obstacle11.draw(ctx);
    obstacle12.draw(ctx);
    obstacle13.draw(ctx);
    obstacle14.draw(ctx);
    obstacle15.draw(ctx);
    obstacle16.draw(ctx);
    obstacle17.draw(ctx);
    obstacle18.draw(ctx);
    obstacle19.draw(ctx);
    obstacle20.draw(ctx);

    // Eindimensionales Array mit allen Hindernissen (Kreise)
    var obstacleArray = [obstacle11, obstacle12, obstacle13, obstacle14, obstacle15, 
                         obstacle16, obstacle17, obstacle18, obstacle19, obstacle20];
    // Alle Hindernisse für die andere Richtung holen
    var obstacleArrayLowLevel = createObstaclesLowLevel(ctx)

    obstacleArrayLowLevel.forEach(element => {
        obstacleArray.push(element)
    })

    // Finales Array zurückgeben
    return obstacleArray;
}
