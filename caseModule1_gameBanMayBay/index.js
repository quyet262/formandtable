const startButton = document.getElementById('startButton');
const startScreen = document.getElementById('startScreen');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

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

    const bullets = [];
    const enemies = [];
    const enemyBullets = [];
    let score = 0;
    let gameOver = false;
    let level = 1;
    let enemySpeed = 2;
    let enemyBulletSpeed = 5;
    let enemyInterval = 1000;

    let highScore = localStorage.getItem('highScore') || 0;

    function drawBackground() {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }

    const ship = {
        x: canvas.width / 2 - 25,
        y: canvas.height - 60,
        width: 50,
        height: 50,
        speed: 10,
        dx: 0,
        dy: 0
    };

    function drawShip() {
        ctx.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height);
    }

    function shootBullet(e) {
        if (e.key === ' ') {
            const bullet = {
                x: ship.x + ship.width / 2 - 5,
                y: ship.y,
                width: 10,
                height: 10,
                speed: 20
            };
            bullets.push(bullet);
        }
    }

    function drawBullets() {
        for (let i = 0; i < bullets.length; i++) {
            const bullet = bullets[i];
            ctx.drawImage(bulletImage, bullet.x, bullet.y, bullet.width, bullet.height);
        }
    }

    function createEnemy() {
        const enemy = {
            x: Math.random() * (canvas.width - 50),
            y: 0,
            width: 50,
            height: 50,
            speed: enemySpeed
        };
        enemies.push(enemy);
    }

    function drawEnemies() {
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
        }
    }

    function shootEnemyBullet(enemy) {
        const bullet = {
            x: enemy.x + enemy.width / 2 - 2.5,
            y: enemy.y + enemy.height,
            width: 10,
            height: 10,
            speed: enemyBulletSpeed
        };
        enemyBullets.push(bullet);
    }

    function drawEnemyBullets() {
        for (let i = 0; i < enemyBullets.length; i++) {
            const bullet = enemyBullets[i];
            ctx.drawImage(enemyBulletImage, bullet.x, bullet.y, bullet.width, bullet.height);
        }
    }

    function drawScore() {
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, 10, 20);
        ctx.fillText(`Level: ${level}`, 10, 40);
        ctx.fillText(`High Score: ${highScore}`, 10, 60);
    }

    function updateShip() {
        ship.x += ship.dx;
        ship.y += ship.dy;

        if (ship.x < 0) ship.x = 0;
        if (ship.x + ship.width > canvas.width) ship.x = canvas.width - ship.width;
        if (ship.y < 0) ship.y = 0;
        if (ship.y + ship.height > canvas.height) ship.y = canvas.height - ship.height;
    }

    function updateBullets() {
        for (let i = 0; i < bullets.length; i++) {
            const bullet = bullets[i];
            bullet.y -= bullet.speed;
            if (bullet.y + bullet.height < 0) {
                bullets.splice(i, 1);
                i--;
            }
        }
    }

    function updateEnemyBullets() {
        for (let i = 0; i < enemyBullets.length; i++) {
            const bullet = enemyBullets[i];
            bullet.y += bullet.speed;
            if (bullet.y > canvas.height) {
                enemyBullets.splice(i, 1);
                i--;
            }
        }
    }


    function updateEnemies() {
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            enemy.y += enemy.speed;
            if (enemy.y + enemy.height > canvas.height) {
                enemies.splice(i, 1);
                i--;
            } else if (Math.random() < 0.01) {
                shootEnemyBullet(enemy);
            }
        }
    }

    function handleCollisions() {
        for (let bIndex = 0; bIndex < bullets.length; bIndex++) {
            const bullet = bullets[bIndex];
            for (let eIndex = 0; eIndex < enemies.length; eIndex++) {
                const enemy = enemies[eIndex];
                if (
                    bullet.x < enemy.x + enemy.width &&
                    bullet.x + bullet.width > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + bullet.height > enemy.y
                ) {
                    bullets.splice(bIndex, 1);
                    bIndex--;
                    enemies.splice(eIndex, 1);
                    eIndex--;
                    score += 10;
                    if (score % 100 === 0) {
                        level++;
                        enemySpeed += 1;
                        enemyBulletSpeed += 1;
                        enemyInterval = Math.max(100, enemyInterval - 200);
                        clearInterval(enemyCreationInterval);
                        enemyCreationInterval = setInterval(createEnemy, enemyInterval);
                    }
                }
            }
        }

        for (let i = 0; i < enemyBullets.length; i++) {
            const bullet = enemyBullets[i];
            if (
                bullet.x < ship.x + ship.width &&
                bullet.x + bullet.width > ship.x &&
                bullet.y < ship.y + ship.height &&
                bullet.y + bullet.height > ship.y
            ) {
                gameOver = true;
            }
        }

        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            if (
                ship.x < enemy.x + enemy.width &&
                ship.x + ship.width > enemy.x &&
                ship.y < enemy.y + enemy.height &&
                ship.y + ship.height > enemy.y
            ) {
                gameOver = true;
            }
        }
    }

    function update() {
        if (gameOver) {
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore);
            }
            if (confirm(`Game Over! Your Score: ${score}\nHigh Score: ${highScore}\nDo you want to play again?`)) {
                document.location.reload();
            } else {
                return;
            }
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        drawShip();
        drawBullets();
        drawEnemyBullets();
        drawEnemies();
        drawScore();
        updateShip();
        updateBullets();
        updateEnemyBullets();
        updateEnemies();
        handleCollisions();

        requestAnimationFrame(update);
    }

    function moveShip(e) {
        if (e.key === 'd' || e.key === 'ArrowRight') {
            ship.dx = ship.speed;
        } else if (e.key === 'a' || e.key === 'ArrowLeft') {
            ship.dx = -ship.speed;
        } else if (e.key === 'w' || e.key === 'ArrowUp') {
            ship.dy = -ship.speed;
        } else if (e.key === 's' || e.key === 'ArrowDown') {
            ship.dy = ship.speed;
        }
    }

    function stopShip(e) {
        if (e.key === 'd' || e.key === 'ArrowRight' ||
            e.key === 'a' || e.key === 'ArrowLeft' ||
            e.key === 'w' || e.key === 'ArrowUp' ||
            e.key === 's' || e.key === 'ArrowDown') {
            ship.dx = 0;
            ship.dy = 0;
        }
    }

    document.addEventListener('keydown', moveShip);
    document.addEventListener('keyup', stopShip);
    document.addEventListener('keydown', shootBullet);

    let enemyCreationInterval = setInterval(createEnemy, enemyInterval);

    update();
}
