function moveShip(e, ship) {
    if (e.key === 'd' || e.key === 'ArrowRight') {
        ship.dx = ship.speed;  // Di chuyển sang phải
    } else if (e.key === 'a' || e.key === 'ArrowLeft') {
        ship.dx = -ship.speed; // Di chuyển sang trái
    } else if (e.key === 'w' || e.key === 'ArrowUp') {
        ship.dy = -ship.speed; // Di chuyển lên trên
    } else if (e.key === 's' || e.key === 'ArrowDown') {
        ship.dy = ship.speed;  // Di chuyển xuống dưới
    }
}

function stopShip(e, ship) {
    if (['d', 'ArrowRight', 'a', 'ArrowLeft', 'w', 'ArrowUp', 's', 'ArrowDown'].includes(e.key)) {
        ship.dx = 0;
        ship.dy = 0;
    }
}

function shootBullet(e, ship, bullets) {
    if (e.key === ' ') {
        const bullet = new Bullet(ship.x + ship.width / 2 - 2.5, ship.y, 10, 10, 20);
        bullets.push(bullet);
    }
}
