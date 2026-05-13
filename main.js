const canvas = document.getElementById('scroll-canvas');
const context = canvas.getContext('2d');
const progress = document.getElementById('progress');
const loader = document.getElementById('loader');

const frameCount = 211;
const currentFrame = index => (
    `/frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
);

const images = [];
const airbnbCanvas = {
    frame: 0,
    targetFrame: 0
};

// Lerp constant for smoothness (0.1 = very smooth, 0.2 = snappier)
const lerpFactor = 0.15;

// Preload images
let imagesLoaded = 0;

const preloadImages = () => {
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            imagesLoaded++;
            const percent = (imagesLoaded / frameCount) * 100;
            progress.style.width = `${percent}%`;
            
            if (imagesLoaded === frameCount) {
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 800);
                }, 500);
            }
        };
        images.push(img);
    }
};

// Set canvas dimensions with high-DPI support
const setupCanvas = (img) => {
    const scale = window.devicePixelRatio || 1;
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.objectFit = 'contain';
    context.scale(scale, scale);
    
    // Quality optimizations
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
};

const img = new Image();
img.src = currentFrame(1);
img.onload = () => {
    setupCanvas(img);
    render();
    animate(); // Start the animation loop
};

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const frameToDraw = images[Math.round(airbnbCanvas.frame)] || images[0];
    if (frameToDraw) {
        context.drawImage(frameToDraw, 0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
    }
}

// Animation loop for smoothing
function animate() {
    // Lerp the frame index
    const diff = airbnbCanvas.targetFrame - airbnbCanvas.frame;
    airbnbCanvas.frame += diff * lerpFactor;
    
    // Only render if there's a significant change
    if (Math.abs(diff) > 0.01) {
        render();
    }
    
    requestAnimationFrame(animate);
}

// Scroll interaction
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const scrollTop = window.pageYOffset;
    const heroHeight = hero.offsetHeight - window.innerHeight;
    
    // Calculate scroll fraction only within the hero section
    let scrollFraction = scrollTop / heroHeight;
    
    // Clamp fraction between 0 and 1
    scrollFraction = Math.max(0, Math.min(1, scrollFraction));
    
    // Update target frame for lerping
    airbnbCanvas.targetFrame = scrollFraction * (frameCount - 1);
    
    // Navbar background transition
    const nav = document.getElementById('main-nav');
    if (scrollTop > 50) {
        nav.classList.add('bg-surface/80');
        nav.classList.remove('bg-surface/10');
    } else {
        nav.classList.add('bg-surface/10');
        nav.classList.remove('bg-surface/80');
    }
    
    // Smoothly fade out the hero headline
    // Fades from 1 to 0 between 0% and 30% scroll
    const headline = document.querySelector('.hero-headline');
    if (headline) {
        const fadeStart = 0;
        const fadeEnd = 0.3;
        let opacity = 1;
        
        if (scrollFraction > fadeStart) {
            opacity = 1 - ((scrollFraction - fadeStart) / (fadeEnd - fadeStart));
        }
        
        headline.style.opacity = Math.max(0, opacity);
        headline.style.transform = `translateY(${Math.max(0, (1 - opacity) * 50)}px)`;
        headline.style.filter = `blur(${Math.max(0, (1 - opacity) * 10)}px)`;
    }
});

// Removed updateActiveText as we now use a single headline with scroll-based opacity

// Initial call
preloadImages();
