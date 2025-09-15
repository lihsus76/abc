// Advanced Resource Preloader
class AdvancedLoader {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.progressBar = document.getElementById('loadingBar');
        this.progressText = document.getElementById('loadingPercentage');
        this.loadingText = document.getElementById('loadingStatus');
        this.progress = 0;
        this.totalResources = 0;
        this.loadedResources = 0;
        this.resources = [];
        
        this.init();
    }

    init() {
        this.collectResources();
        this.preloadResources();
    }

    collectResources() {
        // CSS files
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            this.resources.push({ type: 'css', url: link.href, element: link });
        });
        
        // JS files
        document.querySelectorAll('script[src]').forEach(script => {
            this.resources.push({ type: 'js', url: script.src, element: script });
        });
        
        // Images
        document.querySelectorAll('img').forEach(img => {
            if (img.src) this.resources.push({ type: 'image', url: img.src, element: img });
        });
        
        // Audio files from playlist
        if (window.playlist) {
            window.playlist.forEach(song => {
                this.resources.push({ type: 'audio', url: song.src, element: null });
            });
        }
        
        this.totalResources = this.resources.length;
        this.loadingText.textContent = `Loading ${this.totalResources} resources...`;
    }

    preloadResources() {
        if (this.totalResources === 0) {
            this.completeLoading();
            return;
        }

        this.resources.forEach((resource, index) => {
            this.loadResource(resource, index);
        });
    }

    loadResource(resource, index) {
        const onLoad = () => {
            this.loadedResources++;
            this.updateProgress();
            
            if (this.loadedResources >= this.totalResources) {
                setTimeout(() => this.completeLoading(), 500);
            }
        };

        const onError = () => {
            console.warn(`Failed to load: ${resource.url}`);
            this.loadedResources++;
            this.updateProgress();
            
            if (this.loadedResources >= this.totalResources) {
                setTimeout(() => this.completeLoading(), 500);
            }
        };

        switch (resource.type) {
            case 'css':
                if (resource.element.sheet) {
                    onLoad();
                } else {
                    resource.element.onload = onLoad;
                    resource.element.onerror = onError;
                }
                break;
                
            case 'js':
                if (resource.element.readyState === 'complete') {
                    onLoad();
                } else {
                    resource.element.onload = onLoad;
                    resource.element.onerror = onError;
                }
                break;
                
            case 'image':
                const img = new Image();
                img.onload = onLoad;
                img.onerror = onError;
                img.src = resource.url;
                break;
                
            case 'audio':
                const audio = new Audio();
                audio.preload = 'metadata';
                audio.oncanplaythrough = onLoad;
                audio.onerror = onError;
                audio.src = resource.url;
                break;
        }
    }

    updateProgress() {
        this.progress = Math.round((this.loadedResources / this.totalResources) * 100);
        this.progressBar.style.width = `${this.progress}%`;
        this.progressText.textContent = `${this.progress}%`;
        this.loadingText.textContent = `Loading resources... (${this.loadedResources}/${this.totalResources})`;
    }

    completeLoading() {
        this.progress = 100;
        this.progressBar.style.width = '100%';
        this.progressText.textContent = '100%';
        this.loadingText.textContent = 'All resources loaded!';
        
        setTimeout(() => {
            this.loadingScreen.classList.add('hidden');
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
            }, 800);
        }, 800);
    }
}

// Wait for DOM and playlist to be ready
function initAdvancedLoader() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => new AdvancedLoader(), 100);
        });
    } else {
        setTimeout(() => new AdvancedLoader(), 100);
    }
}

initAdvancedLoader();
