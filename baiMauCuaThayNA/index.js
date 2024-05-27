let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let score = 0;
let level = 1;
let lives = 3;
let ship = new Ship();
let bullets = [];
let obstacles = [];
let bosses = [];
let bulletsBoss = [];
let img1 = "spaceship-png-11552949252oedlxwxhur.png";
let img4 = "101213578-powerful-fighter-jet-fast-military-aircraft-aviation-theme-flat-vector-design-for-online-mobile-game.png";
let arrObstacle = [img1, img4, img1, img4];
let timeOutBullet = 300;
let timeOutObj = 500;
let myBullet = setInterval(shootFromShip, timeOutBullet);
setInterval(shootFromBoss, 2000);
document.addEventListener("mousemove", mouseMoveHandler, false);
let bossTrue = new Boss();
bossTrue.status = false;

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        ship.x = relativeX - ship.width / 2;
    }
}

function drawBackground() {
    let background = new Image();
    if (level === 1) {
        background.src = "img_5.png";
    } else {
        background.src = "photo-1433002208920-1362f13a93a3.jpg";
    }
    ctx.drawImage(background, 0, 0);
}

function drawScore() {
    ctx.font = "25px Arial";
    ctx.fillStyle = "#dddb00";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "25px Arial";
    ctx.fillStyle = "#b8dd00";
    ctx.fillText("Lives: " + lives, canvas.width - 100, 20);
}

function drawLevel() {
    ctx.font = "25px Arial";
    ctx.fillStyle = "#dd0011";
    ctx.fillText("Level: " + level, canvas.width / 2 - 100, 20);
}

function drawBullets(bullets) {
    bullets = bullets.filter(e => e.status);
    bullets.forEach(function (bullet) {
        bullet.draw();
        bullet.move();
    })
}

function drawBulletsBoss(bullets) {
    bulletsBoss = bullets.filter(e => e.status);
    bullets.forEach(function (bullet) {
        bullet.draw(ship);
        bullet.move();
    })
}

function isLevelUp() {
    let speedBullets = Math.floor(score / 50);
    if (score >= 50 && score % 50 === 1) {
        clearInterval(myBullet);
        timeOutBullet -= 5 * speedBullets;
        myBullet = setInterval(shootFromShip, timeOutBullet);
    }
}

setInterval(isLevelUp, 30000);

function shootFromShip() {
    let bullet = new Bullet(ship.x + ship.width / 3, ship.y, -3);
    bullets.push(bullet);
}

function shootFromBoss() {
    let bullet = new BulletBoss(bossTrue.x + bossTrue.width / 3, bossTrue.y + bossTrue.height + 5, 3);
    bulletsBoss.push(bullet);
}

function addOstacle() {
    let obstacle = new Obstacle();
    obstacle.img.src = arrObstacle[Math.round(Math.random() + 2)];
    obstacles.push(obstacle);
}

let myObs = setInterval(addOstacle, timeOutObj);

function drawObstacles() {
    obstacles = obstacles.filter(e => e.status);
    obstacles.forEach(function (obstacle) {
        obstacle.draw();
        obstacle.move();
    })
}

function addBoss() {
    let boss = new Boss();
    bossTrue = boss;
    setInterval(shootFromBoss, 300);

    bosses.push(boss);
}

setInterval(addBoss, 25000);

function drawBoss() {
    bosses = bosses.filter(e => e.status);
    bosses.forEach(function (boss) {
        boss.draw();
    })
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawBullets(bullets);
    drawObstacles();
    ship.draw();
    drawBoss();
    if (bossTrue.status === true) {
        drawBulletsBoss(bulletsBoss);
    } else {
        bulletsBoss = [];
    }
    drawLevel();
    drawScore();
    drawLives();
    requestAnimationFrame(draw);
}

draw();