function BulletBoss(x, y, speed) {
    this.status = true;
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = speed;
    this.img = new Image();
    this.img.src = "bullet3.png";
    this.draw = function (ship) {
        ctx.drawImage(this.img, this.x, this.y);
        this.collisionDetection(ship);
    };

    this.move = function () {
        this.x += this.dx;
        this.y += this.dy;
    };

    this.collisionDetection = function (ship) {
        let self = this;
        if (lives > 0) {
            if (self.x + 24 > ship.x && self.x + 24 < ship.x + ship.width && self.y + 25 > ship.y && self.y + 25 < ship.y + ship.height) {
                self.status = false;
                lives -= 0.5;
                document.getElementById("audio3").play();
            }
        }
        if (!lives) {
            alert("GAME OVER");
            document.location.reload();
        }
    };
}