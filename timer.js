var today = new Date();
var time = today.getHours() + today.getMinutes() + today.getSeconds();
var timeText = document.getElementById("d-time");
var statusText = document.getElementById("d-status");
var cycles = 1;
var cstate = "p"; //initialize
var audiosource1 = document.getElementById("asrc_one");
var audiosource0 = document.getElementById("asrc_zero");


var alarmtime = setAlarm(cstate, today); // set initial state
console.log(alarmtime);

timeText.innerHTML = "Start!";
document.body.style.background = "linear-gradient(#2b5876, #4e4376)";

function tick() {
    var now = new Date();
    //console.log(Math.round(now.getTime() / 1000 - alarmtime.getTime() / 1000));
    if (Math.round(now.getTime() / 1000 - alarmtime.getTime() / 1000) == 0) {
        cycles += 1;
        cstate = stateSwitcher();
        console.log(cstate);
        alarmtime = setAlarm(cstate, now);
        store.set('experience', exp);

    }
    displayTimer(now);
}

function stateSwitcher() {
    if (cycles % 2 == 1) {
        return "p";
    } else if (cycles % 8 == 0) {
        return "l";
    } else {
        return "s";
    }
}

function displayTimer(ctime) {
    var dtime = (alarmtime.getTime() - ctime.getTime()) / 1000; //time difference in seconds
    var dhours = Math.floor(dtime / 3600);
    dtime -= dhours * 3600;
    var dminutes = Math.floor(dtime / 60);
    dtime -= dminutes * 60;
    var dseconds = Math.round(dtime);
    //timeText.innerHTML = padZeroes(dhours) + ":" + padZeroes(dminutes) + ":" + padZeroes(dseconds);
    timeText.innerHTML =  padZeroes(dminutes) + " " + padZeroes(dseconds);
}

function padZeroes(x) {
    if (x < 10) {
        return ("0" + x);
    } else {
        return (x + "");
    }
}

function setAlarm(state, ctime) {
    switch (state) {
        case "p":
            audiosource0.play();

            statusText.innerHTML = "Work";
            document.body.style.background = "-webkit-linear-gradient(#2b5876, #4e4376)";
            //document.body.style.backgroundColor = "#ff5e62";
            return new Date(ctime.getTime() + 25 * 60000);
            break;

        case "s":
            audiosource1.play();

            document.body.style.background = "-webkit-linear-gradient(#FF0099, #493240)";
            statusText.innerHTML = "Break";
            //document.body.style.backgroundColor = "#29ffc6";
            return new Date(ctime.getTime() + 5 * 60000);
            exp += 1;
            break;

        case "l":
            audiosource1.play();
            document.body.style.background = "-webkit-linear-gradient(#FF0099, #493240)";

            statusText.innerHTML = "Break";
            //document.body.style.backgroundColor = "#29ffc6";

            return new Date(ctime.getTime() + 15 * 60000);
            exp += 5;
            break;

        default:
            statusText.innerHTML = "Status Undefined";
            return ctime;
            break;
    }
}

setInterval(tick, 1000);
// ticking check
