let audio;
let questionIndex = 0;

const skipButton = document.getElementById("skip-button");
const presentsImage = document.getElementById("presents");
const videoContainer = document.querySelector(".video-container");

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

    audio = new Audio("https://media.githubusercontent.com/media/elfcrimes/elfcrimes.github.io/refs/heads/main/present_audio/intro.mp3");
    audio.play();

    audio.addEventListener("ended", () => {
        videoPicture.style.display = "none";
        presentsImage.style.display = "block";
        firstPresentButton.style.display = "block";
    });
}

function presentVideo(videoNum) {
    let presentVideoSrc = "";
    
    if (videoNum == 1) {
        presentVideoSrc = "https://media.githubusercontent.com/media/elfcrimes/elfcrimes.github.io/refs/heads/main/present_video/CFAA.mp4";
        presentButton = document.getElementById("present-1-button");
        nextPresentButton = document.getElementById("present-2-button");
    } else if (videoNum == 2) {
        presentVideoSrc = "https://media.githubusercontent.com/media/elfcrimes/elfcrimes.github.io/refs/heads/main/present_video/fair_use.mp4";
        presentButton = document.getElementById("present-2-button");
        nextPresentButton = document.getElementById("present-3-button");
    } else if (videoNum == 3) {
        presentVideoSrc = "https://media.githubusercontent.com/media/elfcrimes/elfcrimes.github.io/refs/heads/main/present_video/piracy.mp4";
        presentButton = document.getElementById("present-3-button");
        nextPresentButton = document.getElementById("present-4-button");
    } else if (videoNum == 4) {
        presentVideoSrc = "https://media.githubusercontent.com/media/elfcrimes/elfcrimes.github.io/refs/heads/main/present_video/DMCA.mp4";
        presentButton = document.getElementById("present-4-button");
        nextPresentButton = document.getElementById("present-5-button");
    } else if (videoNum == 5) {
        presentVideoSrc = "https://media.githubusercontent.com/media/elfcrimes/elfcrimes.github.io/refs/heads/main/present_video/section_230.mp4";
        presentButton = document.getElementById("present-5-button");
        nextPresentButton = document.getElementById("present-6-button");
    } else if (videoNum == 6) {
        presentVideoSrc = "https://media.githubusercontent.com/media/elfcrimes/elfcrimes.github.io/refs/heads/main/present_video/freedom_of_speech.mp4";
        presentButton = document.getElementById("present-6-button");
        nextPresentButton = document.getElementById("present-7-button");
    } else if (videoNum == 7) {
        presentVideoSrc = "https://media.githubusercontent.com/media/elfcrimes/elfcrimes.github.io/refs/heads/main/present_video/defamation.mp4";
        presentButton = document.getElementById("present-7-button");
        nextPresentButton = document.getElementById("present-8-button");
    } else if (videoNum == 8) {
        presentsImage.style.display = "none";
        presentButton.style.display = "none";
        nextPresentButton.style.display = "none";

        goToCoalPresent();
        return;
    }

    const videoElement = document.createElement("video");
    videoElement.src = presentVideoSrc;
    videoElement.classList.add("fullscreen-video"); // Apply the class for consistent styling
    videoElement.autoplay = true;
    videoElement.controls = true;

    document.body.appendChild(videoElement);

    presentsImage.style.display = "none";
    presentButton.style.display = "none";

    videoElement.addEventListener("ended", () => {
        document.body.removeChild(videoElement); // Remove the video after it ends
        showQuizPopup();
    });   
}

function goToCoalPresent() {
    videoPicture = document.getElementById("coal-picture");
    videoPicture.style.display = "block";

    audio = new Audio("https://media.githubusercontent.com/media/elfcrimes/elfcrimes.github.io/refs/heads/main/present_audio/coal_present.mp3");
    audio.play();

    audio.addEventListener("ended", () => {
        goToWinPage();
    });
}

function goToWinPage() {
    videoPicture.style.display = "none";
    videoPicture = document.getElementById("win-picture");
    videoPicture.style.display = "block";

    audio = new Audio("https://media.githubusercontent.com/media/elfcrimes/elfcrimes.github.io/refs/heads/main/present_audio/win.mp3");
    audio.play();
}

function skipAudio() {
    if (audio && !audio.ended) {
        audio.currentTime = audio.duration; // Skip to the end
    }

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
    clearFeedback()
    const optionsForm = document.getElementById("options-form");
    const selectedOption = optionsForm.querySelector('input[name="answer"]:checked');

    if (selectedOption) {
        const answerIndex = parseInt(selectedOption.value);

        if (answerIndex === questions[questionIndex].answer) {
            showFeedback("https://media.githubusercontent.com/media/elfcrimes/elfcrimes.github.io/refs/heads/main/images/correct.jpeg", "Correct!", true);
            setTimeout(() => {
                questionIndex += 1;
                closeQuizPopup();

                videoPicture.style.display = "none";
                skipButton.style.display = "none";
                presentsImage.style.display = "block";
                nextPresentButton.style.display = "block";
                
                clearFeedback();
            }, 1500);
        } else {
            showFeedback("https://media.githubusercontent.com/media/elfcrimes/elfcrimes.github.io/refs/heads/main/images/incorrect.jpeg", "Incorrect, please try again.", false);
        }
    } else {
        showFeedback("https://media.githubusercontent.com/media/elfcrimes/elfcrimes.github.io/refs/heads/main/images/shrug.jpeg", "Please select an answer.", false);
    }
}

// Function to display feedback image and message
function showFeedback(imageSrc, message, isCorrect) {
    const feedbackContainer = document.getElementById("feedback-container");
    feedbackContainer.innerHTML = `
        <img src="${imageSrc}" style="width: 300px; height: auto; display: block; margin: 0 auto; border-radius: 10px;">
        <p style="text-align: center; font-weight: bold; color: ${isCorrect ? 'green' : 'red'};">${message}</p>
    `;
    feedbackContainer.style.display = "block";
}

// Function to clear the feedback display
function clearFeedback() {
    const feedbackContainer = document.getElementById("feedback-container");
    feedbackContainer.style.display = "none";
    feedbackContainer.innerHTML = "";
}

function closeQuizPopup() {
    document.getElementById("quiz-popup").style.display = "none";
}

window.onload = function() {
    document.getElementById("welcome-screen").style.display = "block";
    document.getElementById("game-screen").style.display = "none";
}
