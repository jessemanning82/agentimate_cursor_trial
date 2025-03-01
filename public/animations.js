// Create gradient for the heart
const svg = document.querySelector('.large-heart');
const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
gradient.innerHTML = `
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color: #FF3366"/>
        <stop offset="100%" style="stop-color: #6666FF"/>
    </linearGradient>
`;
svg.insertBefore(gradient, svg.firstChild);

// Demo section animations
const demoAnimations = () => {
    const commands = [
        { 
            text: "make it vertical", 
            transform: () => {
                demoElements.style.cssText = `
                    grid-template-columns: 1fr;
                    grid-template-rows: repeat(6, 1fr);
                    gap: 1rem;
                `;
            }
        },
        { 
            text: "create a staggered animation", 
            transform: () => {
                demoElements.style.cssText = `
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                `;
                anime({
                    targets: '.demo-item',
                    scale: [0.5, 1],
                    opacity: [0.2, 0.8],
                    delay: anime.stagger(100, {grid: [3, 2], from: 'center'}),
                    duration: 800,
                    direction: 'alternate',
                    loop: true,
                    easing: 'easeInOutQuad'
                });
            }
        },
        { 
            text: "arrange in a circle",
            transform: () => {
                demoElements.style.cssText = `
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 250px;
                    position: relative;
                `;
                
                demoItems.forEach((item, i) => {
                    const angle = (i * (360 / demoItems.length));
                    item.style.cssText = `
                        position: absolute;
                        width: 80px;
                        height: 80px;
                        transform: rotate(${angle}deg) translateX(100px) rotate(-${angle}deg);
                        transition: transform 0.5s ease;
                    `;
                });

                anime({
                    targets: '.demo-item',
                    rotate: [
                        (el, i) => i * (360 / demoItems.length),
                        (el, i) => 360 + (i * (360 / demoItems.length))
                    ],
                    translateX: 100,
                    duration: 8000,
                    easing: 'linear',
                    loop: true
                });
            }
        },
        { 
            text: "make it flow like waves",
            transform: () => {
                demoElements.style.cssText = `
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    height: 200px;
                `;
                
                demoItems.forEach((item, i) => {
                    item.style.cssText = `
                        width: 80px;
                        height: 80px;
                    `;
                });

                anime({
                    targets: '.demo-item',
                    translateY: function(el, i) {
                        return anime.random(-50, 50);
                    },
                    duration: function() {
                        return anime.random(1200, 1800);
                    },
                    delay: function(el, i) {
                        return i * 100;
                    },
                    direction: 'alternate',
                    loop: true,
                    easing: 'easeInOutSine'
                });
            }
        },
        { 
            text: "create a spiral pattern",
            transform: () => {
                demoElements.style.cssText = `
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 250px;
                    position: relative;
                `;
                
                demoItems.forEach((item, i) => {
                    item.style.cssText = `
                        position: absolute;
                        width: 80px;
                        height: 80px;
                    `;
                });

                anime({
                    targets: '.demo-item',
                    translateX: function(el, i) {
                        return (i * 20) * Math.cos(i * 0.5);
                    },
                    translateY: function(el, i) {
                        return (i * 20) * Math.sin(i * 0.5);
                    },
                    scale: function(el, i) {
                        return 1 - (i * 0.1);
                    },
                    rotate: function(el, i) {
                        return i * 45;
                    },
                    duration: 4000,
                    loop: true,
                    direction: 'alternate',
                    easing: 'easeInOutQuad'
                });
            }
        }
    ];

    let currentIndex = 0;
    const demoInput = document.querySelector('.demo-input-text');
    const demoElements = document.querySelector('.demo-elements');
    const demoItems = document.querySelectorAll('.demo-item');

    const typeText = (text) => {
        return new Promise(resolve => {
            let i = 0;
            demoInput.textContent = '';
            const typing = setInterval(() => {
                if (i < text.length) {
                    demoInput.textContent += text[i];
                    i++;
                } else {
                    clearInterval(typing);
                    resolve();
                }
            }, 100);
        });
    };

    const resetUI = () => {
        demoElements.style.cssText = '';
        demoItems.forEach(item => {
            item.style.cssText = '';
        });
        anime.remove('.demo-item');
    };

    const animateDemo = async () => {
        const command = commands[currentIndex];
        
        // Type the command
        await typeText(command.text);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Transform the UI
        resetUI();
        command.transform();
        
        // Prepare for next command
        currentIndex = (currentIndex + 1) % commands.length;
        
        // Wait before starting next cycle
        setTimeout(animateDemo, 4000);
    };

    // Start the demo animation
    animateDemo();
};

// Entrance animations
const entranceTimeline = anime.timeline({
    easing: 'easeOutExpo',
    duration: 800
});

entranceTimeline
    .add({
        targets: '.heart-container',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1200
    })
    .add({
        targets: '.title',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000
    }, '-=800')
    .add({
        targets: '.subtitle',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000
    }, '-=800')
    .add({
        targets: '.prompt-container',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000
    }, '-=800')
    .add({
        targets: '.quick-actions',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000
    }, '-=800');

// Button hover animations
const buttons = document.querySelectorAll('.action-btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        anime({
            targets: button,
            scale: 1.05,
            duration: 300,
            easing: 'easeOutExpo'
        });
    });
    
    button.addEventListener('mouseleave', () => {
        anime({
            targets: button,
            scale: 1,
            duration: 300,
            easing: 'easeOutExpo'
        });
    });
});

// Staggered animation for nav links
anime({
    targets: '.nav-links a',
    opacity: [0, 1],
    translateY: [20, 0],
    delay: anime.stagger(100),
    duration: 800,
    easing: 'easeOutExpo'
});

// Interactive prompt container animation
const promptContainer = document.querySelector('.prompt-container');
promptContainer.addEventListener('focus', () => {
    anime({
        targets: promptContainer,
        scale: 1.02,
        duration: 300,
        easing: 'easeOutExpo'
    });
}, true);

promptContainer.addEventListener('blur', () => {
    anime({
        targets: promptContainer,
        scale: 1,
        duration: 300,
        easing: 'easeOutExpo'
    });
}, true);

// Enhanced prompt input animation
const promptInput = document.querySelector('.prompt-input');
let activeAnimation = null;

promptInput.addEventListener('focus', () => {
    if (activeAnimation) activeAnimation.pause();
    
    activeAnimation = anime.timeline({
        loop: true
    }).add({
        targets: '.prompt-container',
        boxShadow: [
            '0 0 10px rgba(255, 51, 102, 0.2)',
            '0 0 20px rgba(255, 51, 102, 0.4)',
            '0 0 10px rgba(255, 51, 102, 0.2)'
        ],
        duration: 1500,
        easing: 'easeInOutQuad'
    });
});

promptInput.addEventListener('blur', () => {
    if (activeAnimation) {
        activeAnimation.pause();
        activeAnimation = null;
    }
    
    anime({
        targets: '.prompt-container',
        boxShadow: '0 0 10px rgba(255, 51, 102, 0.2)',
        duration: 300,
        easing: 'easeOutExpo'
    });
});

// Interactive wave effect for quick action buttons
const createWaveEffect = (e, button) => {
    const circle = document.createElement('div');
    circle.className = 'wave-effect';
    const rect = button.getBoundingClientRect();
    
    circle.style.left = `${e.clientX - rect.left}px`;
    circle.style.top = `${e.clientY - rect.top}px`;
    
    button.appendChild(circle);
    
    anime({
        targets: circle,
        scale: [0, 3],
        opacity: [0.5, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        complete: () => circle.remove()
    });
};

document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('click', (e) => createWaveEffect(e, button));
});

// Testimonials animations
const animateTestimonials = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate section title
                anime({
                    targets: '.testimonials .section-title',
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 800,
                    easing: 'easeOutExpo'
                });

                // Animate testimonial cards with stagger
                anime({
                    targets: '.testimonial-card',
                    opacity: [0, 1],
                    translateY: [20, 0],
                    delay: anime.stagger(200),
                    duration: 800,
                    easing: 'easeOutExpo'
                });

                // Animate avatars with a subtle scale effect
                anime({
                    targets: '.avatar',
                    scale: [0.5, 1],
                    opacity: [0, 1],
                    delay: anime.stagger(200),
                    duration: 1000,
                    easing: 'easeOutElastic(1, .5)'
                });

                observer.disconnect();
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(document.querySelector('.testimonials'));
};

// Initialize animations
demoAnimations();
animateTestimonials();

// Add necessary CSS
const style = document.createElement('style');
style.textContent = `
    .hero {
        position: relative;
        overflow: hidden;
    }
    
    .wave-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        pointer-events: none;
        transform-origin: center;
    }
    
    .prompt-container {
        transition: box-shadow 0.3s ease;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
    }

    .large-heart {
        fill: url(#gradient);
    }
`;
document.head.appendChild(style); 