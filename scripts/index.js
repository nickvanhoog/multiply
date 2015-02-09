window.SUCCESS_ALERTS = [
    "Nice!",
    "Ya!",
    "You're crushing it!"
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function assignProblemNumbers() {
    var leftNumValue, rightNumValue;
    leftNumValue = getRandomInt(10, 100);
    rightNumValue = getRandomInt(1, 10);
    leftNum = document.getElementById('left-num');
    rightNum = document.getElementById('right-num');

    leftNum.innerHTML = leftNumValue;
    rightNum.innerHTML = rightNumValue;
}

function formatTime(num) {
    if (num > 9) {
        return num;
    }

    return '0' + num.toString();
}

function incrementMinutes() {
    minCounter = document.getElementById('minutes');
    minCount = minCounter.innerHTML;
    if (!isNaN(minCount)) {
        var minCountValue = parseInt(minCount, 10);
        minCounter.innerHTML = formatTime(minCountValue + 1);
    }
}

function incrementSeconds() {
    secCounter = document.getElementById('seconds');
    secCount = secCounter.innerHTML;
    if (!isNaN(secCount)) {
        var secCountValue = parseInt(secCount, 10);
        if (secCountValue == 59) {
            incrementMinutes();
            secCounter.innerHTML = '00';
        }
        else {
            secCounter.innerHTML = formatTime(secCountValue + 1);
        }
    }
}

function updateTimer() {
    var csCounter, secCounter, minCounter;
    csCounter = document.getElementById('centiseconds');
    csCount = csCounter.innerHTML;
    if (!isNaN(csCount)) {
        var csCountValue = parseInt(csCount, 10);
        if (csCountValue == 99) {
            incrementSeconds();
            csCounter.innerHTML = '00';
        }
        else {
            csCounter.innerHTML = formatTime(csCountValue + 1);
        }
    }
}

function getCorrectAnswer() {
    var leftNum, rightNum;
    leftNum = parseInt(document.getElementById('left-num').innerHTML, 10);
    rightNum = parseInt(document.getElementById('right-num').innerHTML, 10);
    return leftNum * rightNum;
}

function randomSuccessAlert(choices) {
    var retval;
    var idx = getRandomInt(1, 10) % window.SUCCESS_ALERTS.length;
    return window.SUCCESS_ALERTS[idx];
}

function showAlert(className, alertText) {
    var alertElement = document.getElementById('alert-text');
    alertElement.className = className;
    alertElement.innerHTML = alertText;
}

function clearAnswer() {
    document.getElementById('answer-form').reset();
}

function resetTimer() {
    document.getElementById('centiseconds').innerHTML = '00';
    document.getElementById('seconds').innerHTML = '00';
    document.getElementById('minutes').innerHTML = '00';
}

function resetProblem() {
    // TODO: implement this
    assignProblemNumbers();
    clearAnswer();
    document.getElementById('answer-input').focus();
    resetTimer();
}

function checkAnswer(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    var answerText = document.getElementById('answer-input').value;
    if (isNaN(answerText)) {
        // showNanMessage();
        showAlert('error-alert', "That wasn't even a number!");
        clearAnswer();
        return;
    }

    var result, answerNum;
    answerNum = parseInt(answerText);
    result = getCorrectAnswer();
    if (result == answerNum) {
        // TODO: Somehow animate the clock stopping and the alert text appearing, or
        //       at least stagger them.
        resetProblem();
        showAlert('success-alert', randomSuccessAlert());
    }
    else {
        // TODO: remove alert, actually show a message

        alert('not correct');
    }
}

window.onload = function() {
    var answerForm = document.getElementById('answer-form');
    assignProblemNumbers();
    msTickInterval = setInterval(updateTimer, 10);
    document.getElementById('timer').onclick = function() {
        clearInterval(msTickInterval);
    }
    if (answerForm.addEventListener) {
        answerForm.addEventListener('submit', checkAnswer);
    }
    else if(answerForm.attachEvent) {
        answerForm.attachEvent('submit', checkAnswer);
    }
    else {
        answerForm.onSubmit = checkAnswer();
    }
    document.getElementById('answer-input').focus();
}
