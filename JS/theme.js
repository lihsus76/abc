
document.addEventListener('DOMContentLoaded', function() {
            const themeToggle = document.getElementById('themeToggle');
            const body = document.body;
            
            // Check for saved theme preference
            if (localStorage.getItem('theme') === 'dark') {
                body.classList.add('dark-theme');
            }
            
            themeToggle.addEventListener('click', function() {
                body.classList.toggle('dark-theme');
                
                // Save the theme preference
                if (body.classList.contains('dark-theme')) {
                    localStorage.setItem('theme', 'dark');
                } else {
                    localStorage.setItem('theme', 'light');
                }
            });
        });