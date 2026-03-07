// ──────────────────────────────────────────────
//  Shelly Beach Villa 3.0 — Scroll-Driven Hero
// ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    const heroVideo = document.getElementById("heroVideo");
    const heroContainer = document.querySelector(".hero-video-container");

    if (heroVideo && heroContainer) {
        // Pre-cargar el video en memoria como Blob para un scrubbing ultra-fluido
        fetch('assets/hero-video.mp4')
            .then(response => response.blob())
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob);
                heroVideo.setAttribute('src', blobUrl);
                heroVideo.load();
            })
            .catch(err => console.error('Error preloading video:', err));

        const scrub = () => {
            const scrolled = window.scrollY;
            const scrollRange = heroContainer.offsetHeight - window.innerHeight;
            if (scrollRange <= 0) return;

            const fraction = Math.min(Math.max(scrolled / scrollRange, 0), 1);
            if (heroVideo.duration && isFinite(heroVideo.duration)) {
                heroVideo.currentTime = heroVideo.duration * fraction;
            }
        };

        let rafId = null;
        window.addEventListener("scroll", () => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                scrub();
                rafId = null;
            });
        }, { passive: true });

        heroVideo.addEventListener("loadedmetadata", scrub);
        if (heroVideo.readyState >= 1) scrub();
    }

    // ──────────────────────────────────────────────
    //  Fade-in on scroll (IntersectionObserver)
    // ──────────────────────────────────────────────
    const fadeEls = document.querySelectorAll(".fade-in");
    if (fadeEls.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
            });
        }, { threshold: 0.12 });
        fadeEls.forEach(el => io.observe(el));
    }

    // ──────────────────────────────────────────────
    //  FAQ Accordion
    // ──────────────────────────────────────────────
    document.querySelectorAll(".faq-item").forEach(item => {
        item.querySelector(".faq-trigger")?.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");
            document.querySelectorAll(".faq-item.open").forEach(i => i.classList.remove("open"));
            if (!isOpen) item.classList.add("open");
        });
    });

    // ──────────────────────────────────────────────
    //  Video Tour Modal
    // ──────────────────────────────────────────────
    const overlay = document.getElementById("videoOverlay");
    const tourVideo = document.getElementById("tourVideo");
    document.querySelectorAll("[data-open-tour]").forEach(btn => {
        btn.addEventListener("click", () => {
            overlay?.classList.add("active");
            tourVideo?.play();
        });
    });
    document.getElementById("closeTour")?.addEventListener("click", () => {
        overlay?.classList.remove("active");
        if (tourVideo) { tourVideo.pause(); tourVideo.currentTime = 0; }
    });
    overlay?.addEventListener("click", function (e) {
        if (e.target === this) {
            this.classList.remove("active");
            if (tourVideo) { tourVideo.pause(); tourVideo.currentTime = 0; }
        }
    });
});
