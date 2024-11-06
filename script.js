let audio;
let questionIndex = 0;

const skipButton = document.getElementById("skip-button");
const presentsImage = document.getElementById("presents");

let videoPicture = "";
let presentButton = "";
let nextPresentButton = "";


// Go from welcome screen to game screen
function startGame() {
    // Hide the welcome screen
    document.getElementById("welcome-screen").classList.remove("active");
    document.getElementById("welcome-screen").style.display = "none";

    // Show the game screen
    document.getElementById("game-screen").classList.add("active");
    document.getElementById("game-screen").style.display = "block";
    
    const presentsImage = document.getElementById("presents");
    presentsImage.style.display = "none";

    firstPresentButton = document.getElementById("present-1-button");
    firstPresentButton.style.display = "none";

    // Play the welcome video
    videoPicture = document.getElementById("intro-picture");
    videoPicture.style.display = "block";

    audio = new Audio("present_audio/intro.m4a");
    audio.play();

    audio.addEventListener("ended", () => {
        videoPicture.style.display = "none";
        presentsImage.style.display = "block";
        firstPresentButton.style.display = "block";
    });
}

function presentVideo(videoNum) {
    let presentAudio = "";
    console.log(videoNum);
    
    if (videoNum == 1) {
        videoPicture = document.getElementById("present-1-picture");
        presentAudio = "present_audio/CFAA.m4a";
        presentButton = document.getElementById("present-1-button");
        nextPresentButton = document.getElementById("present-2-button");
    } else if (videoNum == 2) {
        videoPicture = document.getElementById("present-2-picture");
        presentAudio = "present_audio/fair_use.m4a";
        presentButton = document.getElementById("present-2-button");
    }
    videoPicture.style.display = "block";
    skipButton.style.display = "block";
    presentsImage.style.display = "none";
    presentButton.style.display = "none";

    audio = new Audio(presentAudio);
    audio.play();

    audio.addEventListener("ended", () => {
        showQuizPopup();
    });
}

function skipAudio() {
    if (audio && !audio.ended) {
        audio.currentTime = audio.duration; // Skip to the end
    }

    const skipButton = document.getElementById("skip-button");
    skipButton.style.display = "none";
}

function showQuizPopup() {
    const question = questions[questionIndex];
    const questionTextElement = document.getElementById("question-text");
    const optionsForm = document.getElementById("options-form");

    questionTextElement.innerText = question.question;
    optionsForm.innerHTML = "";

    question.options.forEach((option, i) => {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = i;
        
        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        optionsForm.appendChild(label);
        optionsForm.appendChild(document.createElement("br"));
    });

    document.getElementById("quiz-popup").style.display = "flex";
}

function submitAnswer() {
    const optionsForm = document.getElementById("options-form");
    const selectedOption = optionsForm.querySelector('input[name="answer"]:checked');
    
    if (selectedOption) {
        const answerIndex = parseInt(selectedOption.value);

        if (answerIndex === questions[questionIndex].answer) {
            alert("Correct!");
            questionIndex += 1;
            closeQuizPopup();

            videoPicture.style.display = "none";
            skipButton.style.display = "none";
            presentsImage.style.display = "block";
            nextPresentButton.style.display = "block";
        } else {
            alert("Incorrect, please try again.");
        }
    } else {
        alert("Please select an answer.");
    }
}

function closeQuizPopup() {
    document.getElementById("quiz-popup").style.display = "none";
}

window.onload = function() {
    document.getElementById("welcome-screen").style.display = "block";
    document.getElementById("game-screen").style.display = "none";
}
