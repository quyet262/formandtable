

function startGame() {
    // Khởi tạo các biến
    const shipImage = new Image();
    const bulletImage = new Image();
    const enemyImage = new Image();
    const enemyBulletImage = new Image();
    const backgroundImage = new Image();

    shipImage.src = 'mayBayTa.png'; // Đường dẫn tới hình ảnh của tàu
    bulletImage.src = 'dan.png'; // Đường dẫn tới hình ảnh của đạn
    enemyImage.src = 'mayBayDich.png'; // Đường dẫn tới hình ảnh của kẻ thù
    enemyBulletImage.src = 'danKeThu1.png'; // Đường dẫn tới hình ảnh của đạn kẻ thù
    backgroundImage.src = 'nen1.jpg'; // Đường dẫn tới hình ảnh của nền

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
    let score = 0;
    let gameOver = false;
    let level = 1;
    let enemySpeed = 2;
    let enemyBulletSpeed = 5;
    let enemyInterval = 1000; // Thời gian tạo kẻ thù ban đầu (1 giây)

    function drawBackground() {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }

    // Vẽ tàu
    function drawShip() {
        ctx.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height);
    }

    // Vẽ đạn
    function drawBullets() {
        bullets.forEach((bullet) => {
            ctx.drawImage(bulletImage, bullet.x, bullet.y, bullet.width, bullet.height);
        });
    }

    // Vẽ đạn kẻ thù
    function drawEnemyBullets() {
        enemyBullets.forEach((bullet) => {
            ctx.drawImage(enemyBulletImage, bullet.x, bullet.y, bullet.width, bullet.height);
        });
    }

    // Vẽ kẻ thù
    function drawEnemies() {
        enemies.forEach((enemy) => {
            ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
        });
    }

    // Vẽ điểm số
    function drawScore() {
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, 10, 20);
        ctx.fillText(`Level: ${level}`, 10, 40);
    }

    // Cập nhật vị trí tàu
    function updateShip() {
        ship.x += ship.dx;
        ship.y += ship.dy;

        // Giữ tàu trong canvas
        if (ship.x < 0) ship.x = 0;
        if (ship.x + ship.width > canvas.width) ship.x = canvas.width - ship.width;
        if (ship.y < 0) ship.y = 0;
        if (ship.y + ship.height > canvas.height) ship.y = canvas.height - ship.height;
    }

    // Cập nhật vị trí đạn
    function updateBullets() {
        bullets.forEach((bullet, index) => {
            bullet.y -= bullet.speed;
            if (bullet.y + bullet.height < 0) {
                bullets.splice(index, 1);
            }
        });
    }

    // Cập nhật vị trí đạn kẻ thù
    function updateEnemyBullets() {
        enemyBullets.forEach((bullet, index) => {
            bullet.y += bullet.speed;
            if (bullet.y > canvas.height) {
                enemyBullets.splice(index, 1);
            }
        });
    }

    // Cập nhật vị trí kẻ thù
    function updateEnemies() {
        enemies.forEach((enemy, index) => {
            enemy.y += enemy.speed;
            if (enemy.y + enemy.height > canvas.height) {
                enemies.splice(index, 1); // Chỉ loại bỏ kẻ thù khi chúng chạm đáy canvas
            } else if (Math.random() < 0.01) {
                shootEnemyBullet(enemy);
            }
        });
    }

    // Xử lý va chạm
    function handleCollisions() {
        bullets.forEach((bullet, bIndex) => {
            enemies.forEach((enemy, eIndex) => {
                if (
                    bullet.x < enemy.x + enemy.width &&
                    bullet.x + bullet.width > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + bullet.height > enemy.y
                ) {
                    bullets.splice(bIndex, 1);
                    enemies.splice(eIndex, 1);
                    score += 10;
                    if (score % 100 === 0) {
                        level++;
                        enemySpeed += 1;
                        enemyBulletSpeed += 1;
                        enemyInterval = Math.max(100, enemyInterval - 200); // Giảm thời gian tạo kẻ thù mỗi khi lên cấp
                        clearInterval(enemyCreationInterval); // Xóa interval hiện tại
                        enemyCreationInterval = setInterval(createEnemy, enemyInterval); // Tạo interval mới với thời gian tạo kẻ thù đã giảm
                    }
                }
            });
        });

        enemyBullets.forEach((bullet, index) => {
            if (
                bullet.x < ship.x + ship.width &&
                bullet.x + bullet.width > ship.x &&
                bullet.y < ship.y + ship.height &&
                bullet.y + bullet.height > ship.y
            ) {
                gameOver = true;
            }
        });

        enemies.forEach((enemy) => {
            if (
                ship.x < enemy.x + enemy.width &&
                ship.x + ship.width > enemy.x &&
                ship.y < enemy.y + enemy.height &&
                ship.y + ship.height > enemy.y
            ) {
                gameOver = true;
            }
        });
    }

    // Tạo kẻ thù mới
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

    // Tạo đạn của kẻ thù
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

    // Cập nhật trò chơi
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
        drawScore();
        updateShip();
        updateBullets();
        updateEnemyBullets();
        updateEnemies();
        handleCollisions();

        requestAnimationFrame(update);
    }

    // Di chuyển tàu bằng phím mũi tên
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

    // Dừng tàu khi không bấm phím
    function stopShip(e) {
        if (e.key === 'd' || e.key === 'Right' ||
            e.key === 'a' || e.key === 'Left' ||
            e.key === 'w' || e.key === 'Up' ||
            e.key === 's' || e.key === 'Down') {
            ship.dx = 0;
            ship.dy = 0;
        }
    }

    // Bắn đạn
    function shootBullet(e) {
        if (e.key === ' ') {
            const bullet = {
                x: ship.x + ship.width / 2 - 2.5,
                y: ship.y,
                width: 10,
                height: 10,
                speed: 20
            };
            bullets.push(bullet);
        }
    }

    // Lắng nghe sự kiện bàn phím
    document.addEventListener('keydown', moveShip);
    document.addEventListener('keyup', stopShip);
    document.addEventListener('keydown', shootBullet);
    // Tạo kẻ thù mới mỗi giây
    let enemyCreationInterval = setInterval(createEnemy, enemyInterval);
    // Bắt đầu trò chơi
    update();
}
