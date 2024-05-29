class Ship {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.dx = 0;
        this.dy = 0;
    }

    draw(ctx, image) {
        ctx.drawImage(image, this.x, this.y, this.width, this.height);
    }

    update(canvas) {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > canvas.height) this.y = canvas.height - this.height;
    }
}

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
