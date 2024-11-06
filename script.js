let audio;

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
    const presentsImage = document.getElementById("presents");
    const skipButton = document.getElementById("skip-button");
    let presentAudio = "";
    let videoPicture = "";
    let presentButton = "";
    let nextPresentButton = "";
    console.log(videoNum);
    
    if (videoNum == 1) {
        videoPicture = document.getElementById("present-1-picture");
        presentAudio = "present_audio/CFAA.m4a";
        // presentAudio = "present_audio/test.m4a";
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
        videoPicture.style.display = "none";
        skipButton.style.display = "none";
        presentsImage.style.display = "block";
        nextPresentButton.style.display = "block";
    });
}

function skipAudio() {
    if (audio && !audio.ended) {
        audio.currentTime = audio.duration; // Skip to the end
    }

    const skipButton = document.getElementById("skip-button");
    skipButton.style.display = "none";
}

// Initialize screens
window.onload = function() {
    document.getElementById("welcome-screen").style.display = "block";
    document.getElementById("game-screen").style.display = "none";

    // document.getElementById("welcome-screen").style.display = "none";
    // document.getElementById("game-screen").style.display = "block";
}

// // Pause and play the video, and change the button text
// function myFunction() {
//   if (video.paused) {
//     video.play();
//     btn.innerHTML = "Pause";
//   } else {
//     video.pause();
//     btn.innerHTML = "Play";
//   }
// }