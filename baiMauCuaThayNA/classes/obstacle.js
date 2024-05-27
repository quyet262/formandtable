function Obstacle() {

    this.status = true;
    this.x = Math.round(Math.random() * canvas.height);
    this.y = 0;
    this.dx = Math.random();
    this.dy = 2;
    this.width = 72;
    this.height = 72;
    this.img = new Image();
    this.img.src = "bat-icon.png";
    this.draw = function () {
        ctx.drawImage(this.img, this.x, this.y);
        this.collisionDetection();
    };

    this.move = function () {
        this.x += this.dx;
        this.y += this.dy;
    };

    this.collisionDetection = function () {
        if (score > 100) {
            this.dy = 5;
            level = 2;
        } else if (score > 300) {
            this.dy = 10;
            level = 3;
        } else if (score > 500) {
            this.dy = 20;
            level = 4;
        }

        if (this.x > canvas.width || this.x < 0 || this.y + this.height > canvas.height) {
            this.status = false;
            return;
        }

        if (this.y + this.height > canvas.height - ship.height && (this.x > ship.x && this.x < ship.x + ship.width || ship.x >= this.x && ship.x < this.x + this.width)) {
            lives--;
            document.getElementById("audio3").play();
            if (!lives) {
                alert("GAME OVER");
                document.getElementById("audio3").play();
                document.location.reload();
            }
            this.status = false;
        }
    }
}