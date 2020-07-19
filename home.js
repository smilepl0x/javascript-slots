'use strict';

let app = {
    elements: ["Fruit", "BAR", "J", "Q", "K", "A", "7", "777"],
    reel1: Array(10), // Each reel has 8 indexes + first 2 repeated to simulate reel
    reel2: Array(10),
    reel3: Array(10),
    results: ["7", "7", "7", "777", "777", "777", "7", "7", "7"],
    payFactors: [3, 10, 12, 15, 25, 50, 100, 250], // The order of these is important
    money: 0,
    bet: 0,
    lines: 0,
    pos: null
}

setMoney(1000);
setBet(5);
setLines(1);

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

// Bet buttons
let betButtons = document.getElementsByClassName("bet_amt");

for (let i = 0; i < betButtons.length; i++) {
    betButtons[i].addEventListener("click", function() {
        setBet(Number.parseFloat(betButtons[i].innerHTML));
    })
}

// Line buttons
let lineButtons = document.getElementsByClassName("line_amt");

for (let i = 0; i < lineButtons.length; i++) {
    lineButtons[i].addEventListener("click", function() {
        setLines(Number.parseFloat(lineButtons[i].innerHTML));
    })
}

// Pull the lever, Kronk
document.getElementById("spin").addEventListener("click", function() {

    // check if money is available and take it
    if ((app.bet * app.lines) <= app.money) {
        setMoney(app.money - (app.bet * app.lines))
        document.getElementById("money").innerHTML = "Your money: " + app.money;

        // Reel elements (spin!)
        spin();

        // Check if won
        checkWin(app.lines);

    } else {
        alert("You don't have enough money for that!");
    }


})