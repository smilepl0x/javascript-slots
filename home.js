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

// Bet selector
let betSelections = document.getElementsByClassName("bet-select");

for (let i = 0; i < betSelections.length; i++) {
    betSelections[i].addEventListener("click", function() {
        console.log("clicked");
        document.getElementById("bet_selection").innerHTML = betSelections[i].innerHTML;
        setBet(Number.parseFloat(betSelections[i].innerHTML));
    })
}

// Line selector
let lineSelections = document.getElementsByClassName("line-select");

for (let i = 0; i < lineSelections.length; i++) {
    lineSelections[i].addEventListener("click", function() {
        document.getElementById("line_selection").innerHTML = lineSelections[i].innerHTML;
        setLines(Number.parseFloat(lineSelections[i].innerHTML));
    })
}

// Pull the lever, Kronk
document.getElementById("spin").addEventListener("click", function() {

    // check if money is available and take it
    if ((app.bet * app.lines) <= app.money) {
        setMoney(app.money - (app.bet * app.lines));

        // Reel elements (spin!)
        spin();

        // Check if won
        checkWin(app.lines);

    } else {
        alert("You don't have enough money for that!");
    }


})