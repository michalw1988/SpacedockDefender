class missile {
	constructor(angle, distance) {
		this.angle = angle;
		this.distance = distance;
		this.x = 400;
		this.y = 300;
		this.speed = 4;
	}
	drawMissile() {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle * Math.PI / 180);
		ctx.drawImage(missileImage, -missileImage.width/2, -missileImage.height/2);
		var gradient = ctx.createLinearGradient(-60,0,60,0);
		gradient.addColorStop(0,"rgba(0,0,0,0)");
		gradient.addColorStop(1,"white");
		ctx.fillStyle = gradient;
		ctx.fillRect(-30,-0.5,30,1);
		ctx.restore();
	}
	recalculateMissile() {
		this.x += this.speed * Math.cos(this.angle * Math.PI / 180);
		this.y += this.speed * Math.sin(this.angle * Math.PI / 180);		
		this.distance -= this.speed;
	}
}

class enemyMissile {
	constructor(x, y, angle, speed, type) {
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.speed = speed;
		this.type = type;
	}
	drawMissile() {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle * Math.PI / 180);
		if (this.type == 1) {
			var gradient = ctx.createLinearGradient(0,0,30,0);
			gradient.addColorStop(1,"rgba(0,0,0,0)");
			gradient.addColorStop(0,"rgba(245,0,0,0.7)");
			ctx.fillStyle = gradient;
			ctx.fillRect(0,-0.5,20,1);
		} 
		else if (this.type == 2) {
			var gradient = ctx.createLinearGradient(0,0,30,0);
			gradient.addColorStop(1,"rgba(0,0,0,0)");
			gradient.addColorStop(0,"rgba(245,166,39,0.6)");
			ctx.fillStyle = gradient;
			ctx.fillRect(0,-0.5,20,1);
		}
		else if (this.type == 3) {
			ctx.drawImage(enemyMissileImage, -enemyMissileImage.width/2, -enemyMissileImage.height/2);
			var gradient = ctx.createLinearGradient(0,0,30,0);
			gradient.addColorStop(1,"rgba(0,0,0,0)");
			gradient.addColorStop(0,"rgba(73,214,214,0.7)");
			ctx.fillStyle = gradient;
			ctx.fillRect(0,-0.5,20,1);
		}
		ctx.restore();
	}
	recalculateMissile() {
		this.x -= this.speed * Math.cos(this.angle * Math.PI / 180);
		this.y -= this.speed * Math.sin(this.angle * Math.PI / 180);
	}
}