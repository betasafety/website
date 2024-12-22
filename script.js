function generateRandomOrderVideoArray() {
    const arr = [0, 1, 2]; // Array of video indices
    
    // Shuffle the array using the Fisher-Yates algorithm
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap the elements
    }
    
    return arr;
}

const randomArray = generateRandomOrderVideoArray();
console.log(randomArray);

let currentIndex = 0;

const VideoArray = [
    "Videos/1.mp4",
    "Videos/2.mp4",
    "Videos/3.mp4"
];

const videoElement = document.getElementById("VideoLoc");
const PausedElement = document.getElementById("PausedLoc");
let videoPaused = true;

playVideo();

function playVideo() {
    videoElement.src = VideoArray[randomArray[currentIndex]];
    if (!videoPaused) {
        videoElement.play(); // Play the video when switching
    }
}

// Handle wheel scrolling for video navigation
window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0 && currentIndex != randomArray.length - 1) {
        console.log("Wheel Down");
        currentIndex++;
        playVideo();
    } else if (event.deltaY < 0 && currentIndex != 0) {
        console.log("Wheel Up");
        currentIndex--;
        playVideo();
    }
});

// Handle mobile touch swipe events for video navigation
let touchStartY = 0; // Variable to track touch position

window.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY; // Store the starting Y position of the touch
});

window.addEventListener('touchend', (event) => {
    const touchEndY = event.changedTouches[0].clientY; // Get the Y position after touch ends
    
    if (touchStartY > touchEndY && currentIndex != randomArray.length - 1) {
        console.log("Swipe Down");
        currentIndex++;
        playVideo();
    } else if (touchStartY < touchEndY && currentIndex != 0) {
        console.log("Swipe Up");
        currentIndex--;
        playVideo();
    }
});

// Handle clicking to toggle pause/play state
document.addEventListener('click', () => {
    if (videoPaused) {
        videoElement.play();
        videoPaused = false;
        PausedElement.hidden = true; // Hide paused message
    } else {
        videoElement.pause();
        videoPaused = true;
        PausedElement.hidden = false; // Show paused message
    }
});
