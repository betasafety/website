function generateRandomOrderVideoArray() {
    // Create an array of numbers from 1 to 10
    const arr = [0, 1, 2];
    
    // Shuffle the array using the Fisher-Yates algorithm
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
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
}

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
    if(videoPaused == true){
        videoElement.pause();
    } else {
        videoElement.play();
    }
});

// Mobile touch events (for swipe up/down)
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
    if(videoPaused == true){
        videoElement.pause();
    } else {
        videoElement.play();
    }
});

document.addEventListener('click', (event) => {
    if(videoPaused == true) {
        videoElement.play();
        videoPaused = false;
        PausedElement.hidden = true;
    } else {
        videoElement.pause();
        videoPaused = true;
        PausedElement.hidden = false;
    }
});
