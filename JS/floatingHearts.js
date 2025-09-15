

// Generate hearts with random properties
        function createHearts() {
            const container = document.getElementById('hearts-container');
            const heartCount = 25; // Number of hearts
            
            // Clear existing hearts
            container.innerHTML = '';
            
            for (let i = 0; i < heartCount; i++) {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                
                // Random properties
                const size = Math.random() * 30 + 20; // 20-50px
                const left = Math.random() * 100; // 0-100% of viewport width
                const animationDuration = Math.random() * 10 + 15; // 15-25 seconds
                const animationDelay = Math.random() * 10; // 0-10 seconds delay
                const opacity = Math.random() * 0.5 + 0.4; // 0.4-0.9 opacity
                
                // Create SVG heart
                heart.innerHTML = `
                    <svg width="${size}" height="${size}" viewBox="0 0 24 24">
                        <path fill="#ff6b6b" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
                    </svg>
                `;
                
                // Apply styles
                heart.style.left = `${left}%`;
                heart.style.animation = `float ${animationDuration}s linear ${animationDelay}s infinite`;
                heart.style.opacity = opacity;
                
                container.appendChild(heart);
            }
        }
        
        // Create hearts when page loads and on resize
        window.addEventListener('load', createHearts);
        window.addEventListener('resize', createHearts);