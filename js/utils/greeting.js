/**
 * Determines the appropriate greeting based on the current time of day
 * @returns {Object} Object containing greeting text and appropriate emoji
 */
function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
        return {
            text: "Good morning",
            emoji: "☀️" // Sun for morning
        };
    } else if (hour >= 12 && hour < 17) {
        return {
            text: "Good afternoon",
            emoji: "🌤️" // Sun with cloud for afternoon
        };
    } else if (hour >= 17 && hour < 22) {
        return {
            text: "Good evening",
            emoji: "🌇" // Sunset over buildings for evening
        };
    } else {
        return {
            text: "Good night",
            emoji: "🌙" // Moon for night
        };
    }
}

fetch('data/user_info.json')
    .then(response => response.json())
    .then(data => {
        const greeting = getTimeBasedGreeting();
        const greetingElement = document.getElementById('greeting');
        greetingElement.innerHTML = `<strong>${greeting.text}</strong>, ${data.name} <span class="emoji">${greeting.emoji}</span>`;
        
        // Set font size based on preference or device
        const fontSize = localStorage.getItem('preferredFontSize') || '30px';
        greetingElement.style.fontSize = fontSize;
    })
    .catch(error => {
        console.error('Error loading user data:', error);
        document.getElementById('greeting').textContent = 'Error loading user information';
    });