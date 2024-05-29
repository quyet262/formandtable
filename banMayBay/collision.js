function handleCollisions(ship, bullets, enemies, enemyBullets, scoreCallback, gameOverCallback) {
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
                scoreCallback();
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
            gameOverCallback();
        }
    }

    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        if (
            enemy.x < ship.x + ship.width &&
            enemy.x + enemy.width > ship.x &&
            enemy.y < ship.y + ship.height &&
            enemy.y + enemy.height > ship.y
        ) {
            gameOverCallback();
        }
    }
}
