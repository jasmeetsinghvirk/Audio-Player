var songs = {
    "5 Taara - Diljit Dosanjh.mp3": "poster1.jpg",
    "Khaab - Akhil.mp3": "poster2.jpg",
    "Qismat - Ammy Virk.mp3": "poster3.jpg",
    "Soch - Hardy Sandhu.mp3": "poster4.jpg",
    "Wakhra Swag - Badshah.mp3": "poster5.jpg"
}

var song = new Audio();
var currentSong = 0;

window.onload = loadSong;

function loadSong() {

    var songTitle = document.getElementById("songTitle");
    var songSlider = document.getElementById("songSlider");
    var currentTime = document.getElementById("currentTime");
    var duration = document.getElementById("duration");
    var nextSongTitle = document.getElementById("nextSongTitle");
    var songPoster = document.getElementById("songPoster");
    song.src = "songs/" + Object.keys(songs)[currentSong];
    songPoster.src = "poster/" + Object.values(songs)[currentSong];
    songTitle.textContent = (currentSong + 1) + ". " + Object.keys(songs)[currentSong];
    nextSongTitle.innerHTML = "<b>Next Song: </b>" + Object.keys(songs)[currentSong + 1 % Object.keys(songs).length];
    song.playbackRate = 1;
    song.play();
    document.getElementById("mainPlayer").style.backgroundImage = "url('/blur-images/" + Object.values(songs)[currentSong] + "')";
    document.getElementById("mainPlayer").style.backgroundSize = "cover"

    setTimeout(showDuration, 1000);
}

setInterval(updateSongSlider, 1000);

function updateSongSlider() {
    var c = Math.round(song.currentTime);
    songSlider.value = c;
    currentTime.textContent = convertTime(c);
    if (song.ended) {
        next();
    }

}

function convertTime(secs) {
    var min = Math.floor(secs / 60);
    var sec = secs % 60;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    return (min + ":" + sec);
}

function showDuration() {
    var d = Math.floor(song.duration);
    songSlider.setAttribute("max", d);
    duration.textContent = convertTime(d);
}

function playOrPauseSong(img) {
    song.playbackRate = 1;
    if (song.paused) {
        song.play();
        img.src = "images/pause.png";
    } else {
        song.pause();
        img.src = "images/play.png";
    }
}

function next() {
    currentSong = (currentSong + 1) % Object.keys(songs).length;
    loadSong();
}

function previous() {
    currentSong--;
    currentSong = (currentSong < 0) ? Object.keys(songs).length - 1 : currentSong;
    loadSong();

}

function seekSong() {
    song.currentTime = songSlider.value;
    currentTime.textContent = convertTime(song.currentTime);
}

function adjustvolume(val) {
    var volumeSlider = document.getElementById("volumeSlider");
    song.volume = val / 100;
}

function increasePlaybackRate() {
    song.currentTime += 10;
}

function decreasePlaybackRate() {
    song.currentTime -= 10;
}