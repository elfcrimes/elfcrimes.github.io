// Go from welcome screen to game screen
function startGame() {
    // Hide the welcome screen
    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('welcome-screen').style.display = 'none';
    
    // Show the game screen
    document.getElementById('game-screen').classList.add('active');
    document.getElementById('game-screen').style.display = 'block';
}

function presentVideo(videoNum) {
    const presentsImage = document.getElementById('presents');
    let presentAudio = '';
    let videoPicture = '';
    console.log(videoNum);
    
    if (videoNum == 1) {
        videoPicture = document.getElementById("present-1-picture");
        presentAudio = 'present_audio/CFAA.m4a';
        alert("Are you ready to join Noelle, Pim, and Pom?")
    }

    videoPicture.style.display = "block";
    presentsImage.style.display = "none";

    // Hide all buttons with the class 'present'
    const presentButtons = document.querySelectorAll('.present');
    presentButtons.forEach(button => button.style.display = 'none');

    const audio = new Audio(presentAudio);
    audio.play();

    audio.addEventListener('ended', () => {
        videoPicture.style.display = "none";
        presentsImage.style.display = "block";
    });
}

// Initialize screens
window.onload = function() {
    // Only show the welcome screen on load
    document.getElementById('welcome-screen').style.display = 'block';
    document.getElementById('game-screen').style.display = 'none';

    // document.getElementById('welcome-screen').style.display = 'none';
    // document.getElementById('game-screen').style.display = 'block';
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