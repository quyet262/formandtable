const startButton = document.getElementById('startButton');
const startScreen = document.getElementById('startScreen');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let ship;
let bullets = [];
let enemies = [];
let enemyBullets = [];
let score = 0;
let gameOver = false;
let level = 1;
let enemySpeed = 2;
let enemyBulletSpeed = 5;
let enemyInterval = 1000;
let enemyCreationInterval;

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    canvas.style.display = 'block';
    startGame();
});

function startGame() {
    const shipImage = new Image();
    const bulletImage = new Image();
    const enemyImage = new Image();
    const enemyBulletImage = new Image();
    const backgroundImage = new Image();

    shipImage.src = 'ship.png';
    bulletImage.src = 'bullets.png';
    enemyImage.src = 'enemy.png';
    enemyBulletImage.src = 'enemyBullets.png';
    backgroundImage.src = 'background.jpg';

    ship = new Ship(canvas.width / 2 - 25, canvas.height - 60, 50, 50, 10);
    bullets = [];
    enemies = [];
    enemyBullets = [];
    score = 0;
    gameOver = false;
    level = 1;
    enemySpeed = 2;
    enemyBulletSpeed = 5;
    enemyInterval = 1000;

    function drawBackground() {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }

    function drawScore() {
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, 10, 20);
        ctx.fillText(`Level: ${level}`, 10, 40);
    }

    function update() {
        if (gameOver) {
            if (confirm(`Game Over! Your Score: ${score}\nDo you want to play again?`)) {
                document.location.reload();
            } else {
                return;
            }
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        ship.draw(ctx, shipImage);
        bullets.forEach(bullet => bullet.draw(ctx, bulletImage));
        enemies.forEach(enemy => enemy.draw(ctx, enemyImage));
        enemyBullets.forEach(bullet => bullet.draw(ctx, enemyBulletImage));
        drawScore();

        ship.update(canvas);
        bullets.forEach(bullet => bullet.update());
        enemies.forEach(enemy => enemy.update());
        enemyBullets.forEach(bullet => bullet.update());

        handleCollisions(ship, bullets, enemies, enemyBullets, () => {
            score += 10;
            if (score % 100 === 0) {
                level++;
                enemySpeed += 1;
                enemyBulletSpeed += 1;
                enemyInterval = Math.max(100, enemyInterval - 200);
                clearInterval(enemyCreationInterval);
                enemyCreationInterval = setInterval(createEnemy, enemyInterval);
            }
        }, () => gameOver = true);

        requestAnimationFrame(update);
    }

    function createEnemy() {
        const enemy = new Enemy(Math.random() * (canvas.width - 50), 0, enemySpeed, 50, 50);
        enemies.push(enemy);
    }

    document.addEventListener('keydown', (e) => moveShip(e, ship));
    document.addEventListener('keyup', (e) => stopShip(e, ship));
    document.addEventListener('keydown', (e) => shootBullet(e, ship, bullets));

    enemyCreationInterval = setInterval(createEnemy, enemyInterval);

    update();
}
