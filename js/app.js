fetch('data/user_info.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('greeting').textContent = `Good morning, ${data.name}`;
    })
    .catch(error => {
        console.error('Error loading user data:', error);
        document.getElementById('greeting').textContent = 'Error loading user information';
    });