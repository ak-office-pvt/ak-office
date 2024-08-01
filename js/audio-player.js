/*
    Key Functions:
  - loadAudioData(): Fetches song data from a JSON file.
  - populateAudioList(): Dynamically populates the audio  playlist.
  - playNextAudio(): Enables smooth transition to the next audio track.
  - updateActiveListItem(): Highlights the active item in the playlist.
  - updateSongInfo(): Updates the display with the current song title and artist.
  - updatePlayPauseButton(): Toggles the play/pause button icon dynamically.
  - handleSeeking(): Facilitates smooth seeking functionality.
  - handleVolumeControl(): Enables precise volume adjustment.
  - handleEndOfTrack(): Automatically transitions to the next track when
    the current one ends.
*/

document.addEventListener("DOMContentLoaded", function() {
    // Initialize variables
    var audio = document.getElementById("customAudio");
    var playPauseBtn = document.getElementById("playPauseBtn");
    var playPreviousBtn = document.getElementById("playPreviousBtn");
    var playNextBtn = document.getElementById("playNextBtn");
    var muteBtn = document.getElementById("muteBtn");
    var loopBtn = document.getElementById("loopBtn");
    var seekBar = document.getElementById("seekBar");
    var volumeBar = document.getElementById("volumeBar");
    var currentTime = document.getElementById("currentTime");
    var duration = document.getElementById("duration");
    var songTitleElement = document.getElementById("song_title");
    var songArtistElement = document.getElementById("song_artist");
    var audioList = document.getElementById("playlist");
    var currentAudioIndex = 0;
    var audioFiles = [];

    // Function to load audio data from JSON
    function loadAudioData() {
        var jsonFile = document.getElementById("custom_audio_player").getAttribute("data-json");
        fetch(jsonFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                audioFiles = data.audioFiles;
                populateAudioList();
                playAudioAtIndex(currentAudioIndex); // Play the first song on page load
            })
            .catch(error => {
                console.error('Error fetching audio data:', error);
            });
    }

    // Function to populate audio list
    function populateAudioList() {
        audioList.innerHTML = ''; // Clear existing list
        audioFiles.forEach((audio, index) => {
            var listItem = document.createElement("li");
            listItem.classList.add("song-info");
            var titleElement = document.createElement("h2");
            titleElement.textContent = audio.title;
            titleElement.classList.add("song-title");
            var artistElement = document.createElement("h3");
            artistElement.textContent = audio.artist;
            artistElement.classList.add("song-artist");
            listItem.appendChild(titleElement);
            listItem.appendChild(artistElement);
            audioList.appendChild(listItem);
        });
    }

    // Load audio data and populate the list
    loadAudioData();

    // Function to play audio at the specified index
    function playAudioAtIndex(index) {
        if (index >= 0 && index < audioFiles.length) {
            currentAudioIndex = index;
            audio.src = audioFiles[index].url;
            audio.load();
            audio.play();
            updatePlayPauseButton(); // Update play/pause button appearance
            updateActiveListItem(index); // Update active list item
            updateSongInfo(index); // Update song info

            // Scroll the active list item into view
            var activeListItem = audioList.getElementsByClassName("active")[0];
            activeListItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // Function to play next audio file
    function playNextAudio() {
        currentAudioIndex++;
        if (currentAudioIndex >= audioFiles.length) {
            currentAudioIndex = 0;
        }
        playAudioAtIndex(currentAudioIndex);
    }

    // Function to play previous audio file
    function playPreviousAudio() {
        currentAudioIndex--;
        if (currentAudioIndex < 0) {
            currentAudioIndex = audioFiles.length - 1;
        }
        playAudioAtIndex(currentAudioIndex);
    }

    // Function to update the active list item
    function updateActiveListItem(index) {
        var listItems = audioList.getElementsByTagName("li");
        for (var i = 0; i < listItems.length; i++) {
            if (i === index) {
                listItems[i].classList.add("active");
            } else {
                listItems[i].classList.remove("active");
            }
        }
    }

    // Function to update the song title and artist
    function updateSongInfo(index) {
        var currentAudio = audioFiles[index];
        songTitleElement.textContent = currentAudio.title;
        songArtistElement.textContent = currentAudio.artist;
    }

    // Function to toggle play/pause button icon
    function updatePlayPauseButton() {
        if (audio.paused) {
            playPauseBtn.innerHTML = "&#9658;"; // Play icon
        } else {
            playPauseBtn.innerHTML = "&#10074;&#10074;"; // Pause icon
        }
    }

    // Play the playlist when the play button is clicked
    playPauseBtn.addEventListener("click", function() {
        if (audio.paused) {
            // If paused, play the first song in the list unless a song has been selected from the list
            playAudioAtIndex(currentAudioIndex);
        } else {
            // If playing, pause the audio
            audio.pause();
            updatePlayPauseButton(); // Update play/pause button appearance
        }
    });

    // Handle click event for previous button
    playPreviousBtn.addEventListener("click", function() {
        playPreviousAudio();
    });

    // Handle click event for next button
    playNextBtn.addEventListener("click", function() {
        playNextAudio();
    });

    // Play audio when a list item is clicked
    audioList.addEventListener("click", function(e) {
        var listItem = e.target.closest("li");
        if (listItem) {
            currentAudioIndex = Array.from(listItem.parentNode.children).indexOf(listItem);
            playAudioAtIndex(currentAudioIndex);
        }
    });

    // Handle click event for mute button
    muteBtn.addEventListener("click", function() {
        audio.muted = !audio.muted;
        if (audio.muted) {
            muteBtn.innerHTML = "&#128263;"; // Muted icon
        } else {
            muteBtn.innerHTML = "&#128266;"; // Unmuted icon
        }
    });

    // Handle click event for loop button
    loopBtn.addEventListener("click", function() {
        audio.loop = !audio.loop;
        loopBtn.style.color = audio.loop ? "red" : "white";
    });

    // Update current time, duration, and seek bar as audio plays
    audio.addEventListener("timeupdate", function() {
        var currentTimeValue = audio.currentTime;
        var durationValue = audio.duration;
        if (!isNaN(durationValue)) {
            var minutes = Math.floor(currentTimeValue / 60);
            var seconds = Math.floor(currentTimeValue % 60);
            currentTime.innerHTML = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
            minutes = Math.floor(durationValue / 60);
            seconds = Math.floor(durationValue % 60);
            duration.innerHTML = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
            seekBar.value = (currentTimeValue / durationValue) * 100;
            var progress = (currentTimeValue / durationValue) * 100;
            var gradient = "linear-gradient(to right, #1E90FF 0%, #1E90FF " + progress + "%, #555 " + progress + "%, #555 100%)";
            seekBar.style.background = gradient;
        } else {
            currentTime.innerHTML = "0:00";
            duration.innerHTML = "0:00";
        }
    });

    // Handle seek bar input
    seekBar.addEventListener("input", function() {
        var seekTo = audio.duration * (seekBar.value / 100);
        audio.currentTime = seekTo;
    });

    // Handle volume bar input
    volumeBar.addEventListener("input", function() {
        audio.volume = volumeBar.value;
    });

    // Play the next audio file when the current audio ends
    audio.addEventListener("ended", function() {
        playNextAudio();
    });

});