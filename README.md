# Element a: Praktische Prüfung

## Auftrag

Wir erstellen eine Abwandlung des Spiels Space Race, das zwei Spieler gleichzeitig an einem Computer spielen können. Dabei müssen die Spieler eine Figur durch einen Schwarm sich bewegender Punkte bewegen. 

Der Startpunkt für jeden Spieler ist am unteren Rand des Spielfelds und endet am oberen Rand. Die Spieler können ihre Figur nur in der Vertikalen bewegen, d.h. nach oben und unten.

Die Hindernisse bewegen sich horizontal, entweder nur von rechts nach links oder in beide Richtungen. 

Kollidiert ein Spieler mit einem Hindernis, verliert er ein Leben und kehrt zum Startpunkt zurück.
Erreicht ein Spieler den oberen Rand, gewinnt er einen Punkt und kehrt zum Startpunkt zurück.
Hat einer der Spieler alle Leben verloren, ist das Spiel beendet. Der Spieler mit der höheren Punktezahl hat gewonnen.

Es gibt drei verschiedene Schwierigkeitsgrade:

- Leicht: Die Hindernisse bewegen sich nur in eine Richtung.
- Mittel: Zwei Sets von Hindernissen (damit auch mehr Hindernisse), wovon sich ein Set von rechts nach links bewegt und das zweite in die andere Richtung.
- Schwierig: Zwei Sets von Hindernissen wie bei Schwierigkeitsgrad Mittel, zusätzlich erhöht sich die Geschwindigkeit im Intervall von 20 Sekunden

Den Schwierigkeitsgrad wählt man vor Beginn des Spiels.

GitHub Repository: https://github.com/yantar427/152-space-race