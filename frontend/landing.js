document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('animatedText');
    const texts = [
        'Responsive.',
        'Reliable.',
        'Innovative.',
        'IT Support.'
    ];
    let textIndex = 0;
    let charIndex = 0;
    const typingSpeed = 100;
    const eraseSpeed = 50;
    const delayBetweenTexts = 1500;

    function type() {
        if (charIndex < texts[textIndex].length) {
            textElement.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, delayBetweenTexts);
        }
    }

    function erase() {
        if (charIndex > 0) {
            textElement.textContent = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, eraseSpeed);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, typingSpeed + 200);
        }
    }

    // Start the animation
    type();
});