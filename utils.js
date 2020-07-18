'use strict';

function setMoney(newMoney) {
    app.money = newMoney;
    document.getElementById("money").innerHTML = `Your money: ${app.money}`;
}

function setBet(newBet) {
    app.bet = newBet;
    document.getElementById("bet").innerHTML = `Betting: ${app.bet}`;
}

function setLines(newLines) {
    app.lines = newLines;
    document.getElementById("lines").innerHTML = `# of Lines: ${app.lines}`
}

function spin() {
    // Reel 1
    app.pos = selectStartPos();
    app.results[0] = app.reel[app.pos];
    app.results[3] = app.reel[app.pos + 1];
    app.results[6] = app.reel[app.pos + 2];

    // Reel 2
    app.pos = selectStartPos();
    app.results[1] = app.reel[app.pos];
    app.results[4] = app.reel[app.pos + 1];
    app.results[7] = app.reel[app.pos + 2];

    // Reel 3
    app.pos = selectStartPos();
    app.results[2] = app.reel[app.pos];
    app.results[5] = app.reel[app.pos + 1];
    app.results[8] = app.reel[app.pos + 2];

    // Put results in cells
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = app.results[i];
    }
}

setMoney(10000);
setBet(5);
setLines(1);