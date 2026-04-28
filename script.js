// =============================================
// 0. ПЕРЕМИКАННЯ ТЕМИ (ДЕННА/НІЧНА)
// =============================================

const themeToggle = document.getElementById('theme-toggle');
const currentHour = new Date().getHours();

// Автоматичне перемикання за часом доби
if (currentHour >= 7 && currentHour < 21) {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
    if (themeToggle) themeToggle.textContent = '🌙 Темний режим';
} else {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    if (themeToggle) themeToggle.textContent = '☀️ Світлий режим';
}

// Ручне перемикання по кнопці
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeToggle.textContent = '☀️ Світлий режим';
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeToggle.textContent = '🌙 Темний режим';
        }
    });
}

// =============================================
// 1. ЗБЕРІГАННЯ ДАНИХ У localStorage
// =============================================

const systemInfo = {
    platform: navigator.platform,
    browser: navigator.userAgent,
    visitTime: new Date().toLocaleString(),
    screenSize: `${window.screen.width}x${window.screen.height}`
};

localStorage.setItem('userSystem', JSON.stringify(systemInfo));

const storedData = localStorage.getItem('userSystem');
const parsedSystemInfo = JSON.parse(storedData);

const storageElement = document.getElementById('storage-info');
if (storageElement) {
    storageElement.textContent = `Система: ${parsedSystemInfo.platform} | Браузер: ${parsedSystemInfo.browser} | Час візиту: ${parsedSystemInfo.visitTime}`;
}

// =============================================
// 2. ОТРИМАННЯ ВІДГУКІВ З СЕРВЕРА
// =============================================

const reviewsContainer = document.getElementById('reviews-container');
const variantNumber = 15; 

fetch(`https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Помилка HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(comments => {
        reviewsContainer.innerHTML = '';
        
        comments.forEach(comment => {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-item';
            reviewCard.innerHTML = `
                <div class="review-header">
                    <b class="review-email">${comment.email}</b>
                </div>
                <p class="review-text">${comment.body}</p>
                <hr class="review-divider">
            `;
            reviewsContainer.appendChild(reviewCard);
        });
    })
    .catch(error => {
        console.error('Помилка:', error);
        if (reviewsContainer) {
            reviewsContainer.innerHTML = '<p class="error-message">Не вдалося завантажити відгуки.</p>';
        }
    });

// =============================================
// 3. МОДАЛЬНЕ ВІКНО ЗВОРОТНЬОГО ЗВ'ЯЗКУ
// =============================================

const modal = document.getElementById('contact-modal');
const closeButton = document.querySelector('.close-button');

// Показати модальне вікно через 1 хвилину (60000 мс)
setTimeout(() => {
    if (!sessionStorage.getItem('modalClosed')) {
        modal.style.display = 'block';
    }
}, 60000);

// Закриття модального вікна
if (closeButton) {
    closeButton.onclick = () => {
        modal.style.display = 'none';
        sessionStorage.setItem('modalClosed', 'true');
    };
}

// Закриття при кліку поза межами модального вікна
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        sessionStorage.setItem('modalClosed', 'true');
    }
};