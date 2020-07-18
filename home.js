'use strict';

let app = {
    reel: ["7", "777", "K", "Q", "J", "A", "BAR", "Fruit"],
    results: ["7", "7", "7", "777", "777", "777", "7", "7", "7"],
    money: 0,
    bet: 0,
    lines: 0
}

setMoney(100);
setBet(5);
setLines(1);

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

function selectStartPos() {
    let i = Math.floor(Math.random() * 8)
    return i;
}

function checkRow(el1, el2, el3) {
    if (el1 === el2 && el1 === el3) {
        return 1;
    }
    else {
        return 0;
    }
}

function checkWin(lines) {
    let linesWon = 0;

    switch (lines) {
        case 1:
            linesWon += checkRow(app.results[3], app.results[4], app.results[5]);
            break;
        case 3:
            linesWon += checkRow(app.results[0], app.results[1], app.results[2]);
            linesWon += checkRow(app.results[3], app.results[4], app.results[5]);
            linesWon += checkRow(app.results[6], app.results[7], app.results[8]);
            break;
        case 5:
            linesWon += checkRow(app.results[0], app.results[1], app.results[2]);
            linesWon += checkRow(app.results[3], app.results[4], app.results[5]);
            linesWon += checkRow(app.results[6], app.results[7], app.results[8]);
            linesWon += checkRow(app.results[0], app.results[4], app.results[8]);
            linesWon += checkRow(app.results[2], app.results[4], app.results[6]);
            break;
        default:
            linesWon = 0;
            break;
    }

    console.log(linesWon);
    return linesWon;
}

let betButtons = document.getElementsByClassName("bet_amt");

for (let i = 0; i < betButtons.length; i++) {
    betButtons[i].addEventListener("click", function(){
        setBet(Number.parseFloat(betButtons[i].innerHTML));
    })
}

let lineButtons = document.getElementsByClassName("line_amt");

for (let i = 0; i < lineButtons.length; i++) {
    lineButtons[i].addEventListener("click", function(){
        setLines(Number.parseFloat(lineButtons[i].innerHTML));
    })
}

document.getElementById("spin").addEventListener("click", function(){

    // check if money is available and take it
    if ((app.bet * app.lines) < app.money) {
        setMoney(app.money - (app.bet * app.lines))
        document.getElementById("money").innerHTML = "Your money: " + app.money;

        // Reel elements (spin!) Need to fix this later. This is ugly.
        let pos = selectStartPos();
        console.log(pos);


        if (pos < 6) {
            app.results[0] = app.reel[pos];
            app.results[3] = app.reel[pos + 1];
            app.results[6] = app.reel[pos + 2];
        }
        else if (pos === 6) {
            app.results[0] = app.reel[6];
            app.results[3] = app.reel[7];
            app.results[6] = app.reel[0];
        }
        else {
            app.results[0] = app.reel[7];
            app.results[3] = app.reel[0];
            app.results[6] = app.reel[1];
        }

        pos = selectStartPos();

        if (pos < 6) {
            app.results[1] = app.reel[pos];
            app.results[4] = app.reel[pos + 1];
            app.results[7] = app.reel[pos + 2];
        }
        else if (pos === 6) {
            app.results[1] = app.reel[6];
            app.results[4] = app.reel[7];
            app.results[7] = app.reel[0];
        }
        else {
            app.results[1] = app.reel[7];
            app.results[4] = app.reel[0];
            app.results[7] = app.reel[1];
        }

        pos = selectStartPos();

        if (pos < 6) {
            app.results[2] = app.reel[pos];
            app.results[5] = app.reel[pos + 1];
            app.results[8] = app.reel[pos + 2];
        }
        else if (pos === 6) {
            app.results[2] = app.reel[6];
            app.results[5] = app.reel[7];
            app.results[8] = app.reel[0];
        }
        else {
            app.results[2] = app.reel[7];
            app.results[5] = app.reel[0];
            app.results[8] = app.reel[1];
        }



        // Ugly handling of elements
        document.getElementById("first_element").innerHTML = app.results[0];
        document.getElementById("second_element").innerHTML = app.results[1];
        document.getElementById("third_element").innerHTML = app.results[2];
        document.getElementById("fourth_element").innerHTML = app.results[3];
        document.getElementById("fifth_element").innerHTML = app.results[4];
        document.getElementById("sixth_element").innerHTML = app.results[5];
        document.getElementById("seventh_element").innerHTML = app.results[6];
        document.getElementById("eighth_element").innerHTML = app.results[7];
        document.getElementById("ninth_element").innerHTML = app.results[8];

        let result = checkWin(app.lines);
        if (result > 0) {
            document.getElementById("win_or_lose").innerHTML = "WINNER!";
            setMoney(app.money + (result * app.bet))
        }
        else {
            document.getElementById("win_or_lose").innerHTML = "LOSE. Please play again.";
        }
    }
    else {
        alert("You don't have enough money for that!");
    }


})