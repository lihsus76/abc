

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".reveal");
    let autoReplay = true;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const el = entry.target;

            if (entry.isIntersecting) {
                // Remove any previous animation class
                el.classList.remove("animate");

                // Force reflow to reset animation
                void el.offsetWidth;

                // Get delay from data attribute (in milliseconds)
                const delay = el.dataset.delay || 0;

                // Apply animation with delay
                setTimeout(() => {
                    el.classList.add("animate");
                }, parseInt(delay));
            } else if (autoReplay) {
                // Remove animation class when element leaves viewport
                // This allows it to be replayed when scrolled into view again
                el.classList.remove("animate");
            }
        });
    }, { threshold: 0.5 });

    // Observe all reveal elements
    elements.forEach((el) => observer.observe(el));


    // Re-trigger observer for elements in view
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            setTimeout(() => {
                const delay = el.dataset.delay || 0;
                setTimeout(() => {
                    el.classList.add("animate");
                }, parseInt(delay));
            }, 50);
        }
    });
});