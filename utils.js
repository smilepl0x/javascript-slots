'use strict';

// Sets the monies
function setMoney(newMoney) {
    app.money = newMoney;
    document.getElementById("money").innerHTML = `Your money: ${app.money}`;
}

// Sets the betties
function setBet(newBet) {
    app.bet = newBet;
    document.getElementById("bet").innerHTML = `Betting: ${app.bet}`;
}

// Sets the line-ies
function setLines(newLines) {
    app.lines = newLines;
    document.getElementById("lines").innerHTML = `# of Lines: ${app.lines}`
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

    console.log(reel);
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

setMoney(1000);
setBet(5);
setLines(1);