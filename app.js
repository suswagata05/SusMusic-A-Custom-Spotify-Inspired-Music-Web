const audio = new Audio();
let currentFile = null;

let currentIndex = -1; //new1
const songs = Array.from(document.querySelectorAll('.card, .album')); //new1
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
// Bottom music bar elements
const albumImage = document.querySelector('.album-image');
const musicTitle = document.querySelector('.music-card-title');
const musicArtist = document.querySelector('.music-card-info');
const mainPlayToggle = document.getElementById('main-play-toggle');
const seekSlider = document.getElementById('seek-slider');


// Function to play a song
function playSong(filePath, clickedElement) {
    if (filePath === currentFile) {
        if (audio.paused) {
            audio.play();
            mainPlayToggle.classList.remove('fa-play-circle');
            mainPlayToggle.classList.add('fa-pause-circle');
        } else {
            audio.pause();
            mainPlayToggle.classList.remove('fa-pause-circle');
            mainPlayToggle.classList.add('fa-play-circle');
        }
        return;
    }



    currentFile = filePath;
    audio.src = filePath;
    audio.play();

    mainPlayToggle.classList.remove('fa-play-circle');
    mainPlayToggle.classList.add('fa-pause-circle');

    const title = clickedElement.getAttribute('data-title');
    const artist = clickedElement.getAttribute('data-artist');
    const cover = clickedElement.getAttribute('data-cover');

    musicTitle.innerText = title;
    musicArtist.innerText = artist;
    albumImage.src = cover;

    currentIndex = songs.indexOf(clickedElement);
}


// Clickable song cards
songs.forEach(el => {
    el.addEventListener('click', () => {
        const file = el.getAttribute('data-file');
        if (file) {
            playSong(file, el);
        }
    });
});

// Bottom center play/pause button
mainPlayToggle.addEventListener('click', () => {
    if (!audio.src) return;

    if (audio.paused) {
        audio.play();
        mainPlayToggle.classList.remove('fa-play-circle');
        mainPlayToggle.classList.add('fa-pause-circle');
    } else {
        audio.pause();
        mainPlayToggle.classList.remove('fa-pause-circle');
        mainPlayToggle.classList.add('fa-play-circle');
    }
});

// Next/Prev button functionality
nextButton.addEventListener('click', () => {
    if (currentIndex < songs.length - 1) {
        currentIndex++;
        const nextEl = songs[currentIndex];
        const file = nextEl.getAttribute('data-file');
        playSong(file, nextEl);
    }
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        const prevEl = songs[currentIndex];
        const file = prevEl.getAttribute('data-file');
        playSong(file, prevEl);
    }
});

// Seek bar
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        seekSlider.value = (audio.currentTime / audio.duration) * 100;
    }
});

seekSlider.addEventListener('input', () => {
    const seekTime = (seekSlider.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

const volumeSlider =document.querySelector('.right-progress-bar');

// Set initial volume
audio.volume = 0.8;

// Update volume based on slider
volumeSlider.addEventListener('input', () => {
    const volumeValue = volumeSlider.value / 100;
    audio.volume = volumeValue;
});













