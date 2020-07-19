'use strict';

let app = {
    reel: ["Fruit", "BAR", "J", "Q", "K", "A", "7", "777", "Fruit", "BAR"], // Repeated elements at the end to emulate reel
    results: ["7", "7", "7", "777", "777", "777", "7", "7", "7"],
    payFactors: [3, 10, 12, 15, 25, 50, 100, 250],
    money: 0,
    bet: 0,
    lines: 0,
    pos: null
}

function selectStartPos() {
    let i = Math.floor(Math.random() * 8)
    return i;
}

function checkRow(el1, el2, el3) {
    if (el1 === el2 && el1 === el3) {
        return true;
    } else {
        return false;
    }
}

// Need to refactor later. Repetitive. Ugly.
function checkWin(lines) {
    let payFactor = 1;
    let totalWin = 0;

    switch (lines) {
        case 1:
            document.getElementById("win_or_lose").innerHTML = "LOSE. Please play again.";
            if (checkRow(app.results[1], app.results[4], app.results[7])) {
                /* Find the index of the result in the app.reels array and use that index
                 *  to find the matching element in the app.payFactors array
                 */
                payFactor = app.payFactors[app.reel.indexOf(app.results[1])];
                totalWin += (app.bet * payFactor);
                document.getElementById("win_or_lose").innerHTML = "WINNER!";
            }
            setMoney(app.money + totalWin);
            break;
        case 3:
            document.getElementById("win_or_lose").innerHTML = "LOSE. Please play again.";
            if (checkRow(app.results[0], app.results[3], app.results[6])) {
                /* Find the index of the result in the app.reels array and use that index
                 *  to find the matching element in the app.payFactors array
                 */
                payFactor = app.payFactors[app.reel.indexOf(app.results[0])];
                totalWin += (app.bet * payFactor);
                document.getElementById("win_or_lose").innerHTML = "WINNER!";
            }
            if (checkRow(app.results[1], app.results[4], app.results[7])) {
                /* Find the index of the result in the app.reels array and use that index
                 *  to find the matching element in the app.payFactors array
                 */
                payFactor = app.payFactors[app.reel.indexOf(app.results[1])];
                totalWin += (app.bet * payFactor);
                document.getElementById("win_or_lose").innerHTML = "WINNER!";
            }
            if (checkRow(app.results[2], app.results[5], app.results[8])) {
                /* Find the index of the result in the app.reels array and use that index
                 *  to find the matching element in the app.payFactors array
                 */
                payFactor = app.payFactors[app.reel.indexOf(app.results[2])];
                totalWin += (app.bet * payFactor);
                document.getElementById("win_or_lose").innerHTML = "WINNER!";
            }
            setMoney(app.money + totalWin);
            break;
        case 5:
            document.getElementById("win_or_lose").innerHTML = "LOSE. Please play again.";
            if (checkRow(app.results[0], app.results[3], app.results[6])) {
                /* Find the index of the result in the app.reels array and use that index
                 *  to find the matching element in the app.payFactors array
                 */
                payFactor = app.payFactors[app.reel.indexOf(app.results[0])];
                totalWin += (app.bet * payFactor);
                document.getElementById("win_or_lose").innerHTML = "WINNER!";
                console.log("Pay factor: " + payFactor)
                console.log("Total win: " + totalWin)
            }
            if (checkRow(app.results[1], app.results[4], app.results[7])) {
                /* Find the index of the result in the app.reels array and use that index
                 *  to find the matching element in the app.payFactors array
                 */
                payFactor = app.payFactors[app.reel.indexOf(app.results[1])];
                totalWin += (app.bet * payFactor);
                document.getElementById("win_or_lose").innerHTML = "WINNER!";
                console.log("Pay factor: " + payFactor)
                console.log("Total win: " + totalWin)
            }
            if (checkRow(app.results[2], app.results[5], app.results[8])) {
                /* Find the index of the result in the app.reels array and use that index
                 *  to find the matching element in the app.payFactors array
                 */
                payFactor = app.payFactors[app.reel.indexOf(app.results[2])];
                totalWin += (app.bet * payFactor);
                document.getElementById("win_or_lose").innerHTML = "WINNER!";
                console.log("Pay factor: " + payFactor)
                console.log("Total win: " + totalWin)
            }
            if (checkRow(app.results[0], app.results[4], app.results[8])) {
                /* Find the index of the result in the app.reels array and use that index
                 *  to find the matching element in the app.payFactors array
                 */
                payFactor = app.payFactors[app.reel.indexOf(app.results[0])];
                totalWin += (app.bet * payFactor);
                document.getElementById("win_or_lose").innerHTML = "WINNER!";
                console.log("Pay factor: " + payFactor)
                console.log("Total win: " + totalWin)
            }
            if (checkRow(app.results[2], app.results[4], app.results[6])) {
                /* Find the index of the result in the app.reels array and use that index
                 *  to find the matching element in the app.payFactors array
                 */
                payFactor = app.payFactors[app.reel.indexOf(app.results[2])];
                totalWin += (app.bet * payFactor);
                document.getElementById("win_or_lose").innerHTML = "WINNER!";
                console.log("Pay factor: " + payFactor)
                console.log("Total win: " + totalWin)
            }
            setMoney(app.money + totalWin);
            break;
        default:
            document.getElementById("win_or_lose").innerHTML = "LOSE. Please play again.";
            break;
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