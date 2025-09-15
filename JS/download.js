

// Use the global playlist from audio.js
function getPlaylist() {
    return window.playlist || [];
}

document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadAllBtn');
    const toast = document.getElementById('downloadToast');
    const toastOverlay = document.getElementById('toastOverlay');
    const songListDiv = document.getElementById('songList');
    const downloadSelectedBtn = document.getElementById('downloadSelectedBtn');
    const closeBtn = document.getElementById('closeToast');
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');

    // Wait for playlist to be available and populate song checkboxes
    function initializeDownload() {
        const playlist = getPlaylist();
        if (!playlist.length) {
            setTimeout(initializeDownload, 100);
            return;
        }
        
        playlist.forEach((song, index) => {
        const label = document.createElement('label');
        label.className = 'checkbox-container';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.dataset.index = index;

        const checkmark = document.createElement('span');
        checkmark.className = 'checkmark';

        const labelText = document.createElement('span');
        labelText.className = 'label-text';
        labelText.innerHTML = `
            <div class="song-details">
                <div class="song-name">${song.title} - ${song.artist}</div>
                <div class="song-meta">
                    <span class="file-size">Loading...</span> • 
                    <span class="duration">Loading...</span>
                </div>
            </div>
        `;

        label.appendChild(checkbox);
        label.appendChild(checkmark);
        label.appendChild(labelText);
        songListDiv.appendChild(label);
        
        // Load file size and duration
        const audio = new Audio(song.src);
        audio.addEventListener('loadedmetadata', () => {
            const minutes = Math.floor(audio.duration / 60);
            const seconds = Math.floor(audio.duration % 60);
            const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            labelText.querySelector('.duration').textContent = duration;
        });
        
        fetch(song.src, { method: 'HEAD' })
            .then(response => {
                const size = response.headers.get('content-length');
                if (size) {
                    const sizeInMB = (size / (1024 * 1024)).toFixed(1);
                    labelText.querySelector('.file-size').textContent = `${sizeInMB} MB`;
                }
            })
            .catch(() => {
                labelText.querySelector('.file-size').textContent = 'Unknown';
            });
        });
    }
    
    initializeDownload();

    // Show toast
    downloadBtn.addEventListener('click', () => {
        toast.classList.add('active');
        if (toastOverlay) toastOverlay.classList.add('active');
        document.body.classList.add('toast-active');
        updateDownloadButton();
    });

    // Close toast
    function closeToast() {
        toast.classList.remove('active');
        if (toastOverlay) toastOverlay.classList.remove('active');
        document.body.classList.remove('toast-active');
    }
    closeBtn.addEventListener('click', closeToast);
    if (toastOverlay) toastOverlay.addEventListener('click', closeToast);

    // Select All functionality
    selectAllCheckbox.addEventListener('change', () => {
        const songCheckboxes = songListDiv.querySelectorAll('input[type=checkbox]');
        songCheckboxes.forEach(cb => cb.checked = selectAllCheckbox.checked);
        updateDownloadButton();
    });

    // Update download button
    function updateDownloadButton() {
        const selectedCount = songListDiv.querySelectorAll('input[type=checkbox]:checked').length;
        downloadSelectedBtn.disabled = selectedCount === 0;
        downloadSelectedBtn.innerHTML = `<i class="fas fa-download"></i> Download Selected (${selectedCount})`;
    }

    // Update select all checkbox state
    songListDiv.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            const total = songListDiv.querySelectorAll('input[type=checkbox]').length;
            const checked = songListDiv.querySelectorAll('input[type=checkbox]:checked').length;
            selectAllCheckbox.checked = checked === total;
            selectAllCheckbox.indeterminate = checked > 0 && checked < total;
            updateDownloadButton();
        }
    });

    // Download selected songs
    downloadSelectedBtn.addEventListener('click', () => {
        const selectedIndexes = Array.from(songListDiv.querySelectorAll('input[type=checkbox]:checked'))
            .map(cb => parseInt(cb.dataset.index));
        const playlist = getPlaylist();
        selectedIndexes.forEach(i => downloadSong(playlist[i]));
        closeToast();
    });

    // Function to download a song without leaving page
    function downloadSong(song) {
        fetch(song.src)
            .then(resp => resp.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = song.title + ".mp3";
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(err => console.error("Download failed:", err));
    }
});
