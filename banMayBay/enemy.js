class Enemy {
    constructor(x, y, speed, width, height) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = width;
        this.height = height;
    }

    draw(ctx, image) {
        ctx.drawImage(image, this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed;
    }
}
