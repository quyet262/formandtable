document.addEventListener('keydown', (e) => moveShip(e, ship));
document.addEventListener('keyup', (e) => stopShip(e, ship));
document.addEventListener('keydown', (e) => shootBullet(e, ship, bullets));
