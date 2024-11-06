// Go from welcome screen to game screen
function startGame() {
    // Hide the welcome screen
    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('welcome-screen').style.display = 'none';
    
    // Show the game screen
    document.getElementById('game-screen').classList.add('active');
    document.getElementById('game-screen').style.display = 'block';
}

function presentVideo(video_num) {
    if (video_num == 1) {
        alert("hi");
    }
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