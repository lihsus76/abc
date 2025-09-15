// Modern Loading Screen Controller
let loadingProgress = 0;
const loadingBar = document.getElementById('loadingBar');
const loadingScreen = document.getElementById('loadingScreen');
const loadingPercentage = document.getElementById('loadingPercentage');
const loadingStatus = document.getElementById('loadingStatus');

const loadingSteps = [
    { progress: 15, status: 'Loading stylesheets...', delay: 200 },
    { progress: 30, status: 'Loading audio files...', delay: 400 },
    { progress: 50, status: 'Initializing player...', delay: 300 },
    { progress: 70, status: 'Loading playlist...', delay: 350 },
    { progress: 85, status: 'Setting up controls...', delay: 250 },
    { progress: 100, status: 'Ready to play!', delay: 200 }
];

function updateProgress(progress, status = '') {
    loadingProgress = Math.min(progress, 100);
    
    if (loadingBar) {
        loadingBar.style.width = loadingProgress + '%';
    }
    
    if (loadingPercentage) {
        loadingPercentage.textContent = Math.round(loadingProgress) + '%';
    }
    
    if (status && loadingStatus) {
        loadingStatus.textContent = status;
    }
    
    if (loadingProgress >= 100) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }, 500);
    }
}

function animateProgress(target, status) {
    const step = (target - loadingProgress) / 20;
    const animate = () => {
        if (Math.abs(target - loadingProgress) > 1) {
            loadingProgress += step;
            updateProgress(loadingProgress, status);
            requestAnimationFrame(animate);
        } else {
            updateProgress(target, status);
        }
    };
    animate();
}

let currentStep = 0;

function loadNextStep() {
    if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setTimeout(() => {
            animateProgress(step.progress, step.status);
            currentStep++;
            loadNextStep();
        }, step.delay);
    }
}

// Start loading when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadNextStep();
});

// Ensure completion when window loads
window.addEventListener('load', () => {
    setTimeout(() => {
        animateProgress(100, 'Ready to play!');
    }, 300);
});