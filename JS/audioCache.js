// Audio Cache Manager
class AudioCache {
    constructor() {
        this.cacheKey = 'musicPlayerCache';
        this.cache = this.loadCache();
    }

    loadCache() {
        try {
            return JSON.parse(localStorage.getItem(this.cacheKey)) || {};
        } catch {
            return {};
        }
    }

    saveCache() {
        try {
            localStorage.setItem(this.cacheKey, JSON.stringify(this.cache));
        } catch (e) {
            console.warn('Cache storage full, clearing old data');
            this.clearCache();
        }
    }

    async cacheAudio(url) {
        if (this.cache[url]) return this.cache[url];

        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const base64 = await this.blobToBase64(blob);
            
            this.cache[url] = base64;
            this.saveCache();
            return base64;
        } catch (e) {
            console.warn(`Failed to cache: ${url}`);
            return url;
        }
    }

    blobToBase64(blob) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    getCachedAudio(url) {
        return this.cache[url] || url;
    }

    clearCache() {
        localStorage.removeItem(this.cacheKey);
        this.cache = {};
    }

    isCached(url) {
        return !!this.cache[url];
    }
}

window.audioCache = new AudioCache();