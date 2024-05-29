function startGame() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const shipImage = new Image();
    const bulletImage = new Image();
    const enemyImage = new Image();
    const enemyBulletImage = new Image();
    const backgroundImage = new Image();
    const bossImage = new Image();
    const bossBulletImage = new Image();

    shipImage.src = 'ship.png';
    bulletImage.src = 'bullets.png';
    enemyImage.src = 'enemy.png';
    enemyBulletImage.src = 'enemyBullets.png';
    backgroundImage.src = 'background.jpg';
    bossImage.src = 'boss.png';
    bossBulletImage.src = 'bossBullet.png';

    const ship = {
        x: canvas.width / 2 - 25,
        y: canvas.height - 60,
        width: 50,
        height: 50,
        speed: 10,
        dx: 0,
        dy: 0
    };

    const bullets = [];
    const enemies = [];
    const enemyBullets = [];
    const bossBullets = [];
    let score = 0;
    let gameOver = false;
    let level = 1;
    let enemySpeed = 2;
    let enemyBulletSpeed = 5;
    let enemyInterval = 1000;
    let boss = null;
    let shooting = false;

    function drawBackground() {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }

    function drawShip() {
        ctx.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height);
    }

    function shootBullet() {
        if (!shooting) {
            shooting = true;
            const bullet = {
                x: ship.x + ship.width / 2 - 2.5,
                y: ship.y,
                width: 10,
                height: 10,
                speed: 20
            };
            bullets.push(bullet);
            setTimeout(() => shooting = false, 200);
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

    function shootBossBullets() {
        if (boss) {
            for (let i = 0; i < 10; i++) {
                const bullet = {
                    x: boss.x + boss.width / 2 - 2.5 + (i * 10 - 45),
                    y: boss.y + boss.height,
                    width: 30,
                    height: 30,
                    speed: enemyBulletSpeed
                };
                bossBullets.push(bullet);
            }
        }
    }

    function drawBossBullets() {
        for (let i = 0; i < bossBullets.length; i++) {
            const bullet = bossBullets[i];
            ctx.drawImage(bossBulletImage, bullet.x, bullet.y, bullet.width, bullet.height);
        }
    }

    function drawScore() {
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, 10, 20);
        ctx.fillText(`Level: ${level}`, 10, 40);
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

    function updateBossBullets() {
        for (let i = 0; i < bossBullets.length; i++) {
            const bullet = bossBullets[i];
            bullet.y += bullet.speed;
            if (bullet.y > canvas.height) {
                bossBullets.splice(i, 1);
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

    function createBoss() {
        boss = {
            x: Math.random() > 0.5 ? -100 : canvas.width + 100,
            y: Math.random() * (canvas.height / 2),
            width: 100,
            height: 100,
            speed: 2,
            direction: Math.random() > 0.5 ? 1 : -1
        };
        shootBossBullets();
    }

    function drawBoss() {
        if (boss) {
            ctx.drawImage(bossImage, boss.x, boss.y, boss.width, boss.height);
        }
    }

    function updateBoss() {
        if (boss) {
            boss.x += boss.speed * boss.direction;
            if (boss.x > canvas.width || boss.x < -boss.width) {
                boss = null;
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
                    if (score % 500 === 0) {
                        createBoss();
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

        for (let i = 0; i < bossBullets.length; i++) {
            const bullet = bossBullets[i];
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

        if (boss) {
            if (
                ship.x < boss.x + boss.width &&
                ship.x + ship.width > boss.x &&
                ship.y < boss.y + boss.height &&
                ship.y + ship.height > boss.y
            ) {
                gameOver = true;
            }
        }
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
        drawShip();
        drawBullets();
        drawEnemyBullets();
        drawEnemies();
        drawBossBullets();
        drawBoss();
        drawScore();
        updateShip();
        updateBullets();
        updateEnemyBullets();
        updateEnemies();
        updateBoss();
        updateBossBullets();
        handleCollisions();

        requestAnimationFrame(update);
    }

    function moveShip(e) {
        if (e.key === 'd' || e.key === 'Right') {
            ship.dx = ship.speed;
        } else if (e.key === 'a' || e.key === 'Left') {
            ship.dx = -ship.speed;
        } else if (e.key === 'w' || e.key === 'Up') {
            ship.dy = -ship.speed;
        } else if (e.key === 's' || e.key === 'Down') {
            ship.dy = ship.speed;
        }
    }

    function stopShip(e) {
        if (e.key === 'd' || e.key === 'Right' ||
            e.key === 'a' || e.key === 'Left' ||
            e.key === 'w' || e.key === 'Up' ||
            e.key === 's' || e.key === 'Down') {
            ship.dx = 0;
            ship.dy = 0;
        }
    }

    document.addEventListener('keydown', moveShip);
    document.addEventListener('keyup', stopShip);
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') shootBullet();
    });

    let enemyCreationInterval = setInterval(createEnemy, enemyInterval);
    update();
}
