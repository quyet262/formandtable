function Bullet(x, y, speed) {
    this.status = true;
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = speed;
    this.img = new Image();
    this.img.src = "46059738-cartoon-rocket-space-ship.png";
    this.draw = function () {
        ctx.drawImage(this.img, this.x, this.y);
        this.collisionDetection();
        this.collisionDetectionBoss();
    };

    this.move = function () {
        this.x += this.dx;
        this.y += this.dy;
    };

    this.collisionDetection = function () {
        let self = this;
        obstacles.forEach(function (obstacle) {
            if (obstacle.status) {
                if (self.x > obstacle.x && self.x < obstacle.x + obstacle.width)
                    if (self.y > obstacle.y && self.y < obstacle.y + obstacle.height) {
                        self.status = false;
                        document.getElementById("audio").play();
                        obstacle.status = false;
                        score++;
                        return;
                    }
            }
        });

        if (this.x < 0)
            this.status = false;
    };
    this.collisionDetectionBoss = function () {
        let self = this;
        bosses.forEach(function (boss) {
            if (boss.status) {
                if (self.x > boss.x && self.x < boss.x + boss.width)
                    if (self.y > boss.y && self.y < boss.y + boss.height) {
                        self.status = false;
                        boss.life--;
                        return;
                    }
                if (boss.life === 0) {
                    document.getElementById("audio1").play();
                    score += 10;
                    boss.status = false;
                }
            }
        });

        if (this.x < 0)
            this.status = false;
    }
}