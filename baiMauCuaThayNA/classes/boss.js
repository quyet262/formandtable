function Boss() {
    this.status = true;
    this.height = 128;
    this.width = 128;
    this.life = 5;
    this.x = (canvas.width - this.width) / 2;
    this.y = 0;
    this.img = new Image();
    this.img.src = "15-155431_alien-spaceship-sprite-top-view-of-spaceship-hd.png";
    this.speed = 3;
    this.move = function () {
        if (this.x > 900 - this.width || this.x < 0) {
            this.speed = -this.speed;
        }
        this.x += this.speed;
    };
    this.draw = function () {
        this.move();
        ctx.drawImage(this.img, this.x, this.y);
    };
}