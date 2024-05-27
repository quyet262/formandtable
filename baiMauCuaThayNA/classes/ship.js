function Ship() {
    this.height = 80;
    this.width = 80;
    this.x = (canvas.width - this.width) / 2;
    this.y = canvas.height - this.height;
    this.img = new Image();
    this.img.src = "17409424-jet-airplane-isolated-on-white-top-view-.png";
    this.draw = function () {
        ctx.drawImage(this.img, this.x, this.y);
    };
}