document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const body = document.body;
    const imageZoom = document.querySelector('.image-zoom');
    const zoomImage = imageZoom.querySelector('img');
    const closeZoomButton = imageZoom.querySelector('.close-zoom');
    const shareModal = document.querySelector('.share-modal');
    const closeModalButton = document.querySelector('.share-modal .close-modal');
    const shareUrlInput = document.querySelector('.share-url input');

    // --- Share Functionality ---
    const shareData = {
        title: 'وب‌سایت فلوکی',
        text: 'آموزش اتصال به سرویس‌ها در سیستم‌عامل‌های مختلف با فلوکی 🚀',
        url: 'https://canfigvpn.github.io/web/'
    };

    window.openShareModal = function() {
        console.log('Opening share modal');
        shareModal.classList.add('active');
        if ('vibrate' in navigator) {
            navigator.vibrate(50); // Haptic feedback
        }
    };

    function copyLink() {
        const url = shareUrlInput.value; // Get URL from input
        navigator.clipboard.writeText(url).then(() => {
            const feedback = document.getElementById('copyFeedback');
            feedback.textContent = 'لینک کپی شد!';
            feedback.classList.add('active');
            setTimeout(() => feedback.classList.remove('active'), 1000);
            if ('vibrate' in navigator) {
                navigator.vibrate(50); // Haptic feedback
            }
        }).catch(err => {
            console.error('Failed to copy link:', err);
            const feedback = document.getElementById('copyFeedback');
            feedback.textContent = 'خطا در کپی لینک!';
            feedback.classList.add('active');
            setTimeout(() => feedback.classList.remove('active'), 1000);
        });
    }

    function downloadQR() {
        const qrLink = 'https://raw.githubusercontent.com/canfigvpn/web/refs/heads/main/png/qr.png'; // Your PNG link
        const link = document.createElement('a');
        link.href = qrLink;
        link.download = 'floki-qr-code.png';
        link.click();
        if ('vibrate' in navigator) {
            navigator.vibrate(50); // Haptic feedback
        }
    }

    closeModalButton.addEventListener('click', () => {
        shareModal.classList.remove('active');
        if ('vibrate' in navigator) {
            navigator.vibrate(50); // Haptic feedback
        }
    });

    shareModal.addEventListener('click', (e) => {
        if (e.target === shareModal) {
            shareModal.classList.remove('active');
            if ('vibrate' in navigator) {
                navigator.vibrate(50); // Haptic feedback
            }
        }
    });

    document.querySelectorAll('.share-option').forEach(option => {
        option.addEventListener('click', () => {
            if ('vibrate' in navigator) {
                navigator.vibrate(50); // Haptic feedback
            }
        });
    });

    // --- Close Active Box on Page Click ---
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.os-box, .slider-button, .app-button, .image-zoom, .slider-dot, .wrapper, .share-modal')) {
            document.querySelectorAll('.os-box').forEach(box => {
                box.classList.remove('active');
                box.setAttribute('aria-expanded', 'false');
            });
        }
    });

    // --- Toggle os-box ---
    document.querySelectorAll('.os-box').forEach(box => {
        box.addEventListener('click', (e) => {
            if (e.target.closest('.app-button, .slider-button, .slider-image, .slider-dot')) return;
            const isActive = box.classList.contains('active');
            document.querySelectorAll('.os-box').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-expanded', 'false');
            });
            if (!isActive) {
                box.classList.add('active');
                box.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // --- Image Slider with Enhanced Animation ---
    document.querySelectorAll('.slider').forEach(slider => {
        const sliderImages = slider.querySelector('.slider-images');
        const images = slider.querySelectorAll('.slider-image');
        const prevButton = slider.querySelector('.slider-button.prev');
        const nextButton = slider.querySelector('.slider-button.next');
        const counter = slider.querySelector('.slider-counter');
        const dotsContainer = slider.querySelector('.slider-dots');
        let currentIndex = 0;
        const totalImages = images.length;
        let autoPlayInterval;

        // Create dots
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            dot.setAttribute('aria-label', `رفتن به تصویر ${index + 1}`);
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
                stopAutoPlay();
            });
            dotsContainer.appendChild(dot);
        });

        const updateSlider = () => {
            images.forEach((img, index) => {
                img.classList.remove('active');
                if (index === currentIndex) {
                    img.classList.add('active');
                }
            });
            sliderImages.style.transform = `translateX(${-currentIndex * 100}%)`;
            counter.textContent = `تصویر ${currentIndex + 1} / ${totalImages}`;
            dotsContainer.querySelectorAll('.slider-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
                dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
            });
        };

        const startAutoPlay = () => {
            autoPlayInterval = setInterval(() => {
                currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
                updateSlider();
            }, 3000);
        };

        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
            updateSlider();
            stopAutoPlay();
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
            updateSlider();
            stopAutoPlay();
        });

        // Touch functionality
        let touchStartX = 0;
        let touchEndX = 0;

        sliderImages.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        });

        sliderImages.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) nextButton.click();
            if (touchEndX > touchStartX + 50) prevButton.click();
        };

        // Zoom functionality
        images.forEach(img => {
            img.addEventListener('click', () => {
                zoomImage.src = img.src;
                zoomImage.alt = img.alt;
                imageZoom.classList.add('active');
                stopAutoPlay();
            });
        });

        // Keyboard navigation
        slider.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') {
                prevButton.click();
            } else if (e.key === 'ArrowRight') {
                nextButton.click();
            }
        });

        // Auto-play on load
        startAutoPlay();

        // Stop auto-play on hover
        slider.addEventListener('mouseenter', stopAutoPlay);
        slider.addEventListener('mouseleave', startAutoPlay);

        updateSlider();
    });

    // Close Zoom
    closeZoomButton.addEventListener('click', () => {
        imageZoom.classList.remove('active');
    });

    // Close Zoom on click outside image
    imageZoom.addEventListener('click', (e) => {
        if (e.target === imageZoom) {
            imageZoom.classList.remove('active');
        }
    });

    // --- PWA Service Worker Registration ---
    if ('serviceWorker' in navigator) {
        const swContent = `
            const CACHE_NAME = 'floki-cache-v13';
            const urlsToCache = [
                '/',
                'https://vazirmatn.github.io/Vazirmatn/fonts/webfonts/Vazirmatn.css',
                'https://use.fontawesome.com/releases/v5.15.4/css/all.css',
                'https://raw.githubusercontent.com/canfigvpn/web/refs/heads/main/png/qr.png',
                'https://placehold.co/800x400/3B82F6/FFFFFF?text=Android+Step+1',
                'https://placehold.co/800x400/60A5FA/FFFFFF?text=Android+Step+2',
                'https://placehold.co/800x400/1E3A8A/FFFFFF?text=Android+Step+3',
                'https://placehold.co/800x400/3B82F6/FFFFFF?text=Android+Step+4',
                'https://placehold.co/800x400/60A5FA/FFFFFF?text=Android+Step+5',
                'https://placehold.co/800x400/1E3A8A/FFFFFF?text=Android+Step+6',
                'https://placehold.co/800x400/3B82F6/FFFFFF?text=Android+Step+7',
                'https://placehold.co/800x400/60A5FA/FFFFFF?text=Android+Step+8',
                'https://placehold.co/800x400/1E3A8A/FFFFFF?text=Android+Step+9',
                'https://placehold.co/800x400/3B82F6/FFFFFF?text=Android+Step+10',
                'https://placehold.co/800x400/3B82F6/FFFFFF?text=iPhone+Step+1',
                'https://placehold.co/800x400/60A5FA/FFFFFF?text=iPhone+Step+2',
                'https://placehold.co/800x400/1E3A8A/FFFFFF?text=iPhone+Step+3',
                'https://placehold.co/800x400/3B82F6/FFFFFF?text=iPhone+Step+4',
                'https://placehold.co/800x400/60A5FA/FFFFFF?text=iPhone+Step+5',
                'https://placehold.co/800x400/1E3A8A/FFFFFF?text=iPhone+Step+6',
                'https://placehold.co/800x400/3B82F6/FFFFFF?text=iPhone+Step+7',
                'https://placehold.co/800x400/60A5FA/FFFFFF?text=iPhone+Step+8',
                'https://placehold.co/800x400/1E3A8A/FFFFFF?text=iPhone+Step+9',
                'https://placehold.co/800x400/3B82F6/FFFFFF?text=iPhone+Step+10',
                'https://placehold.co/800x400/3B82F6/FFFFFF?text=Windows+Step+1',
                'https://placehold.co/800x400/60A5FA/FFFFFF?text=Windows+Step+2',
                'https://placehold.co/800x400/1E3A8A/FFFFFF?text=Windows+Step+3',
                'https://placehold.co/800x400/3B82F6/FFFFFF?text=Windows+Step+4',
                'https://placehold.co/800x400/60A5FA/FFFFFF?text=Windows+Step+5',
                'https://placehold.co/800x400/1E3A8A/FFFFFF?text=Windows+Step+6',
                'https://placehold.co/800x400/3B82F6/FFFFFF?text=Windows+Step+7',
                'https://placehold.co/800x400/60A5FA/FFFFFF?text=Windows+Step+8',
                'https://placehold.co/800x400/1E3A8A/FFFFFF?text=Windows+Step+9',
                'https://placehold.co/800x400/3B82F6/FFFFFF?text=Windows+Step+10'
            ];
            self.addEventListener('install', event => {
                event.waitUntil(
                    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
                );
            });
            self.addEventListener('fetch', event => {
                event.respondWith(
                    caches.match(event.request).then(response => {
                        return response || fetch(event.request);
                    })
                );
            });
        `;
        const blob = new Blob([swContent], { type: 'application/javascript' });
        const swUrl = URL.createObjectURL(blob);
        navigator.serviceWorker.register(swUrl).then(reg => {
            console.log('Service Worker registered successfully.');
        }).catch(err => {
            console.error('Service Worker registration failed:', err);
        });
    }

    // --- Offline/Online Status ---
    const handleConnectionChange = () => {
        if (navigator.onLine) {
            body.classList.remove('offline');
        } else {
            body.classList.add('offline');
        }
    };
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);
    handleConnectionChange();
});
