let timeLeft = 60;
let timerActive = true;

let Timer = setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById('seconds').innerText = timeLeft;
    } else {
        clearInterval(Timer);
        alert('Time is up!');
        endTest();
    }
}, 1000);

let targetedText = document.getElementById('targeted-text').textContent.trim();
let userInput = document.getElementById('user-input');

userInput.addEventListener('input', () => {
    let typedText = userInput.value;
    let targetedSubText = targetedText.substring(0, typedText.length);

    if (typedText === targetedSubText) {
        userInput.style.color = 'green';
        if (typedText.length === targetedText.length) {
            endTest(); // Call endTest
        }
    } else {
        userInput.style.color = 'red';
    }
});

function endTest() {
    // Stop the timer
    clearInterval(Timer);

    // Calculate WPM
    let wordsPerMinute = document.getElementById('WPM');
    let accuracyDisplay = document.getElementById('Accuracy');

    let typedWords = userInput.value.trim().split(/\s+/).length;
    let elapsedTime = 60 - timeLeft; // Time in seconds
    let WPM = elapsedTime > 0 ? Math.round((typedWords / elapsedTime) * 60) : 0;

    // Calculate Accuracy
    const correctChars = [...userInput.value].filter(
        (char, i) => char === targetedText[i]
    ).length;
    const accuracy = Math.round(
        (correctChars / targetedText.length) * 100
    );

    // Display Results
    wordsPerMinute.innerText = WPM;
    accuracyDisplay.innerText = accuracy;

    // Disable input field
    userInput.disabled = true;
}
