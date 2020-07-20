'use strict';

// Gets a random number 0 - 8
function selectRandom() {
    let i = Math.floor(Math.random() * 8)
    return i;
}

// Sets the monies
function setMoney(newMoney) {
    app.money = newMoney;
}

// Sets the betties
function setBet(newBet) {
    app.bet = newBet;
}

// Sets the line-ies
function setLines(newLines) {
    app.lines = newLines;
}

// Generates the reelies
function generateReels() {
    let reel = Array(10);

    for (let i = 0; i < 8; i++) {
        reel[i] = app.elements[selectRandom()];
    }

    // Repeat first two elements to simulate reel
    reel[8] = reel[0];
    reel[9] = reel[1];

    return reel;
}

// Animates the reels
function animate() {
    let reels = document.getElementsByClassName("reel");

    for (let i = 0; i < reels.length; i++) {
        reels[i].classList.remove("shake");
        void reels[i].offsetWidth;
        reels[i].classList.add("shake");
    }
}

// Loads the cells with results
function spin() {

    // Generate new reels
    app.reel1 = generateReels();
    app.reel2 = generateReels();
    app.reel3 = generateReels();

    // Wee
    animate();

    // Reel 1
    app.pos = selectRandom();
    app.results[0] = app.reel1[app.pos];
    app.results[1] = app.reel1[app.pos + 1];
    app.results[2] = app.reel1[app.pos + 2];

    // Reel 2
    app.pos = selectRandom();
    app.results[3] = app.reel2[app.pos];
    app.results[4] = app.reel2[app.pos + 1];
    app.results[5] = app.reel2[app.pos + 2];

    // Reel 3
    app.pos = selectRandom();
    app.results[6] = app.reel3[app.pos];
    app.results[7] = app.reel3[app.pos + 1];
    app.results[8] = app.reel3[app.pos + 2];

    // Put results in cells
    let cells = document.getElementsByClassName("cell");

    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = app.results[i];
    }
}

// Checks for 3 matching elements and returns the win amount for that row
function checkRow(el1, el2, el3) {
    let payFactor = 1;
    let lineWin = 0;

    if (el1 === el2 && el1 === el3) {
        payFactor = app.payFactors[app.elements.indexOf(el1)];
        lineWin += (app.bet * app.lines * payFactor);
    }

    return lineWin;
}

// Need to refactor later. Repetitive. Ugly.
function checkWin(lines) {
    let totalWin = 0;

    switch (lines) {
        case 1:
            totalWin += checkRow(app.results[1], app.results[4], app.results[7]);
            break;
        case 3:
            totalWin += checkRow(app.results[0], app.results[3], app.results[6]);
            totalWin += checkRow(app.results[1], app.results[4], app.results[7]);
            totalWin += checkRow(app.results[2], app.results[5], app.results[8]);
            break;
        case 5:
            totalWin += checkRow(app.results[0], app.results[3], app.results[6]);
            totalWin += checkRow(app.results[1], app.results[4], app.results[7]);
            totalWin += checkRow(app.results[2], app.results[5], app.results[8]);
            totalWin += checkRow(app.results[0], app.results[4], app.results[8]);
            totalWin += checkRow(app.results[2], app.results[4], app.results[6]);
            break;
        default:
            totalWin = 0;
            break;
    }

    if (totalWin > 0) {
        document.getElementById("win_or_lose").innerHTML = `WINNER! Total Payout: ${totalWin}`;
        setMoney(app.money + totalWin);
    }
    else {
        document.getElementById("win_or_lose").innerHTML = `LOSE. Please play again.`
    }
}