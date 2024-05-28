const startButton = document.getElementById('startButton');
const startScreen = document.getElementById('startScreen');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none'; // Ẩn trang bắt đầu
    canvas.style.display = 'block'; // Hiển thị canvas
    startGame(); // Bắt đầu trò chơi
});