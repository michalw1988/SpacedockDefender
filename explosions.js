// class for particle
class particle {
  constructor(x, y, angle, speed, radius, colourR, colourG, colourB, colourA) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.radius = radius;
    this.colourR = colourR;
    this.colourG = colourG;
    this.colourB = colourB;
    this.colourA = colourA;
  }
  
  drawParticle() {
    ctx.fillStyle = "rgba(" + this.colourR + "," + this.colourG + "," + this.colourB + "," + this.colourA + ")";
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
  }
}


// class for explosion
class explosion {
  constructor(x, y, lifeSpan, delay, type) {
	// parameters for all types
    this.x = x;
    this.y = y;
    this.lifeSpan = lifeSpan;
    this.delay = delay;
    this.particleList = [];

    // explosion parameters depending on type
    this.PARTICLE_COUNT = 0;
    this.PARTICLE_START_SPEED_1 = 0;
    this.PARTICLE_START_SPEED_2 = 0;
    this.PARTICLE_RADIUS_1 = 0;
    this.PARTICLE_RADIUS_2 = 0;
    this.PARTICLE_COLOR_R_START = 0;
    this.PARTICLE_COLOR_G_START = 0;
    this.PARTICLE_COLOR_B_START = 0;
    this.PARTICLE_COLOR_A_START = 0;
    this.PARTICLE_SPEED_CHANGE = 0;
    this.PARTICLE_RADIUS_CHANGE = 0;
    this.PARTICLE_COLOR_R_CHANGE = 0;
    this.PARTICLE_COLOR_G_CHANGE = 0;
    this.PARTICLE_COLOR_B_CHANGE = 0;
    this.PARTICLE_COLOR_A_CHANGE = 0;

    // setting parameters depending on type
    if (type == 1) {
	  // ship explosion
      this.PARTICLE_COUNT = 25;
      this.PARTICLE_START_SPEED_1 = 3;
      this.PARTICLE_START_SPEED_2 = 0;
      this.PARTICLE_RADIUS_1 = 10;
      this.PARTICLE_RADIUS_2 = 20;
      this.PARTICLE_COLOR_R_START = 255;
      this.PARTICLE_COLOR_G_START = 255;
      this.PARTICLE_COLOR_B_START = 170;
      this.PARTICLE_COLOR_A_START = 1;
      this.PARTICLE_SPEED_CHANGE = 0.83;
      this.PARTICLE_RADIUS_CHANGE = 0.92;
      this.PARTICLE_COLOR_R_CHANGE = 0;
      this.PARTICLE_COLOR_G_CHANGE = -8;
      this.PARTICLE_COLOR_B_CHANGE = -40;
      this.PARTICLE_COLOR_A_CHANGE = 0.87;
    }   
    else if (type == 2) {
      this.PARTICLE_COUNT = 1;
      this.PARTICLE_START_SPEED_1 = 0;
      this.PARTICLE_START_SPEED_2 = 0;
      this.PARTICLE_RADIUS_1 = 0;
      this.PARTICLE_RADIUS_2 = 17;
      this.PARTICLE_COLOR_R_START = 255;
      this.PARTICLE_COLOR_G_START = 100;
      this.PARTICLE_COLOR_B_START = 0;
      this.PARTICLE_COLOR_A_START = 1;
      this.PARTICLE_SPEED_CHANGE = 1;
      this.PARTICLE_RADIUS_CHANGE = 1.1;
      this.PARTICLE_COLOR_R_CHANGE = 0;
      this.PARTICLE_COLOR_G_CHANGE = -80;
      this.PARTICLE_COLOR_B_CHANGE = -0;
      this.PARTICLE_COLOR_A_CHANGE = 0.75;
    }
	// big missile explosion
	else if (type == 3) {
      this.PARTICLE_COUNT = 30;
      this.PARTICLE_START_SPEED_1 = 2;
      this.PARTICLE_START_SPEED_2 = 0;
      this.PARTICLE_RADIUS_1 = 6;
      this.PARTICLE_RADIUS_2 = 12;
      this.PARTICLE_COLOR_R_START = 255;
      this.PARTICLE_COLOR_G_START = 255;
      this.PARTICLE_COLOR_B_START = 170;
      this.PARTICLE_COLOR_A_START = 1;
      this.PARTICLE_SPEED_CHANGE = 0.83;
      this.PARTICLE_RADIUS_CHANGE = 0.92;
      this.PARTICLE_COLOR_R_CHANGE = 0;
      this.PARTICLE_COLOR_G_CHANGE = -8;
      this.PARTICLE_COLOR_B_CHANGE = -40;
      this.PARTICLE_COLOR_A_CHANGE = 0.87;
    }   
    else if (type == 4) {
	  this.PARTICLE_COUNT = 1;
      this.PARTICLE_START_SPEED_1 = 0;
      this.PARTICLE_START_SPEED_2 = 0;
      this.PARTICLE_RADIUS_1 = 0;
      this.PARTICLE_RADIUS_2 = 15;
      this.PARTICLE_COLOR_R_START = 255;
      this.PARTICLE_COLOR_G_START = 100;
      this.PARTICLE_COLOR_B_START = 0;
      this.PARTICLE_COLOR_A_START = 1;
      this.PARTICLE_SPEED_CHANGE = 1;
      this.PARTICLE_RADIUS_CHANGE = 1.05;
      this.PARTICLE_COLOR_R_CHANGE = 0;
      this.PARTICLE_COLOR_G_CHANGE = -80;
      this.PARTICLE_COLOR_B_CHANGE = -0;
      this.PARTICLE_COLOR_A_CHANGE = 0.8;
    }
	// small missile
	else if (type == 5) {
      this.PARTICLE_COUNT = 20;
      this.PARTICLE_START_SPEED_1 = 1;
      this.PARTICLE_START_SPEED_2 = 0;
      this.PARTICLE_RADIUS_1 = 4;
      this.PARTICLE_RADIUS_2 = 8;
      this.PARTICLE_COLOR_R_START = 255;
      this.PARTICLE_COLOR_G_START = 255;
      this.PARTICLE_COLOR_B_START = 170;
      this.PARTICLE_COLOR_A_START = 1;
      this.PARTICLE_SPEED_CHANGE = 0.83;
      this.PARTICLE_RADIUS_CHANGE = 0.92;
      this.PARTICLE_COLOR_R_CHANGE = 0;
      this.PARTICLE_COLOR_G_CHANGE = -8;
      this.PARTICLE_COLOR_B_CHANGE = -40;
      this.PARTICLE_COLOR_A_CHANGE = 0.87;
    }   
    else if (type == 6) {
	  this.PARTICLE_COUNT = 1;
      this.PARTICLE_START_SPEED_1 = 0;
      this.PARTICLE_START_SPEED_2 = 0;
      this.PARTICLE_RADIUS_1 = 0;
      this.PARTICLE_RADIUS_2 = 10;
      this.PARTICLE_COLOR_R_START = 255;
      this.PARTICLE_COLOR_G_START = 100;
      this.PARTICLE_COLOR_B_START = 0;
      this.PARTICLE_COLOR_A_START = 1;
      this.PARTICLE_SPEED_CHANGE = 1;
      this.PARTICLE_RADIUS_CHANGE = 1.05;
      this.PARTICLE_COLOR_R_CHANGE = 0;
      this.PARTICLE_COLOR_G_CHANGE = -80;
      this.PARTICLE_COLOR_B_CHANGE = -0;
      this.PARTICLE_COLOR_A_CHANGE = 0.8;
    }

    // add start particles
    for (var i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particleList.push(new particle(
        this.x,
        this.y,
        Math.floor(Math.random() * 360),
        Math.random() * this.PARTICLE_START_SPEED_1 + this.PARTICLE_START_SPEED_2,
        Math.random() * this.PARTICLE_RADIUS_1 + this.PARTICLE_RADIUS_2,
        this.PARTICLE_COLOR_R_START,
        this.PARTICLE_COLOR_G_START,
        this.PARTICLE_COLOR_B_START,
        this.PARTICLE_COLOR_A_START));
    }
  }
	
  // drawing all particles for this frame
  drawParticles() {
    for (var i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particleList[i].drawParticle();
    }
    this.recalculateValues();
  }

	// recalculating particle values
  recalculateValues() {
  	this.lifeSpan--;
    for (var i = 0; i < this.PARTICLE_COUNT; i++) {
      var radians = this.particleList[i].angle * Math.PI / 180;
      var speed = this.particleList[i].speed;
      this.particleList[i].x += Math.sin(radians) * speed - Math.cos(radians) * speed;
      this.particleList[i].y += Math.cos(radians) * speed + Math.sin(radians) * speed;
      this.particleList[i].speed *= this.PARTICLE_SPEED_CHANGE;
      this.particleList[i].radius *= this.PARTICLE_RADIUS_CHANGE;
      this.particleList[i].colourR += this.PARTICLE_COLOR_R_CHANGE;
      this.particleList[i].colourG += this.PARTICLE_COLOR_G_CHANGE;
      this.particleList[i].colourB += this.PARTICLE_COLOR_B_CHANGE;
      this.particleList[i].colourA *= this.PARTICLE_COLOR_A_CHANGE;
    }
  }
}


// class for spark
class spark {
  constructor(x, y, lifeSpan, delay) {
		// parameters for all types
    this.x = x;
    this.y = y;
    this.lifeSpan = lifeSpan;
    this.delay = delay;
    this.particleList = [];
  
  	this.PARTICLE_COUNT = 6;
    this.PARTICLE_START_SPEED_1 = 0;
    this.PARTICLE_START_SPEED_2 = 1;
    this.PARTICLE_RADIUS_1 = 0;
    this.PARTICLE_RADIUS_2 = 1;
    this.PARTICLE_COLOR_R_START = 140;
    this.PARTICLE_COLOR_G_START = 240;
    this.PARTICLE_COLOR_B_START = 240;
    this.PARTICLE_COLOR_A_START = 1;
    this.PARTICLE_SPEED_CHANGE =0.9;
    this.PARTICLE_RADIUS_CHANGE = 0.8;
    this.PARTICLE_COLOR_R_CHANGE = 0;
    this.PARTICLE_COLOR_G_CHANGE = 0;
    this.PARTICLE_COLOR_B_CHANGE = 0;
    this.PARTICLE_COLOR_A_CHANGE = 0.87;
  
  
  	// add start particles
    for (var i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particleList.push(new particle(
        this.x,
        this.y,
        Math.floor(Math.random() * 60) + i*60,
        Math.random() * this.PARTICLE_START_SPEED_1 + this.PARTICLE_START_SPEED_2,
        Math.random() * this.PARTICLE_RADIUS_1 + this.PARTICLE_RADIUS_2,
        this.PARTICLE_COLOR_R_START,
        this.PARTICLE_COLOR_G_START,
        this.PARTICLE_COLOR_B_START,
        this.PARTICLE_COLOR_A_START));
    }
  }
  
  // drawing all particles for this frame
  drawParticles() {
    for (var i = 0; i < this.particleList.length; i++) {
      this.particleList[i].drawParticle();
    }
    this.addNewParticles();
    this.recalculateValues();
  }

	addNewParticles() {
  	for (var i = 0; i < 6; i++) {
    	this.particleList.push(new particle(
        this.particleList[i].x,
        this.particleList[i].y,
        this.particleList[i].angle,
        this.particleList[i].speed-1,
        this.particleList[i].radius,
        this.particleList[i].colourR,
    		this.particleList[i].colourG,
    		this.particleList[i].colourB,
    		this.particleList[i].colourA));
    }
  }

	// recalculating particle values
  recalculateValues() {
  	this.lifeSpan--;
    for (var i = 0; i < this.particleList.length; i++) {
      var radians = this.particleList[i].angle * Math.PI / 180;
      var speed = this.particleList[i].speed;
      this.particleList[i].x += Math.sin(radians) * speed - Math.cos(radians) * speed;
      this.particleList[i].y += Math.cos(radians) * speed + Math.sin(radians) * speed;
      this.particleList[i].speed *= this.PARTICLE_SPEED_CHANGE;
      this.particleList[i].radius *= this.PARTICLE_RADIUS_CHANGE;
      this.particleList[i].colourR += this.PARTICLE_COLOR_R_CHANGE;
      this.particleList[i].colourG += this.PARTICLE_COLOR_G_CHANGE;
      this.particleList[i].colourB += this.PARTICLE_COLOR_B_CHANGE;
      this.particleList[i].colourA *= this.PARTICLE_COLOR_A_CHANGE;
    }
  }
}