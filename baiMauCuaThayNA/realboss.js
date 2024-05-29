function boss() {
    const enemyBoss = new ();
    enemyBoss.src = 'boss.png';
    const bosses = [];
    let bossSpeep = 10;
    let bossbullotspeed = 50;
    let bossBullet = [];
    // Tạo boss mới
    function createboss() {
        const boss = {
            x: 0,
            y: Math.random() * (canvas.height/2 - 50),
            width: 150,
            height: 150,
            speed: bossSpeep
        };
        bosses.push(boss);
    }

    // Vẽ boss
    function drawbosses() {
        for (let i = 0; i < bosses.length; i++) {
            const boss = bosses[i];
            ctx.drawImage(enemyBoss, boss.x, boss.y, boss.width, boss.height);
        }
    }



    // Tạo đạn của boss
    function shootbossBullet(boss) {
        const bullet = {
            x: boss.x + boss.width / 2 - 2.5,
            y: boss.y + boss.height,
            width: 30,
            height: 30,
            speed: bossbullotspeed
        };
        bossBullet.push(bullet);
    }

    // Vẽ đạn boss
    function drawbossBullets() {
        for (let i = 0; i < bossBullet.length; i++) {
            const bullet = bossBullet[i];
            ctx.drawImage(enemyBulletImage, bullet.x, bullet.y, bullet.width, bullet.height);
        }
    }

}
