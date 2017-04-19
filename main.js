var canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 600;
var ctx = canvas.getContext("2d");

canvas.addEventListener("mousemove", mouseMove);

var preloading = setInterval(preloading, 100);
var mainLoop;

var whatToDisplay = 0; // 0 - menu, 1 - select level, 2 - about, 3 - game

// mouse coordinates;
var mouseX = 0;
var mouseY = 0;
var angleDeg = 0;

var level = 0;
var needToLoad = true;

var ammo = 0;
var dockHP = 0;

var elementAMinValue = 265;
var elementAMaxValue = 285;
var elementACurrentPos = 275;
var isElementAMoving = false;
var elementAMoveRange = 0;

var elementBMinValue = 300;
var elementBMaxValue = 320;
var elementBCurrentPos = 310;
var isElementBMoving = false;
var elementBMoveRange = 0;



var enemyList = [];
var missileList = [];
var enemyMissileList = [];
var explosionList = [];

var levelCompletedCountdown = -1;
var levelFailedCountdown = -1;

var soundSettings = true;

var bgLoop = new Howl({
	src: ['sound/Shurrikane_A_King.ogg'],
	loop: true,
	volume: 0.3
	});
var missileSound = new Howl({
	src: ['sound/missileLaunch.wav'],
	volume: 0.05
	});
var enemyMissileSound = new Howl({
	src: ['sound/missileLaunch.wav'],
	volume: 0.01
	});
var smallExplosionSound = new Howl({
	src: ['sound/smallExplosion.wav'],
	volume: 0.05
	});
var bigExplosionSound = new Howl({
	src: ['sound/bigExplosion.wav'],
	volume: 0.5
	});
var laserSound = new Howl({
	src: ['sound/laser.wav'],
	volume: 0.02
	});
var winSound = new Howl({
	src: ['sound/win.wav'],
	volume: 0.1
	});

// ******************************************************* //

// display "Loading..." screen until assets are not loaded
function preloading() {
	if (
		menuBackGroundImage.ready == true &&
		menu1aImage.ready == true &&
		menu2aImage.ready == true &&
		menu3aImage.ready == true &&
		menu4aImage.ready == true &&
		menu1bImage.ready == true &&
		menu2bImage.ready == true &&
		menu3bImage.ready == true &&
		menu4bImage.ready == true &&		
		starsImage.ready == true &&
		dockAImage.ready == true &&
		dockBImage.ready == true &&
		dockCImage.ready == true &&
		dockDImage.ready == true &&
		bigShipImage.ready == true &&
		launcherImage.ready == true &&
		missileImage.ready == true &&
		enemyMissileImage.ready == true &&
		enemyShipsImage.ready == true &&
		missileSound.state() == 'loaded' &&
		enemyMissileSound.state() == 'loaded' &&
		smallExplosionSound.state() == 'loaded' &&
		bigExplosionSound.state() == 'loaded' &&
		laserSound.state() == 'loaded' &&
		winSound.state() == 'loaded' &&
		bgLoop.state() == 'loaded'
		) {
		clearInterval(preloading);
		mainLoop = setInterval(mainLoop, 33);		
		canvas.addEventListener("click", menuMouseClick);	
		
		bgLoop.play();
	}
	else {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, 800, 600);
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.font = "20px Verdana";
		ctx.fillText("Loading...", 400, 310);
	}
}


// displaying menu, specific screen or game
function mainLoop() {
	if (whatToDisplay == 0) {
		displayMenu();
	}
	else if (whatToDisplay == 1) {
		displaySelectLevelScreen();
	}
	else if (whatToDisplay == 2) {
		displayAboutScreen();
	}
	else if (whatToDisplay == 3) {
		displayGame(level);
	}
}


// displaying main menu
function displayMenu() {
	ctx.drawImage(menuBackGroundImage, 0, 0);
	
	if (mouseX >= 251 && mouseX <= 549 && mouseY >= 350 && mouseY <= 369) {
		ctx.drawImage(menu1bImage, 251, 350);
	}
	else {
		ctx.drawImage(menu1aImage, 251, 350);
	}
	if (mouseX >= 326 && mouseX <= 474 && mouseY >= 390 && mouseY <= 409) {
		ctx.drawImage(menu2bImage, 251, 390);
	}
	else {
		ctx.drawImage(menu2aImage, 251, 390);
	}
	if (mouseX >= 281 && mouseX <= 519 && mouseY >= 430 && mouseY <= 449) {
		if (soundSettings == true) {
			ctx.drawImage(menu3bImage, 251, 430);
		}
		else {
			ctx.drawImage(menu4bImage, 251, 430);
		}
	}
	else {
		if (soundSettings == true) {
			ctx.drawImage(menu3aImage, 251, 430);
		}
		else {
			ctx.drawImage(menu4aImage, 251, 430);
		}
	}
}


// displaying select level screen
function displaySelectLevelScreen() {
	// background
	ctx.drawImage(starsImage, 0, 0);
	ctx.fillStyle = "rgba(0,0,0,0.4)";
	ctx.fillRect(0, 0, 800, 600);
	
	// top bar
	ctx.fillStyle = "rgba(127,127,127,0.3)";
	ctx.fillRect(0,0,800,40);
	ctx.fillStyle = "#ffff00";
	ctx.fillRect(0,40,800,1);
	ctx.fillStyle = "#e3e1cd";
	ctx.textAlign = "center";
	ctx.font = "30px Century Gothic, Helvetica, Arial";
	ctx.fillText("Select level", 400, 31);
	
	// bottom bar
	ctx.fillStyle = "rgba(127,127,127,0.3)";
	ctx.fillRect(0,575,800,25);
	ctx.fillStyle = "#ffff00";
	ctx.fillRect(0,575,800,1);
	if (mouseX > 1 && mouseX < 109 && mouseY > 576 && mouseY < 599) {
		ctx.fillStyle = "#ffff00";
	}
	else {
		ctx.fillStyle = "#e3e1cd";
	}
	ctx.textAlign = "left";
	ctx.font = "16px Century Gothic, Helvetica, Arial";
	ctx.fillText("Exit to menu", 5, 593);

	ctx.textAlign = "center";
	ctx.font = "30px Century Gothic, Helvetica, Arial";
	var allLevels = 15;
	var levelsAvailable = 0;
	
	// get actual top level from cookie file
	if (!getCookie("SpacedockDefenderLevel")) {
		levelsAvailable = 1;
	}
	else {
		var levelsAvailable = Math.floor(getCookie("SpacedockDefenderLevel"));
	}
	
	// available levels
	for (var i = 0; i < levelsAvailable; i++) {
		levelPosX = 297 + i%3*103;
		levelPosY = 111 + 103*Math.floor(i/3);
		if (mouseX > levelPosX-40 &&  mouseX < levelPosX+40 && mouseY > levelPosY-50 && mouseY < levelPosY + 30) {
			ctx.strokeStyle = "#ffff00";
			ctx.strokeRect(levelPosX-40, levelPosY-50, 80, 80);
			ctx.fillStyle = "rgba(225,227,205, 0.2)";
			ctx.fillRect(levelPosX-40, levelPosY-50, 80, 80);
			ctx.fillStyle = "#ffff00";
			ctx.fillText(i+1, levelPosX, levelPosY);
		}
		else {
			ctx.strokeStyle = "#e3e1cd";
			ctx.strokeRect(levelPosX-40, levelPosY-50, 80, 80);
			ctx.fillStyle = "rgba(225,227,205, 0.1)";
			ctx.fillRect(levelPosX-40, levelPosY-50, 80, 80);
			ctx.fillStyle = "#e3e1cd";
			ctx.fillText(i+1, levelPosX, levelPosY);
		}
	}
	// unavailable levels
	for (var i = levelsAvailable; i < allLevels; i++) {
		levelPosX = 297 + i%3*103;
		levelPosY = 111 + 103*Math.floor(i/3);
			
		ctx.strokeStyle = "#222";
		ctx.strokeRect(levelPosX-40, levelPosY-50, 80, 80);
		ctx.fillStyle = "rgba(30,30,30, 0.1)";
		ctx.fillRect(levelPosX-40, levelPosY-50, 80, 80);
		ctx.fillStyle = "#222";
		ctx.fillText(i+1, levelPosX, levelPosY);
	}
}


// displaying About screen
function displayAboutScreen() {
	// background
	ctx.drawImage(starsImage, 0, 0);
	ctx.fillStyle = "rgba(0,0,0,0.4)";
	ctx.fillRect(0, 0, 800, 600);
	
	// top bar
	ctx.fillStyle = "rgba(127,127,127,0.3)";
	ctx.fillRect(0,0,800,40);
	ctx.fillStyle = "#ffff00";
	ctx.fillRect(0,40,800,1);
	ctx.fillStyle = "#e3e1cd";
	ctx.textAlign = "center";
	ctx.font = "30px Century Gothic, Helvetica, Arial";
	ctx.fillText("About the game", 400, 31);
	
	// bottom bar
	ctx.fillStyle = "rgba(127,127,127,0.3)";
	ctx.fillRect(0,575,800,25);
	ctx.fillStyle = "#ffff00";
	ctx.fillRect(0,575,800,1);
	if (mouseX > 1 && mouseX < 109 && mouseY > 576 && mouseY < 599) {
		ctx.fillStyle = "#ffff00";
	}
	else {
		ctx.fillStyle = "#e3e1cd";
	}
	ctx.textAlign = "left";
	ctx.font = "16px Century Gothic, Helvetica, Arial";
	ctx.fillText("Exit to menu", 5, 593);
	
	
	ctx.fillStyle = "#e3e1cd";
	ctx.textAlign = "center";
	ctx.font = "18px Century Gothic, Helvetica, Arial";
	var text = "We are building a prototype warship in a remote sector of our system. Unfortunately, our enemies found out the location and won't let us complete the ship. They will send  wave after wave to destroy our spacedock. Can you help us to protect it at all costs?\n\nControls: To play the game you only need left mouse button.\n\n\nSound effects from http://www.freesound.org\n\nMain score is 'A King' by Marcel Czaplinski (http://shurrikane.newgrounds.com/) used for non-commercial purposes.\n\nThis game uses Javascript sound library howler.js.\nCopyright (c) 2013-2016 James Simpson and GoldFire Studios, Inc.\nReleased under the MIT License: https://github.com/goldfire/howler.js/blob/master/LICENSE.md"
	wrapText(ctx, text, 400, 100, 700, 20);
}


function loadLevelData(level) {
	levelCompletedCountdown = -1;
	levelFailedCountdown = -1;
	enemyList = [];
	missileList = [];
	enemyMissileList = [];
	explosionList = [];
	
	isElementAMoving = false;
	isElementBMoving = false;
	
	elementACurrentPos = 275;
	elementBCurrentPos = 310;
	
	ammo = missiles[level];
	dockHP = 1000;
	for (var i = 0; i < enemies[level].length; i++) {
		enemyList[i] = enemies[level][i].slice();
	}
	
	//save level number in cookie file if there's no cookie file yet
	if (!getCookie("SpacedockDefenderLevel")) {
		setCookie("SpacedockDefenderLevel", level+1, 365);
	}
	// save level number in cookie file only if it's higher
	else {
		var savedLevel = getCookie("SpacedockDefenderLevel");
		if (level+1 > savedLevel) {
			setCookie("SpacedockDefenderLevel", level+1, 365);
		}
	}
}


// displaying game
function displayGame(level) {
	if (needToLoad == true) {
		loadLevelData(level);
		needToLoad = false;
	}

	ctx.drawImage(starsImage, 0, 0);
	
	if (dockHP > 0) {
		// draw dock
		ctx.drawImage(bigShipImage, 400 - bigShipImage.width/2, 300 - bigShipImage.height/2);
		ctx.drawImage(dockAImage, 400 - dockAImage.width/2, 260);
		ctx.drawImage(dockBImage, 400 - dockBImage.width/2, 330);
		ctx.drawImage(dockDImage, 400 - dockDImage.width/2, 300 - dockDImage.height/2);
		
		
		if (isElementAMoving == false && Math.floor(Math.random()*50) == 0) {
			// move down
			if (Math.floor(Math.random()*2) == 1) {
				elementAMoveRange = Math.floor(Math.random()*(elementAMaxValue-elementACurrentPos));
			}
			// move up
			else {
				elementAMoveRange = Math.floor(Math.random()*(elementAMinValue-elementACurrentPos));
			}
			isElementAMoving = true;
		}
		else {
			// move down
			if (elementAMoveRange > 0) {
				elementACurrentPos += 0.25;
				elementAMoveRange -= 0.25;
			}
			// move up
			else if (elementAMoveRange < 0) {
				elementACurrentPos -= 0.25;
				elementAMoveRange += 0.25;
			}
			else {
				isElementAMoving = false;
		  
				// spark
				random = Math.floor(Math.random()*20);
				if (random == 0) {
					explosionList.push(new spark(390 + Math.floor(Math.random()*20), elementACurrentPos+5, 20, 0));
				}
			}
		}
		
		if (isElementBMoving == false && Math.floor(Math.random()*50) == 0) {
			// move down
			if (Math.floor(Math.random()*2) == 1) {
				elementBMoveRange = Math.floor(Math.random()*(elementBMaxValue-elementBCurrentPos));
			}
			// move up
			else {
				elementBMoveRange = Math.floor(Math.random()*(elementBMinValue-elementBCurrentPos));
			}
			isElementBMoving = true;
		}
		else {
			// move down
			if (elementBMoveRange > 0) {
				elementBCurrentPos += 0.25;
				elementBMoveRange -= 0.25;
			}
			// move up
			else if (elementBMoveRange < 0) {
				elementBCurrentPos -= 0.25;
				elementBMoveRange += 0.25;
			}
			else {
				isElementBMoving = false;
				
				// spark
				random = Math.floor(Math.random()*20);
				if (random == 0) {
					explosionList.push(new spark(390 + Math.floor(Math.random()*20), elementBCurrentPos+5, 20, 0));
				}
			}
		}
		
		
		/*
		random = Math.floor(Math.random()*30);
		if (random == 1) {
			explosionList.push(new spark(390 + Math.floor(Math.random()*20), segmentAHeight+8, 20, 0));
		}
		else if (random == 2) {
			explosionList.push(new spark(390 + Math.floor(Math.random()*20), segmentBHeight+8, 20, 0));
		}
		*/
		
		
		ctx.drawImage(dockCImage, 400 - dockCImage.width/2, elementACurrentPos);
		ctx.drawImage(dockCImage, 400 - dockCImage.width/2, elementBCurrentPos);
		
		// draw missile launcher
		angleDeg = Math.atan2(mouseY - 300, mouseX - 400) * 180 / Math.PI;
		ctx.save();
		ctx.translate(400, 300);
		ctx.rotate(angleDeg * Math.PI / 180);
		ctx.drawImage(launcherImage, -launcherImage.width/2, -launcherImage.height/2);
		ctx.restore();
	}
	
	drawMissiles();
	drawEnemies();
	drawExplosions();
	displayInfo();
	checkIfLevelFailed();
	checkIfLevelCompleted();

	
	// check if need to display enenm's HP
	for (var i = enemyList.length - 1; i >= 0; i--) {
		var enemyPosX = 400 + enemyList[i][2] * Math.cos(enemyList[i][1] * Math.PI / 180);
		var enemyPosY = 300 + enemyList[i][2] * Math.sin(enemyList[i][1] * Math.PI / 180);	
		var distance = Math.sqrt( (mouseX - enemyPosX)*(mouseX - enemyPosX) + (mouseY - enemyPosY)*(mouseY - enemyPosY) );

		if (distance < 25 && dockHP > 0) {
			//ctx.fillStyle = "green";
			//ctx.fillText(enemyList[i][3], enemyPosX, enemyPosY - 20);
			
			var shields = enemyList[i][3];
			var colourR = 255 - Math.floor(255*shields/100);
			var colourG = Math.floor(255*shields/100);
			var colourB = 0;
			var colourA = 1;
			ctx.fillStyle = "#777";
			ctx.fillRect(enemyPosX-12.5, enemyPosY-20, 25, 3);
			ctx.fillStyle = "rgba("+colourR+","+colourG+","+colourB+","+colourA+")";
			ctx.fillRect(enemyPosX-12.5, enemyPosY-20, 25*shields/100, 3);
		}
	}
}


function drawEnemies() {
	for (var i = 0; i < enemyList.length; i++) {
		
		// if there's delay, decrease it
		if (enemyList[i][5] > 0) {
			enemyList[i][5]--;
		}
		// else manage movement and shooting
		else {
			// EMENY TYPE 1
			if (enemyList[i][0] == 1) {
				var enemyPosX = 400 + enemyList[i][2] * Math.cos(enemyList[i][1] * Math.PI / 180);
				var enemyPosY = 300 + enemyList[i][2] * Math.sin(enemyList[i][1] * Math.PI / 180);
			
				ctx.save();
				ctx.translate(enemyPosX, enemyPosY);
				ctx.rotate(enemyList[i][1] * Math.PI / 180);
				ctx.drawImage(enemyShipsImage, 1, 1, 17, 8, -8.5, -4, 17, 8);
				
				// move ship if still far
				if (enemyList[i][2] > 100) {
					var gradient = ctx.createLinearGradient(8,0,22,0);
					gradient.addColorStop(0,"rgba(50,220,220,0.5)");
					gradient.addColorStop(1,"rgba(0,0,0,0)");
					ctx.fillStyle = gradient;
					ctx.fillRect(8,-1,18,2);
					
					enemyList[i][2] -= 1;
				}
				// check if can fire to me
				else {
					if (enemyList[i][4] == 0) {
						enemyList[i][4] = 20;
						
						if (dockHP > 0) {
							enemyMissileList.push(new enemyMissile(enemyPosX - 8*Math.cos(enemyList[i][1]*Math.PI/180), enemyPosY - 8*Math.sin(enemyList[i][1]*Math.PI/180),enemyList[i][1],4,1));
							if (soundSettings == true) { var newSound = laserSound.play(); }
						}
					}
					else {
						enemyList[i][4]--;
					}
				}
				
				ctx.restore();
			}
			// EMENY TYPE 2
			else if (enemyList[i][0] == 2) {
				var enemyPosX = 400 + enemyList[i][2] * Math.cos(enemyList[i][1] * Math.PI / 180);
				var enemyPosY = 300 + enemyList[i][2] * Math.sin(enemyList[i][1] * Math.PI / 180);
			
				ctx.save();
				ctx.translate(enemyPosX, enemyPosY);
				ctx.rotate(enemyList[i][1] * Math.PI / 180);
				ctx.drawImage(enemyShipsImage, 1, 11, 28, 14, -14, -7, 28, 14);
				
				if (enemyList[i][2] > 130) {
					var gradient = ctx.createLinearGradient(12,0,30,0);
					gradient.addColorStop(0,"rgba(50,220,220,0.5)");
					gradient.addColorStop(1,"rgba(0,0,0,0)");
					ctx.fillStyle = gradient;
					ctx.fillRect(14,2,18,2);
					ctx.fillRect(14,-3.5,18,2);
				
					enemyList[i][2] -= 0.8;
				}
				// check if can fire to me
				else {
					if (enemyList[i][4] == 0) {
						enemyList[i][4] = 30;					
						if (dockHP > 0) {
							enemyMissileList.push(new enemyMissile(enemyPosX - 8*Math.cos(enemyList[i][1]*Math.PI/180) - 4*Math.sin(enemyList[i][1]*Math.PI/180), enemyPosY - 8*Math.sin(enemyList[i][1]*Math.PI/180) + 4*Math.cos(enemyList[i][1]*Math.PI/180),enemyList[i][1],4,2));
							if (soundSettings == true) { var newSound = laserSound.play(); }
						}

					}
					else if (enemyList[i][4] == 15) {
						if (dockHP > 0) { 
							enemyMissileList.push(new enemyMissile(enemyPosX - 8*Math.cos(enemyList[i][1]*Math.PI/180) + 4*Math.sin(enemyList[i][1]*Math.PI/180), enemyPosY - 8*Math.sin(enemyList[i][1]*Math.PI/180) - 4*Math.cos(enemyList[i][1]*Math.PI/180),enemyList[i][1],4,2));
							if (soundSettings == true) { var newSound = laserSound.play(); }
						}
						enemyList[i][4]--;
					}
					else {
						enemyList[i][4]--;
					}
				}
				
				ctx.restore();
			}
			// EMENY TYPE 3
			else if (enemyList[i][0] == 3) {
				var enemyPosX = 400 + enemyList[i][2] * Math.cos(enemyList[i][1] * Math.PI / 180);
				var enemyPosY = 300 + enemyList[i][2] * Math.sin(enemyList[i][1] * Math.PI / 180);
			
				ctx.save();
				ctx.translate(enemyPosX, enemyPosY);
				ctx.rotate(enemyList[i][1] * Math.PI / 180);
				ctx.drawImage(enemyShipsImage, 1, 27, 44, 14, -22, -7, 44, 14);
				
				if (enemyList[i][2] > 170) {
					var gradient = ctx.createLinearGradient(22,0,35,0);
					gradient.addColorStop(0,"rgba(50,220,220,0.5)");
					gradient.addColorStop(1,"rgba(0,0,0,0)");
					ctx.fillStyle = gradient;
					ctx.fillRect(22,2,18,2);
					ctx.fillRect(22,-4,18,2);
					
					enemyList[i][2] -= 0.9;
				}
				
				// check if can fire to me
				else {
					if (enemyList[i][4] == 0) {
						enemyList[i][4] = 40;	
						if (dockHP > 0) {						
							enemyMissileList.push(new enemyMissile(enemyPosX - 8*Math.cos(enemyList[i][1]*Math.PI/180) - 6*Math.sin(enemyList[i][1]*Math.PI/180), enemyPosY - 8*Math.sin(enemyList[i][1]*Math.PI/180) + 6*Math.cos(enemyList[i][1]*Math.PI/180),enemyList[i][1],3,3));
							if (soundSettings == true) { var newSound = enemyMissileSound.play(); }
						}
					}
					else if (enemyList[i][4] == 20) {
						if (dockHP > 0) {
							enemyMissileList.push(new enemyMissile(enemyPosX - 8*Math.cos(enemyList[i][1]*Math.PI/180) + 6*Math.sin(enemyList[i][1]*Math.PI/180), enemyPosY - 8*Math.sin(enemyList[i][1]*Math.PI/180) - 6*Math.cos(enemyList[i][1]*Math.PI/180),enemyList[i][1],3,3));
							if (soundSettings == true) { var newSound = enemyMissileSound.play(); }
						}
						enemyList[i][4]--;
					}
					else {
						enemyList[i][4]--;
					}
				}
				
				ctx.restore();	
			}
			// EMENY TYPE 4
			else if (enemyList[i][0] == 4) {
				var enemyPosX = 400 + enemyList[i][2] * Math.cos(enemyList[i][1] * Math.PI / 180);
				var enemyPosY = 300 + enemyList[i][2] * Math.sin(enemyList[i][1] * Math.PI / 180);
			
				ctx.save();
				ctx.translate(enemyPosX, enemyPosY);
				ctx.rotate(enemyList[i][1] * Math.PI / 180);
				ctx.drawImage(enemyShipsImage, 1, 43, 49, 15, -24.5, -7.5, 49, 15);
				
				if (enemyList[i][2] > 220) {
					var gradient = ctx.createLinearGradient(25,0,38,0);
					gradient.addColorStop(0,"rgba(50,220,220,0.5)");
					gradient.addColorStop(1,"rgba(0,0,0,0)");
					ctx.fillStyle = gradient;
					ctx.fillRect(24.5,4,18,2);
					ctx.fillRect(24.5,-0.5,18,2);
					ctx.fillRect(24.5,-5,18,2);
					
					enemyList[i][2] -= 0.6;
				}
				
				// check if can fire to me
				else {
					if (enemyList[i][4] == 0) {
						enemyList[i][4] = 30;
						
						if (dockHP > 0) {
							enemyMissileList.push(new enemyMissile(enemyPosX - 20*Math.cos(enemyList[i][1]*Math.PI/180) - 3*Math.sin(enemyList[i][1]*Math.PI/180), enemyPosY - 20*Math.sin(enemyList[i][1]*Math.PI/180) + 3*Math.cos(enemyList[i][1]*Math.PI/180),enemyList[i][1],4,2));
							enemyMissileList.push(new enemyMissile(enemyPosX - 20*Math.cos(enemyList[i][1]*Math.PI/180) + 3*Math.sin(enemyList[i][1]*Math.PI/180), enemyPosY - 20*Math.sin(enemyList[i][1]*Math.PI/180) - 3*Math.cos(enemyList[i][1]*Math.PI/180),enemyList[i][1],4,2));
							if (soundSettings == true) { var newSound = laserSound.play(); }
						}
						
						}
					if (enemyList[i][4] == 15) {
						if (dockHP > 0) {
							enemyMissileList.push(new enemyMissile(enemyPosX - 1*Math.cos(enemyList[i][1]*Math.PI/180) - 7*Math.sin(enemyList[i][1]*Math.PI/180), enemyPosY - 1*Math.sin(enemyList[i][1]*Math.PI/180) + 7*Math.cos(enemyList[i][1]*Math.PI/180),enemyList[i][1],3,3));
							enemyMissileList.push(new enemyMissile(enemyPosX - 1*Math.cos(enemyList[i][1]*Math.PI/180) + 7*Math.sin(enemyList[i][1]*Math.PI/180), enemyPosY - 1*Math.sin(enemyList[i][1]*Math.PI/180) - 7*Math.cos(enemyList[i][1]*Math.PI/180),enemyList[i][1],3,3));
							if (soundSettings == true) { var newSound = enemyMissileSound.play(); }
						}
					
						enemyList[i][4]--;
					}
					else {
						enemyList[i][4]--;
					}
				}
				
				ctx.restore();
			}
		}
	}
}


function drawMissiles() {
	// draw my missiles
	for (var i = missileList.length-1; i >= 0; i--) {
		missileList[i].drawMissile();
		missileList[i].recalculateMissile();
		
		if (missileList[i].distance < 0) {
			explodeMissile(missileList[i].x, missileList[i].y);
			missileList.splice(i, 1);
		}
	}
	
	// draw enemy missiles
	for (var i = enemyMissileList.length-1; i >= 0; i--) {
		enemyMissileList[i].drawMissile();
		enemyMissileList[i].recalculateMissile();
		
		// check if enemy missile collided with dock
		if (dockHP > 0 &&
			enemyMissileList[i].x > 383 &&
			enemyMissileList[i].x < 417 &&
			enemyMissileList[i].y > 265 &&
			enemyMissileList[i].y < 335) {
			
				if (enemyMissileList[i].type == 1) {
					if (levelCompletedCountdown == -1) { dockHP -= 10; }
					explosionList.push(new explosion(enemyMissileList[i].x, enemyMissileList[i].y, 30, 0, 5));
					explosionList.push(new explosion(enemyMissileList[i].x, enemyMissileList[i].y, 20, 0, 6));
				}
				else if (enemyMissileList[i].type == 2) {
					if (levelCompletedCountdown == -1) { dockHP -= 15; }
					explosionList.push(new explosion(enemyMissileList[i].x, enemyMissileList[i].y, 30, 0, 5));
					explosionList.push(new explosion(enemyMissileList[i].x, enemyMissileList[i].y, 20, 0, 6));
				}
				else if (enemyMissileList[i].type == 3) {
					if (levelCompletedCountdown == -1) { dockHP -= 30; }
					explosionList.push(new explosion(enemyMissileList[i].x, enemyMissileList[i].y, 30, 0, 3));
					explosionList.push(new explosion(enemyMissileList[i].x, enemyMissileList[i].y, 20, 0, 4));
				}
			
				enemyMissileList.splice(i, 1);
				if (soundSettings == true) { var newSound = smallExplosionSound.play(); }
			}
	}
}


function drawExplosions() {
	for (var i = explosionList.length - 1; i >= 0; i--) {
		if (explosionList[i].delay == 0) {
			explosionList[i].drawParticles();
		} else {
			explosionList[i].delay--;
			if (soundSettings == true && explosionList[i].delay == 0) {var newSound = bigExplosionSound.play(); }
		}
		if (explosionList[i].lifeSpan < 0) {
			explosionList.splice(i, 1);
		}
	}
 }


function displayInfo() {
	ctx.fillStyle = "rgba(127,127,127,0.3)";
	ctx.fillRect(0,0,800,24);
	ctx.fillStyle = "#ffff00";
	ctx.fillRect(0,24,800,1);

	ctx.fillStyle = "#e3e1cd";
	ctx.textAlign = "left";
	ctx.font = "16px Century Gothic, Helvetica, Arial";
	ctx.fillText("Enemy ships: " + enemyList.length, 200, 18);
	ctx.fillText("Missiles: " + ammo, 370, 18);
	ctx.fillText("Spacedock shields", 500, 18);
	
	var colourR = 255 - Math.floor(255*dockHP/1000);
	var colourG = Math.floor(255*dockHP/1000);
	var colourB = 0;
	var colourA = 0.6;
	ctx.fillStyle = "#777";
	ctx.fillRect(646, 4, 150, 16);
	ctx.fillStyle = "rgba("+colourR+","+colourG+","+colourB+","+colourA+")";
	if (dockHP > 0) {
		ctx.fillRect(646, 4, 150*dockHP/1000, 16);
	}
	
	// bottom bar
	ctx.fillStyle = "rgba(127,127,127,0.3)";
	ctx.fillRect(0,575,800,25);
	ctx.fillStyle = "#ffff00";
	ctx.fillRect(0,575,800,1);
	if (mouseX > 1 && mouseX < 109 && mouseY > 576 && mouseY < 599) {
		ctx.fillStyle = "#ffff00";
	}
	else {
		ctx.fillStyle = "#e3e1cd";
	}
	ctx.textAlign = "left";
	ctx.font = "16px Century Gothic, Helvetica, Arial";
	ctx.fillText("Exit to menu", 5, 593);
	
	ctx.textAlign = "right";
	ctx.fillStyle = "#777";
	ctx.fillText("Level " + Math.floor(level+1), 795, 593);
	
	// restart level
	if (mouseX > 1 && mouseX < 109 && mouseY > 1 && mouseY < 25) {
		ctx.fillStyle = "#ffff00";
	}
	else {
		ctx.fillStyle = "#e3e1cd";
	}
	ctx.textAlign = "left";
	ctx.font = "16px Century Gothic, Helvetica, Arial";
	ctx.fillText("Restart level", 5, 18);
	
}


function explodeMissile(x, y) {
	explosionList.push(new explosion(x, y, 30, 0, 3));
	explosionList.push(new explosion(x, y, 20, 0, 4));
	
	for (var i = enemyList.length - 1; i >= 0; i--) {
		
		var enemyType = enemyList[i][0];
		if (enemyType == 1) {
			var enemyPosX = 400 + enemyList[i][2] * Math.cos(enemyList[i][1] * Math.PI / 180);
			var enemyPosY = 300 + enemyList[i][2] * Math.sin(enemyList[i][1] * Math.PI / 180);	
			var distance = Math.sqrt( (enemyPosX - x)*(enemyPosX - x) + (enemyPosY - y)*(enemyPosY - y) );
			if (distance < 30) {
				enemyList[i][3] -= 5*(30-distance);
			}
		}
		else if (enemyType == 2) {
			var enemyPosX = 400 + (enemyList[i][2]-6) * Math.cos(enemyList[i][1] * Math.PI / 180);
			var enemyPosY = 300 + (enemyList[i][2]-6) * Math.sin(enemyList[i][1] * Math.PI / 180);	
			var distance = Math.sqrt( (enemyPosX - x)*(enemyPosX - x) + (enemyPosY - y)*(enemyPosY - y) );
			if (distance < 30) {
				enemyList[i][3] -= 2*(30-distance);
			}
			
			enemyPosX = 400 + (enemyList[i][2]+6) * Math.cos(enemyList[i][1] * Math.PI / 180);
			enemyPosY = 300 + (enemyList[i][2]+6) * Math.sin(enemyList[i][1] * Math.PI / 180);	
			distance = Math.sqrt( (enemyPosX - x)*(enemyPosX - x) + (enemyPosY - y)*(enemyPosY - y) );
			if (distance < 30) {
				enemyList[i][3] -= 2*(30-distance);
			}
		}
		else if (enemyType == 3) {
			var enemyPosX = 400 + (enemyList[i][2]-10) * Math.cos(enemyList[i][1] * Math.PI / 180);
			var enemyPosY = 300 + (enemyList[i][2]-10) * Math.sin(enemyList[i][1] * Math.PI / 180);	
			var distance = Math.sqrt( (enemyPosX - x)*(enemyPosX - x) + (enemyPosY - y)*(enemyPosY - y) );
			if (distance < 30) {
				enemyList[i][3] -= (30-distance)/1.5;
			}
			
			enemyPosX = 400 + (enemyList[i][2]+10) * Math.cos(enemyList[i][1] * Math.PI / 180);
			enemyPosY = 300 + (enemyList[i][2]+10) * Math.sin(enemyList[i][1] * Math.PI / 180);	
			distance = Math.sqrt( (enemyPosX - x)*(enemyPosX - x) + (enemyPosY - y)*(enemyPosY - y) );
			if (distance < 30) {
				enemyList[i][3] -= (30-distance)/1.5;
			}
		}
		else if (enemyType == 4) {
			var enemyPosX = 400 + enemyList[i][2] * Math.cos(enemyList[i][1] * Math.PI / 180);
			var enemyPosY = 300 + enemyList[i][2] * Math.sin(enemyList[i][1] * Math.PI / 180);	
			var distance = Math.sqrt( (enemyPosX - x)*(enemyPosX - x) + (enemyPosY - y)*(enemyPosY - y) );
			if (distance < 30) {
				enemyList[i][3] -= (30-distance)/3;
			}
			
			enemyPosX = 400 + (enemyList[i][2]-14) * Math.cos(enemyList[i][1] * Math.PI / 180);
			enemyPosY = 300 + (enemyList[i][2]-14) * Math.sin(enemyList[i][1] * Math.PI / 180);	
			distance = Math.sqrt( (enemyPosX - x)*(enemyPosX - x) + (enemyPosY - y)*(enemyPosY - y) );
			if (distance < 30) {
				enemyList[i][3] -= (30-distance)/3;
			}
			
			enemyPosX = 400 + (enemyList[i][2]+14) * Math.cos(enemyList[i][1] * Math.PI / 180);
			enemyPosY = 300 + (enemyList[i][2]+14) * Math.sin(enemyList[i][1] * Math.PI / 180);	
			distance = Math.sqrt( (enemyPosX - x)*(enemyPosX - x) + (enemyPosY - y)*(enemyPosY - y) );
			if (distance < 30) {
				enemyList[i][3] -= (30-distance)/3;
			}
		}
		
		// remove enemy if no shields left
		if (enemyList[i][3] <= 0) {
			explosionList.push(new explosion(enemyPosX, enemyPosY, 30, 0, 1));
			explosionList.push(new explosion(enemyPosX, enemyPosY, 20, 0, 2));
			enemyList.splice(i, 1);
			
			// sound of exploding ship
			if (soundSettings == true) {
				var newSound = bigExplosionSound.play();
			}
		}
		
		// sound of exploded missile
		if (soundSettings == true) {
			var newSound = smallExplosionSound.play();
		}
	}
}



function checkIfLevelFailed() {
	if (dockHP <= 0 && levelCompletedCountdown == -1) {
		if (levelFailedCountdown == -1) {
			levelFailedCountdown = 50;
			
			explosionList.push(new explosion(400, 300, 30, 0, 1));
			explosionList.push(new explosion(400, 300, 20, 0, 2));
			
			explosionList.push(new explosion(420, 310, 30, 7, 1));
			explosionList.push(new explosion(420, 310, 20, 7, 2));
			
			explosionList.push(new explosion(400, 325, 30, 10, 1));
			explosionList.push(new explosion(400, 325, 20, 10, 2));
			
			explosionList.push(new explosion(388, 290, 30, 14, 1));
			explosionList.push(new explosion(388, 290, 20, 14, 2));
			
			explosionList.push(new explosion(408, 280, 30, 16, 1));
			explosionList.push(new explosion(408, 280, 20, 16, 2));
			
			explosionList.push(new explosion(390, 280, 30, 0, 1));
			explosionList.push(new explosion(390, 280, 20, 0, 2));
			
			explosionList.push(new explosion(390, 330, 30, 2, 1));
			explosionList.push(new explosion(390, 330, 20, 2, 2));
		}
		
		if (levelFailedCountdown == 0) {
			
			ctx.fillStyle = "rgba(20,20,20,0.7)";
			ctx.fillRect(200,250,400,100);
			ctx.strokeStyle = "#C41D1D";
			ctx.strokeRect(200,250,400,100);
			
			ctx.fillStyle = "#C41D1D";
			ctx.font = "48px Century Gothic, Helvetica, Arial";
			ctx.textAlign = "center";
			ctx.fillText("Mission failed", 400, 305);
			ctx.font = "20px Century Gothic, Helvetica, Arial";
			ctx.fillText("Click anywhere to restart level", 400, 330);
			
			canvas.addEventListener("click", endLevelClick);
		}
		else {
			levelFailedCountdown--;
		}	
	}
}


function checkIfLevelCompleted() {
	if (enemyList.length == 0 && levelFailedCountdown == -1) {
		if (levelCompletedCountdown == -1) {
			levelCompletedCountdown = 25; 
		}
		
		if (levelCompletedCountdown == 0) {
			// if NOT last level
			if (level < enemies.length-1) {
				ctx.fillStyle = "rgba(20,20,20,0.7)";
				ctx.fillRect(200,250,400,100);
				ctx.strokeStyle = "#1FAB1F";
				ctx.strokeRect(200,250,400,100);
				
				ctx.fillStyle = "#1FAB1F";
				ctx.font = "36px Century Gothic, Helvetica, Arial";
				ctx.textAlign = "center";
				ctx.fillText("Mission accomplished", 400, 299);
				ctx.font = "20px Century Gothic, Helvetica, Arial";
				ctx.fillText("Click anywhere to proceed", 400, 326);
				
				canvas.addEventListener("click", endLevelClick);
			}
			// if LAST level
			else {
				ctx.fillStyle = "rgba(20,20,20,0.7)";
				ctx.fillRect(200,200,400,200);
				ctx.strokeStyle = "#1FAB1F";
				ctx.strokeRect(200,200,400,200);
				
				ctx.fillStyle = "#1FAB1F";
				ctx.font = "36px Century Gothic, Helvetica, Arial";
				ctx.textAlign = "center";
				ctx.fillText("Mission accomplished", 400, 243);
				ctx.font = "20px Century Gothic, Helvetica, Arial";
				var text = "All enemies in this sector has been destroyed. Our ship is save and will be completed very soon.\nThen, we will use it to turn the tide of this war.";
				wrapText(ctx, text, 400, 275, 350, 19);
				ctx.fillText("Click anywhere to exit", 400, 382);
				
				canvas.addEventListener("click", endLevelClick);
			}
		}
		else {
			levelCompletedCountdown--;
			if (levelCompletedCountdown == 0 && soundSettings == true) {
				var newSound = winSound.play();
			}
		}
	}
}


function wrapText(context, text, x, y, line_width, line_height)
{
    var line = '';
    var paragraphs = text.split('\n');
    for (var i = 0; i < paragraphs.length; i++)
    {
        var words = paragraphs[i].split(' ');
        for (var n = 0; n < words.length; n++)
        {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > line_width && n > 0)
            {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += line_height;
            }
            else
            {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
        y += line_height;
        line = '';
    }
}


// *********** EVENT LISTENERS *************

// update mouse coordinates
function mouseMove(e) {
	mouseX = e.pageX - canvas.offsetLeft;
	mouseY = e.pageY - canvas.offsetTop;
}


function menuMouseClick(e) {
	mouseX = e.pageX - canvas.offsetLeft;
	mouseY = e.pageY - canvas.offsetTop;
	
	if (mouseX >= 251 && mouseX <= 549 && mouseY >= 350 && mouseY <= 369) {
		whatToDisplay = 1;
		canvas.removeEventListener("click", menuMouseClick);
		canvas.addEventListener("click", selectLevelMouseClick);
	}
	else if (mouseX >= 326 && mouseX <= 474 && mouseY >= 390 && mouseY <= 409) {
		whatToDisplay = 2;
		canvas.removeEventListener("click", menuMouseClick);
		canvas.addEventListener("click", aboutMouseClick);
	}
	// sound: on / off
	else if (mouseX >= 281 && mouseX <= 519 && mouseY >= 430 && mouseY <= 449) {
		if (soundSettings == true) {
			soundSettings = false;
			bgLoop.pause();
		}
		else {
			soundSettings = true;
			bgLoop.play();
		}
	}
}

function selectLevelMouseClick(e) {
	mouseX = e.pageX - canvas.offsetLeft;
	mouseY = e.pageY - canvas.offsetTop;
	
	if (mouseX > 1 && mouseX < 109 && mouseY > 576 && mouseY < 599) {
		whatToDisplay = 0;
		canvas.removeEventListener("click", selectLevelMouseClick);
		canvas.addEventListener("click", menuMouseClick);
	}
	else {
		var levelPosX = 0;
		var levelPosY = 0;
		var levelsAvailable = 0;
		
		// get actual top level from cookie file
		if (!getCookie("SpacedockDefenderLevel")) {
			levelsAvailable = 1;
		}
		else {
			var levelsAvailable = Math.floor(getCookie("SpacedockDefenderLevel"));
		}

		for(var i = 0; i < levelsAvailable; i++) {
			levelPosX = 297 + i%3*103;
			levelPosY = 111 + 103*Math.floor(i/3);
			if (mouseX > levelPosX-40 &&  mouseX < levelPosX+40 && mouseY > levelPosY-50 && mouseY < levelPosY + 30) {
				whatToDisplay = 3;
				level = i;
				needToLoad = true;
				canvas.removeEventListener("click", selectLevelMouseClick);
				canvas.addEventListener("click", gameMouseClick);
			}
		}
	}
}


function aboutMouseClick(e) {
	mouseX = e.pageX - canvas.offsetLeft;
	mouseY = e.pageY - canvas.offsetTop;
	
	if (mouseX > 1 && mouseX < 109 && mouseY > 576 && mouseY < 599) {
		whatToDisplay = 0;
		canvas.removeEventListener("click", aboutMouseClick);
		canvas.addEventListener("click", menuMouseClick);
	}
}


function gameMouseClick(e) {
	mouseX = e.pageX - canvas.offsetLeft;
	mouseY = e.pageY - canvas.offsetTop;
	
	// exit to menu
	if (mouseX > 1 && mouseX < 109 && mouseY > 576 && mouseY < 599) {
		whatToDisplay = 0;
		needToLoad = true;
		canvas.removeEventListener("click", gameMouseClick);
		canvas.addEventListener("click", menuMouseClick);
	}
	else if (mouseX > 1 && mouseX < 109 && mouseY > 1 && mouseY < 25) {
		needToLoad = true;
	}
	// launch missile
	else if (ammo > 0 && dockHP > 0) {
		ammo--;
		var distance = Math.sqrt( (400-mouseX)*(400-mouseX) + (300-mouseY)*(300-mouseY) );
		missileList.push(new missile(angleDeg, distance));
		
		// sound of launched missile
		if (soundSettings == true && levelCompletedCountdown == -1 && levelFailedCountdown == -1) {
			var newSound = missileSound.play();
		}
	}
}


// listener for level failed / completed boxes (loads next level)
function endLevelClick(e) {
	if (level < enemies.length-1 || levelCompletedCountdown == -1) {
		levelFailedCountdown = -1;
		if (levelCompletedCountdown != -1) {
			level++;
			levelCompletedCountdown = -1;
		}
	}
	else {
		whatToDisplay = 0;
		canvas.removeEventListener("click", gameMouseClick);
		canvas.addEventListener("click", menuMouseClick);
	}
	needToLoad = true;
	canvas.removeEventListener("click", endLevelClick);
}


// ****** CCOKIES ******

// set cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


// get level number from cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}