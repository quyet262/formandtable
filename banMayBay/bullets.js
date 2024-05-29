class Bullet {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    draw(ctx, image) {
        ctx.drawImage(image, this.x, this.y, this.width, this.height);
    }

    update() {
        this.y -= this.speed;
    }
}

function shootBullet(e, ship, bullets) {
    if (e.key === ' ') {
        const bullet = new Bullet(ship.x + ship.width / 2 - 2.5, ship.y, 10, 10, 20);
        bullets.push(bullet);
    }
}
