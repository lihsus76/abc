document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('backgroundAudio');

    // --- Optional: Preload/cache first few songs ---
    const baseURL = 'https://cdn.jsdelivr.net/gh/lihsus76/music-library4panda@main/';
    window.audioCache = {
        cache: {},
        getCachedAudio(src) {
            if (!this.cache[src]) this.cache[src] = baseURL + src.replace(/^\.\/Audio\//, '');
            return this.cache[src];
        }
    };

    // Buttons
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseIcon = document.getElementById('playPauseIcon');
    const audioControl = document.getElementById('audioControl');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volumeSlider = document.getElementById('volumeSlider');

    // Playlist elements
    const playlistElement = document.getElementById('playlist');
    const nowPlayingTitle = document.getElementById('nowPlayingTitle');
    const nowPlayingArtist = document.getElementById('nowPlayingArtist');
    const nowPlayingElement = document.getElementById('nowPlaying');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');
    const currentTimeElement = document.getElementById('currentTime');
    const totalTimeElement = document.getElementById('totalTime');

    // Sidebar & categories
    const playlistSidebar = document.getElementById('playlistSidebar');
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const englishSongs = document.getElementById('englishSongs');
    const nepaliSongs = document.getElementById('nepaliSongs');
    const hindiSongs = document.getElementById('hindiSongs');


    // Playlist data
    const playlist = [
        // English Songs
        {
            title: "Iris",
            artist: "Goo Goo Dolls",
            src: "./Audio/english/Iris.mp3",
            category: "english",
            duration: "0:00"
        },
        {
            title: "Blue",
            artist: "Yung Kai",
            src: "./Audio/english/blue.mp3",
            category: "english",
            duration: "0:00"
        },
        {
            title: "About You",
            artist: "The 1975",
            src: "./Audio/english/About-You.mp3",
            category: "english",
            duration: "0:00"
        },
        {
            title: "Rewrite The Stars",
            artist: "Anne-Marie & James Arthur",
            src: "./Audio/english/Rewrite-the-stars.mp3",
            category: "english",
            duration: "0:00"
        },
        {
            title: "Line Without a Hook",
            artist: "Ricky Montgomery",
            src: "./Audio/english/line-without-a-hook .mp3",
            category: "english",
            duration: "0:00"
        },
        {
            title: "Photograph",
            artist: "Ed Sheeran",
            src: "./Audio/english/photograph.mp3",
            category: "english",
            duration: "0:00"
        },
        {
            title: "Every Breath You Take",
            artist: "The Police",
            src: "./Audio/english/every-breath-you-take.mp3",
            category: "english",
            duration: "0:00"
        },
        {
            title: "Strawberries & Cigarettes",
            artist: "Troye Sivan",
            src: "./Audio/english/strawberrie&cigarettes.mp3",
            category: "english",
            duration: "0:00"
        },
        {
            title: "Last Christmas",
            artist: "WHAM!",
            src: "./Audio/english/last-christmas.mp3",
            category: "english",
            duration: "0:00"
        },
        {
            title: "Treat You Better",
            artist: "Shawn Mendes",
            src: "./Audio/english/treat-you-better.mp3",
            category: "english",
            duration: "0:00"
        },
        {
            title: "A Thousand Years",
            artist: "Christina Perri",
            src: "./Audio/english/a-thousand-years.mp3",
            category: "english",
            duration: "0:00"
        },
        {
            title: "BIRDS OF A FEATHER",
            artist: "Billie Eilish",
            src: "./Audio/english/birds-of-a-feather.mp3",
            category: "english",
            duration: "0:00"
        },

        // Nepali Songs
        {
            title: "Timi nai Hau",
            artist: "Sabin Rai",
            src: "./Audio/nepali/timi-nai hau.mp3",
            category: "nepali",
            duration: "0:00"
        },
        {
            title: "Timi ra Ma",
            artist: "Salin Magar ft Deeya Gurung",
            src: "./Audio/nepali/timi-raa-maa.mp3",
            category: "nepali",
            duration: "0:00"
        },
        {
            title: "Basanta",
            artist: "Jptrockerz",
            src: "./Audio/nepali/Basanta.mp3",
            category: "nepali",
            duration: "0:00"
        },
        {
            title: "Sadhana",
            artist: "John C. Rai",
            src: "./Audio/nepali/Sadhana.mp3",
            category: "nepali",
            duration: "0:00"
        },
        {
            title: "Timi ra Ma",
            artist: "Dixita Karki",
            src: "./Audio/nepali/Timi-Ra-Ma.mp3",
            category: "nepali",
            duration: "0:00"
        },
        {
            title: "Timi Samu",
            artist: "Rodit Bhandari & Somiya Barali",
            src: "./Audio/nepali/Timi-Samu.mp3",
            category: "nepali",
            duration: "0:00"
        },
        {
            title: "Timi Samu (Female Verson)",
            artist: "Somea Baraili",
            src: "./Audio/nepali/timi-samu-female-verison.mp3",
            category: "nepali",
            duration: "0:00"
        },
        {
            title: "Nachaheko Hoina",
            artist: "The Edge Band",
            src: "./Audio/nepali/nachaheko-hoina.mp3",
            category: "nepali",
            duration: "0:00"
        },
        {
            title: "Mutu Dekhin",
            artist: "John C. Rai",
            src: "./Audio/nepali/Mutu-dekhin.mp3",
            category: "nepali",
            duration: "0:00"
        },
        // Hindi Song
        {
            title: "Ishq Di Baajiyaan",
            artist: "Diljit Dosanjh",
            src: "./Audio/hindi/ishq-di-baajiyaan.mp3",
            category: "hindi",
            duration: "0:00"
        },
        {
            title: "Tu Chale",
            artist: "ARIJIT SINGH, SHREYA GHOSHAL",
            src: "./Audio/hindi/tu-chale.mp3",
            category: "hindi",
            duration: "0:00"
        },
        {
            title: "Chaar Kadam",
            artist: "SHAAN, SHREYA GHOSHA",
            src: "./Audio/hindi/chaar-kadam.mp3",
            category: "hindi",
            duration: "0:00"
        },
        {
            title: "Nodivalandava",
            artist: "Armaan Malik, Shreya Ghoshal",
            src: "./Audio/hindi/Nodivalandava.mp3",
            category: "hindi",
            duration: "0:00"
        },
        {
            title: "Tu Jaane Na",
            artist: "Atif Aslam",
            src: "./Audio/hindi/tu-jane-na.mp3",
            category: "hindi",
            duration: "0:00"
        },
        {
            title: "Shukran Allah",
            artist: "Sonu Nigam, Shreya Ghoshal & Salim Merchant ",
            src: "./Audio/hindi/shukran-allah.mp3",
            category: "hindi",
            duration: "0:00"
        },
        {
            title: "Ishq Sufiyana",
            artist: "Kamal Khan",
            src: "./Audio/hindi/ishq-shufiyana.mp3",
            category: "hindi",
            duration: "0:00"
        },
        {
            title: "Pehli Nazar Mein",
            artist: "Atif Aslam",
            src: "./Audio/hindi/pehli-nazar-mein.mp3",
            category: "hindi",
            duration: "0:00"
        },
        {
            title: "Ye Tune Kya Kiya",
            artist: "Javed Bashir",
            src: "./Audio/hindi/ye-tune-kya-kiya.mp3",
            category: "hindi",
            duration: "0:00"
        },
        {
            title: "Khudya Khair",
            artist: "Soham Chakrabarthy, Akruti Kakkar, Monali",
            src: "./Audio/hindi/khudaya-khair.mp3",
            category: "hindi",
            duration: "0:00"
        },
        {
            title: "Naino Ne Baandhi",
            artist: "Yasser Desai",
            src: "./Audio/hindi/naino-ne-baandhi.mp3",
            category: "hindi",
            duration: "0:00"
        },
        {
            title: "Tere Ishq",
            artist: "Monu",
            src: "./Audio/hindi/tere-ishq.mp3",
            category: "hindi",
            duration: "0:00"
        },
        {
            title: "Hona Tha Pyar",
            artist: " Atif Aslam & Hadiqa Kiani",
            src: "./Audio/hindi/hona-tha-pyar.mp3",
            category: "hindi",
            duration: "0:00"
        },
        {
            title: "Humko Pyar Hua",
            artist: "Tulsi Kumar, KK",
            src: "./Audio/hindi/humko-pyar-hua.mp3",
            category: "hindi",
            duration: "0:00"
        },
        {
            title: "Teri Ore",
            artist: "Rahat Fateh Ali Khan & Shreya Ghoshal",
            src: "./Audio/hindi/teri-ore.mp3",
            category: "hindi",
            duration: "0:00"
        },
        {
            title: "Subhanallah",
            artist: "SREERAM, SHILPA RAO",
            src: "./Audio/hindi/subhanallah.mp3",
            category: "hindi",
            duration: "0:00"
        },
        {
            title: "Piya o re piya",
            artist: "Atif Aslam & Shreya Ghoshal",
            src: "./Audio/hindi/piya-o-re-piya.mp3",
            category: "hindi",
            duration: "0:00"
        }
    ];

    let currentSongIndex = 0;
    let isPlaying = false;

    // Helper: Format seconds as mm:ss
    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // --- UI Updates ---
    function updateButtons() {
        if (playPauseIcon) playPauseIcon.className = `fas ${isPlaying ? 'fa-pause' : 'fa-play'}`;
        if (audioControl) {
            const icon = audioControl.querySelector('i');
            if (icon) icon.className = `fas ${isPlaying ? 'fa-pause' : 'fa-play'}`;
        }
    }

    function updateNowPlaying() {
        const song = playlist[currentSongIndex];
        if (nowPlayingTitle) nowPlayingTitle.textContent = song.title;
        if (nowPlayingArtist) nowPlayingArtist.textContent = song.artist;
        if (nowPlayingElement) nowPlayingElement.classList.add('active');

        document.querySelectorAll('.category-song-item').forEach((item, index) => {
            item.classList.toggle('active', index === currentSongIndex);
        });
    }

    function updateProgress() {
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            if (progressBar) progressBar.style.width = percent + '%';
            if (currentTimeElement) currentTimeElement.textContent = formatTime(audio.currentTime);
            if (totalTimeElement) totalTimeElement.textContent = formatTime(audio.duration);
        }
    }

    // --- Play / Pause / Next / Prev ---
    function playSong(index) {
        currentSongIndex = index;
        const song = playlist[currentSongIndex];
        audio.src = window.audioCache.getCachedAudio(song.src);

        audio.play().then(() => {
            isPlaying = true;
            renderPlaylist();
            renderCategoryPlaylists();
            updateNowPlaying();
            updateButtons();
        }).catch(err => console.error('Playback error:', err));
    }

    function togglePlayPause() {
        if (!isPlaying) {
            if (!audio.src) playSong(currentSongIndex);
            else audio.play().then(() => { isPlaying = true; updateButtons(); }).catch(err => console.error(err));
        } else {
            audio.pause();
            isPlaying = false;
            updateButtons();
        }
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        playSong(currentSongIndex);
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        playSong(currentSongIndex);
    }

    // --- Render Playlists ---
    function renderPlaylist() {
        if (!playlistElement) return;
        playlistElement.innerHTML = '';
        playlist.forEach((song, index) => {
            const li = document.createElement('li');
            li.className = 'playlist-item';
            if (index === currentSongIndex) li.classList.add('active');
            li.innerHTML = `
                <i class="fas fa-music"></i>
                <div class="song-info">
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
                <div class="song-duration">${song.duration}</div>
            `;
            li.addEventListener('click', () => playSong(index));
            playlistElement.appendChild(li);
        });
    }

    function renderCategoryPlaylists() {
        if (!englishSongs || !nepaliSongs || !hindiSongs) return;
        englishSongs.innerHTML = nepaliSongs.innerHTML = hindiSongs.innerHTML = '';
        playlist.forEach((song, index) => {
            const li = document.createElement('li');
            li.className = 'category-song-item';
            if (index === currentSongIndex) li.classList.add('active');
            li.innerHTML = `
                <i class="fas fa-music"></i>
                <div class="song-info">
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
                <div class="song-duration">${song.duration}</div>
            `;
            li.addEventListener('click', () => playSong(index));
            if (song.category === 'english') englishSongs.appendChild(li);
            else if (song.category === 'nepali') nepaliSongs.appendChild(li);
            else if (song.category === 'hindi') hindiSongs.appendChild(li);
        });
    }

    // --- Sidebar Toggle ---
    function toggleSidebar() {
        if (!playlistSidebar || !sidebarToggleBtn) return;
        if (playlistSidebar.style.left === '0px') {
            playlistSidebar.style.left = '-280px';
            sidebarToggleBtn.querySelector('i').className = 'fas fa-chevron-right';
            sidebarToggleBtn.style.left = '0px';
        } else {
            playlistSidebar.style.left = '0px';
            sidebarToggleBtn.querySelector('i').className = 'fas fa-chevron-left';
            sidebarToggleBtn.style.left = '280px';
        }
    }

    // --- Event Listeners ---
    if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);
    if (audioControl) audioControl.addEventListener('click', togglePlayPause);
    if (prevBtn) prevBtn.addEventListener('click', prevSong);
    if (nextBtn) nextBtn.addEventListener('click', nextSong);
    if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', toggleSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleSidebar);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);

    if (volumeSlider) {
        volumeSlider.addEventListener('input', () => { audio.volume = volumeSlider.value; });
    }

    if (progressContainer) {
        progressContainer.addEventListener('click', function(e) {
            const width = this.clientWidth;
            const clickX = e.offsetX;
            audio.currentTime = (clickX / width) * audio.duration;
        });
    }

    // --- Auto Detect Duration ---
    async function getAudioDuration(url) {
        return new Promise(resolve => {
            const a = new Audio(url);
            a.addEventListener('loadedmetadata', () => resolve(formatTime(a.duration)));
            a.addEventListener('error', () => resolve('0:00'));
            setTimeout(() => resolve('0:00'), 10000);
        });
    }

    async function loadAudioDurations() {
        for (let i = 0; i < playlist.length; i++) {
            const song = playlist[i];
            const url = window.audioCache.getCachedAudio(song.src);
            song.duration = await getAudioDuration(url);

            // Update DOM immediately
            const li = document.querySelectorAll('.playlist-item')[i];
            if (li) li.querySelector('.song-duration').textContent = song.duration;

            const catLi = document.querySelectorAll('.category-song-item')[i];
            if (catLi) catLi.querySelector('.song-duration').textContent = song.duration;
        }
    }

    // --- Initialize ---
    audio.volume = 0.7;
    if (volumeSlider) volumeSlider.value = audio.volume;

    window.playlist = playlist;
    window.playSong = playSong;

    renderPlaylist();
    renderCategoryPlaylists();
    loadAudioDurations();
});
