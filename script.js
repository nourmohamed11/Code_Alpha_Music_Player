document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    const volumeControl = document.getElementById('volume-control');
    const searchBar = document.getElementById('search-bar');
    const playlist = document.getElementById('playlist');
    const categories = document.querySelectorAll('.categories li');

    let currentTrackIndex = 0;
    let tracks = [
        { title: "Song 1", src: "music/song1.mp3", category: "Pop" },
        { title: "Song 2", src: "music/song2.mp3", category: "Rock" },
        { title: "Song 3", src: "music/song3.mp3", category: "Jazz" },
        { title: "Song 4", src: "music/song4.mp3", category: "Classical" }
    ];

    function loadTrack(index) {
        audioPlayer.src = tracks[index].src;
        audioPlayer.load();
    }

    function playTrack() {
        audioPlayer.play();
    }

    function pauseTrack() {
        audioPlayer.pause();
    }

    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        playTrack();
    }

    function prevTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
        playTrack();
    }

    function updateVolume() {
        audioPlayer.volume = volumeControl.value;
    }

    function filterTracks(searchTerm) {
        const filteredTracks = tracks.filter(track => 
            track.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        displayTracks(filteredTracks);
    }

    function displayTracks(tracksToDisplay) {
        playlist.innerHTML = '';
        tracksToDisplay.forEach((track, index) => {
            const trackItem = document.createElement('li');
            trackItem.textContent = track.title;
            trackItem.addEventListener('click', () => {
                currentTrackIndex = index;
                loadTrack(currentTrackIndex);
                playTrack();
            });
            playlist.appendChild(trackItem);
        });
    }

    playButton.addEventListener('click', playTrack);
    pauseButton.addEventListener('click', pauseTrack);
    nextButton.addEventListener('click', nextTrack);
    prevButton.addEventListener('click', prevTrack);
    volumeControl.addEventListener('input', updateVolume);
    searchBar.addEventListener('input', (e) => filterTracks(e.target.value));

    categories.forEach(category => {
        category.addEventListener('click', () => {
            const selectedCategory = category.textContent;
            const filteredTracks = selectedCategory === 'All' 
                ? tracks 
                : tracks.filter(track => track.category === selectedCategory);
            displayTracks(filteredTracks);
        });
    });

    // Load the first track
    loadTrack(currentTrackIndex);
    displayTracks(tracks);
});
