document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const introContainer = document.querySelector('.intro-container');
    const paragraph = introContainer.querySelector('p');

    // Muestra las letras de "HOLA" primero
    document.querySelector('.intro-container h1').classList.add('animate');

    // Después de que "HOLA" termine, muestra el párrafo
    setTimeout(() => {
        paragraph.classList.add('animate-p');
    }, 2500); // 2 segundos que dura la animación de HOLA + un pequeño extra

    // Después de que el párrafo aparezca, muestra el botón
    setTimeout(() => {
        startButton.classList.add('animate-btn');
    }, 3500); // Retraso total para el botón

    const flowerContainer = document.querySelector('.flower-container');
    const curvedTextContainer = document.querySelector('.curved-text-container');
    const message = "Espero te guste, ¡ten un bonito día!";
    
    const createCurvedText = () => {
        curvedTextContainer.innerHTML = '';
        const characters = message.split('');
        const totalLetters = characters.length;
        const totalRotation = 60;
        const startRotation = -(totalRotation / 2);
        
        characters.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            const rotation = startRotation + (index / (totalLetters - 1)) * totalRotation;
            span.style.transform = `rotate(${rotation}deg)`;
            curvedTextContainer.appendChild(span);
        });
        curvedTextContainer.classList.add('show');
    };

    const createFallingPetal = () => {
        const petal = document.createElement('div');
        petal.classList.add('petal-fall');
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${Math.random() * 7 + 8}s`;
        petal.style.animationDelay = `${Math.random() * 3}s`;
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 15000);
    };

    setInterval(createFallingPetal, 300);

    const createSunflower = (delay, initialBottomOffset = 0) => {
        const sunflower = document.createElement('div');
        sunflower.classList.add('sunflower');
        sunflower.style.bottom = `${initialBottomOffset}px`;
        flowerContainer.appendChild(sunflower);

        const stemWrapper = document.createElement('div');
        stemWrapper.style.position = 'relative';
        stemWrapper.style.width = '100%';
        stemWrapper.style.height = '100%';
        stemWrapper.style.display = 'flex';
        stemWrapper.style.flexDirection = 'column';
        stemWrapper.style.alignItems = 'center';
        stemWrapper.style.justifyContent = 'flex-end';
        sunflower.appendChild(stemWrapper);

        const stem = document.createElement('div');
        stem.classList.add('stem');
        stemWrapper.appendChild(stem);

        const leafPositions = [
            { top: '30px', left: '5px', rotate: '45deg', origin: 'left center' },
            { top: '30px', left: '-27px', rotate: '-45deg', origin: 'right center' },
            { top: '70px', left: '5px', rotate: '45deg', origin: 'left center' },
            { top: '70px', left: '-27px', rotate: '-45deg', origin: 'right center' },
            { top: '110px', left: '5px', rotate: '45deg', origin: 'left center' },
            { top: '110px', left: '-27px', rotate: '-45deg', origin: 'right center' },
        ];

        leafPositions.forEach((pos, index) => {
            const leaf = document.createElement('div');
            leaf.classList.add('leaf');
            leaf.style.top = pos.top;
            leaf.style.left = pos.left;
            leaf.style.transform = `rotate(${pos.rotate}) scale(0)`;
            leaf.style.transformOrigin = pos.origin;
            stem.appendChild(leaf);
        });

        const petalsContainerWrapper = document.createElement('div');
        petalsContainerWrapper.classList.add('petals-container-wrapper');
        sunflower.appendChild(petalsContainerWrapper);

        for (let i = 0; i < 12; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal-new');
            petal.style.transform = `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-30px)`;
            petalsContainerWrapper.appendChild(petal);
        }

        setTimeout(() => {
            sunflower.style.opacity = 1;
            stem.style.transition = 'transform 1.5s ease-in-out';
            stem.style.transform = 'scaleY(1)';
        }, delay);

        setTimeout(() => {
            stem.querySelectorAll('.leaf').forEach((leaf, index) => {
                const initialTransform = leaf.style.transform;
                leaf.style.transition = `transform 0.8s ease-out ${index * 0.1}s`;
                leaf.style.transform = initialTransform.replace('scale(0)', 'scale(1)');
            });
        }, delay + 1000);

        setTimeout(() => {
            petalsContainerWrapper.style.transition = 'transform 1.5s ease-in-out';
            petalsContainerWrapper.style.transform = 'scale(1)';
        }, delay + 2500);
    };

    startButton.addEventListener('click', () => {
        introContainer.style.opacity = '0';
        setTimeout(() => {
            introContainer.style.display = 'none';
            flowerContainer.style.display = 'flex';
            
            createSunflower(0, 0);
            createSunflower(2000, 20);
            createSunflower(4000, 0);
            createSunflower(6000, 20);
            createSunflower(8000, 0);

            setTimeout(() => {
                createCurvedText();
            }, 8000 + 1500);
        }, 1000);
    });
});