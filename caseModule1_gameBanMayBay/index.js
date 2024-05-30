const startButton = document.getElementById('startButton');
const startScreen = document.getElementById('startScreen');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none'; // Ẩn trang bắt đầu
    canvas.style.display = 'block'; // Hiển thị canvas
    startGame(); // Bắt đầu trò chơi
});

function startGame() {
    // Khởi tạo các biến
    const shipImage = new Image();
    const bulletImage = new Image();
    const enemyImage = new Image();
    const enemyBulletImage = new Image();
    const backgroundImage = new Image();

    shipImage.src = 'ship.png'; // Đường dẫn tới hình ảnh của tàu
    bulletImage.src = 'bullets.png'; // Đường dẫn tới hình ảnh của đạn
    enemyImage.src = 'enemy.png'; // Đường dẫn tới hình ảnh của kẻ thù
    enemyBulletImage.src = 'enemyBullets.png'; // Đường dẫn tới hình ảnh của đạn kẻ thù
    backgroundImage.src = 'background.jpg'; // Đường dẫn tới hình ảnh của nền

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

    // Lấy điểm cao từ Local Storage
    let highScore = localStorage.getItem('highScore') || 0;

    function drawBackground() {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }

    // Vẽ tàu
    function drawShip() {
        ctx.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height);
    }

    // Bắn đạn
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

    // Vẽ đạn
    function drawBullets() {
        for (let i = 0; i < bullets.length; i++) {
            const bullet = bullets[i];
            ctx.drawImage(bulletImage, bullet.x, bullet.y, bullet.width, bullet.height);
        }
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

    // Vẽ kẻ thù
    function drawEnemies() {
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
        }
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

    // Vẽ đạn kẻ thù
    function drawEnemyBullets() {
        for (let i = 0; i < enemyBullets.length; i++) {
            const bullet = enemyBullets[i];
            ctx.drawImage(enemyBulletImage, bullet.x, bullet.y, bullet.width, bullet.height);
        }
    }

    // Vẽ điểm số
    function drawScore() {
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, 10, 20);
        ctx.fillText(`Level: ${level}`, 10, 40);
        ctx.fillText(`High Score: ${highScore}`, 10, 60); // Hiển thị điểm cao
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
        for (let i = 0; i < bullets.length; i++) {
            const bullet = bullets[i];
            bullet.y -= bullet.speed;
            if (bullet.y + bullet.height < 0) {
                bullets.splice(i, 1);
                i--; // Điều chỉnh chỉ số sau khi xóa phần tử
            }
        }
    }

    // Cập nhật vị trí đạn kẻ thù
    function updateEnemyBullets() {
        for (let i = 0; i < enemyBullets.length; i++) {
            const bullet = enemyBullets[i];
            bullet.y += bullet.speed;
            if (bullet.y > canvas.height) {
                enemyBullets.splice(i, 1);
                i--; // Điều chỉnh chỉ số sau khi xóa phần tử
            }
        }
    }

    // Cập nhật vị trí kẻ thù
    function updateEnemies() {
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            enemy.y += enemy.speed;
            if (enemy.y + enemy.height > canvas.height) {
                enemies.splice(i, 1); // Chỉ loại bỏ kẻ thù khi chúng chạm đáy canvas
                i--; // Điều chỉnh chỉ số sau khi xóa phần tử
            } else if (Math.random() < 0.01) {
                shootEnemyBullet(enemy);
            }
        }
    }

    // Xử lý va chạm
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
                    bIndex--; // Điều chỉnh chỉ số sau khi xóa phần tử
                    enemies.splice(eIndex, 1);
                    eIndex--; // Điều chỉnh chỉ số sau khi xóa phần tử
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

    // Cập nhật trò chơi
    function update() {
        if (gameOver) {
            // Cập nhật điểm cao nếu người chơi đạt điểm cao mới
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

    // Di chuyển tàu bằng phím mũi tên
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

    // Dừng tàu khi không bấm phím
    function stopShip(e) {
        if (e.key === 'd' || e.key === 'ArrowRight' ||
            e.key === 'a' || e.key === 'ArrowLeft' ||
            e.key === 'w' || e.key === 'ArrowUp' ||
            e.key === 's' || e.key === 'ArrowDown') {
            ship.dx = 0;
            ship.dy = 0;
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
