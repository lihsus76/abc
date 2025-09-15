// Floating hearts animation
function createFloatingHearts() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        const size = Math.random() * 20 + 30;
        heart.style.cssText = `
            position: absolute;
            bottom: -50px;
            left: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
            z-index: -1;
            opacity: 0.8;
            animation: heartFloat ${Math.random() * 10 + 15}s linear forwards;
        `;
        
        container.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) heart.remove();
        }, 25000);
    }

    // Create hearts continuously
    setInterval(createHeart, 800);
    
    // Initial hearts
    for (let i = 0; i < 12; i++) {
        setTimeout(createHeart, i * 200);
    }
}

// Add CSS animation and heart shape
const style = document.createElement('style');
style.textContent = `
    .floating-heart {
        font-size: 60px;
        color: #ff6b6b;
        text-shadow: 0 0 15px rgba(255, 107, 107, 0.6);
    }
    .floating-heart::before {
        content: '♥';
    }
    @keyframes heartFloat {
        0% {
            transform: translateY(0) rotate(-45deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100vh) rotate(315deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Start animation
document.addEventListener('DOMContentLoaded', createFloatingHearts);
