var enemies = [];
var missiles = [];
// [0]type, [1]angle, [2]distance, [3]shields, [4]can fire, [5]delay


//------------------------------
// level 1
missiles[0] = 30;
enemies[0] = [
	// wave 1
	[1,170,410,100,0,0],
	[1,190,410,100,0,0],
	// wave 2
	[1,30,500,100,0,90],
	[1,330,500,100,0,90],
	// wave 3
	[1,160,500,100,0,210],
	[1,180,500,100,0,210],
	[1,200,500,100,0,210],
	// wave 4
	[1,270,400,100,0,300],
	[1,90,400,100,0,300]
];

//------------------------------
// level 2
missiles[1] = 50;
enemies[1] = [
	// wave 1
	[1,250,330,100,0,0],
	[1,260,330,100,0,0],
	[1,270,330,100,0,0],
	[1,280,330,100,0,0],
	[1,290,330,100,0,0],
	// wave 2
	[1,70,330,100,0,200],
	[1,80,330,100,0,200],
	[1,90,330,100,0,200],
	[1,100,330,100,0,200],
	[1,110,330,100,0,200],
	// wave 3
	[1,250,330,100,0,400],
	[1,260,330,100,0,400],
	[1,270,330,100,0,400],
	[1,280,330,100,0,400],
	[1,290,330,100,0,400],
	// wave 4
	[1,70,330,100,0,600],
	[1,80,330,100,0,600],
	[1,90,330,100,0,600],
	[1,100,330,100,0,600],
	[1,110,330,100,0,600],
	// wave 5
	[1,340,500,100,0,800],
	[1,350,500,100,0,800],
	[1,0,500,100,0,800],
	[1,10,500,100,0,800],
	[1,20,500,100,0,800],
	[1,160,500,100,0,800],
	[1,170,500,100,0,800],
	[1,180,500,100,0,800],
	[1,190,500,100,0,800],
	[1,200,500,100,0,800]
];

//------------------------------
// level 3
missiles[2] = 40;
enemies[2] = [
	// wave 1
	[1,10,500,100,0,10],
	[1,20,500,100,0,20],
	[1,30,500,100,0,30],
	[1,40,500,100,0,40],
	[1,50,500,100,0,50],
	[1,60,500,100,0,60],
	[1,70,500,100,0,70],
	[1,80,500,100,0,80],
	// wave 2
	[1,190,500,100,0,190],
	[1,200,500,100,0,200],
	[1,210,500,100,0,210],
	[1,220,500,100,0,220],
	[1,230,500,100,0,230],
	[1,240,500,100,0,240],
	[1,250,500,100,0,250],
	[1,260,500,100,0,260],
	// wave 3
	[1,350,500,100,0,370],
	[1,340,500,100,0,380],
	[1,330,500,100,0,390],
	[1,320,500,100,0,400],
	[1,310,500,100,0,410],
	[1,300,500,100,0,420],
	[1,290,500,100,0,430],
	[1,280,500,100,0,440],
	// wave 4
	[1,170,500,100,0,550],
	[1,160,500,100,0,560],
	[1,150,500,100,0,570],
	[1,140,500,100,0,580],
	[1,130,500,100,0,590],
	[1,120,500,100,0,600],
	[1,110,500,100,0,610],
	[1,100,500,100,0,620]
];

//------------------------------
// level 4
missiles[3] = 32;
enemies[3] = [
	// wave 1
	[1,170,440,100,0,0],
	[2,180,430,100,0,0],
	[1,190,440,100,0,0],
	// wave 2
	[1,350,440,100,0,150],
	[2,0,430,100,0,150],
	[1,10,440,100,0,150],
	// wave 3
	[1,170,440,100,0,300],
	[2,180,430,100,0,300],
	[1,190,440,100,0,300],
	// wave 4
	[1,350,440,100,0,450],
	[2,0,430,100,0,450],
	[1,10,440,100,0,450],
	// wave 5
	[1,250,440,100,0,600],
	[1,290,440,100,0,600],
	[1,70,440,100,0,600],
	[1,110,440,100,0,600],
	// wave 5
	[2,250,440,100,0,700],
	[2,290,440,100,0,700],
	[2,70,440,100,0,700],
	[2,110,440,100,0,700],
];

//------------------------------
// level 5
missiles[4] = 100;
enemies[4] = [
	// wave 1
	[1,340,440,100,0,0],
	[1,20,440,100,0,0],
	[1,160,440,100,0,0],
	[1,200,440,100,0,0],
	[1,70,340,100,0,0],
	[1,110,340,100,0,0],
	[1,250,340,100,0,0],
	[1,290,340,100,0,0],
	// wave 2
	[1,340,440,100,0,400],
	[2,0,440,100,0,400],
	[1,20,440,100,0,400],
	[1,160,440,100,0,400],
	[2,180,440,100,0,400],
	[1,200,440,100,0,400],
	[1,70,340,100,0,400],
	[2,90,340,100,0,400],
	[1,110,340,100,0,400],
	[1,250,340,100,0,400],
	[2,270,340,100,0,400],
	[1,290,340,100,0,400],
	// wave 3
	[2,340,440,100,0,800],
	[1,0,440,100,0,800],
	[2,20,440,100,0,800],
	[2,160,440,100,0,800],
	[1,180,440,100,0,800],
	[2,200,440,100,0,800],
	[2,70,340,100,0,800],
	[1,90,340,100,0,800],
	[2,110,340,100,0,800],
	[2,250,340,100,0,800],
	[1,270,340,100,0,800],
	[2,290,340,100,0,800],
	// wave 4
	[2,0,440,100,0,1200],
	[2,180,440,100,0,1200],
	[2,90,340,100,0,1200],
	[2,270,340,100,0,1200]
];

//------------------------------
// level 6
missiles[5] = 40;
enemies[5] = [
	// wave 1
	[2,160,440,100,0,0],
	[2,170,440,100,0,0],
	[2,180,440,100,0,0],
	[2,190,440,100,0,0],
	[2,200,440,100,0,0],
	// wave 2
	[2,340,440,100,0,150],
	[2,350,440,100,0,150],
	[2,0,440,100,0,150],
	[2,10,440,100,0,150],
	[2,20,440,100,0,150],
	// wave 3
	[2,340,440,100,0,450],
	[2,350,440,100,0,450],
	[2,0,440,100,0,450],
	[2,10,440,100,0,450],
	[2,20,440,100,0,450],
	[2,160,440,100,0,450],
	[2,170,440,100,0,450],
	[2,180,440,100,0,450],
	[2,190,440,100,0,450],
	[2,200,440,100,0,450],
];

//------------------------------
// level 7
missiles[6] = 50;
enemies[6] = [
	// wave 1
	[1,130,450,100,0,0],
	[2,150,450,100,0,0],
	[1,170,450,100,0,0],
	// wave 2
	[1,310,500,100,0,150],
	[2,330,500,100,0,150],
	[1,350,500,100,0,150],
	// wave 3
	[1,190,500,100,0,300],
	[2,210,500,100,0,300],
	[1,230,450,100,0,300],
	// wave 4
	[1,10,500,100,0,450],
	[2,30,500,100,0,450],
	[1,50,500,100,0,450],
	// wave 5
	[3,0,450,100,0,650],
	[3,180,450,100,0,650],
	[2,90,350,100,0,650],
	[2,270,350,100,0,650]
];

//------------------------------
// level 8
missiles[7] = 100;
enemies[7] = [
	// wave 1
	[2,345,440,100,0,0],
	[2,15,440,100,0,0],
	[2,75,440,100,0,0],
	[2,105,440,100,0,0],
	[2,165,440,100,0,0],
	[2,195,440,100,0,0],
	[2,255,440,100,0,0],
	[2,285,440,100,0,0],
	// wave 2
	[1,350,440,100,0,300],
	[1,10,440,100,0,300],
	[1,80,440,100,0,300],
	[1,100,440,100,0,300],
	[1,170,440,100,0,300],
	[1,190,440,100,0,300],
	[1,260,440,100,0,300],
	[1,280,440,100,0,300],
	// wave 3
	[3,0,440,100,0,700],
	[3,60,440,100,0,700],
	[3,120,440,100,0,700],
	[3,180,440,100,0,700],
	[3,240,440,100,0,700],
	[3,300,440,100,0,700]
];

//------------------------------
// level 9
missiles[8] = 80;
enemies[8] = [
	// wave 1
	[1,160,440,100,0,0],
	[1,170,440,100,0,0],
	[1,180,440,100,0,0],
	[1,190,440,100,0,0],
	[1,200,440,100,0,0],
	[3,15,440,100,0,0],
	[3,345,440,100,0,0],
	// wave 2
	[1,340,440,100,0,250],
	[1,350,440,100,0,250],
	[1,0,440,100,0,250],
	[1,10,440,100,0,250],
	[1,20,440,100,0,250],
	[3,165,440,100,0,250],
	[3,195,440,100,0,250],
	// wave 3
	[2,220,450,100,0,500],
	[2,230,450,100,0,500],
	[2,40,450,100,0,500],
	[2,50,450,100,0,500],
	// wave 4
	[1,305,450,100,0,750],
	[3,315,450,100,0,750],
	[1,325,450,100,0,750],
	[1,145,450,100,0,750],
	[3,135,450,100,0,750],
	[1,125,450,100,0,750],
	// wave 5
	[2,180,450,100,0,800],
	[2,0,450,100,0,800]
];

//------------------------------
// level 10
missiles[9] = 27;
enemies[9] = [
	// wave 1
	[3,0,400,100,0,0],
	[3,120,400,100,0,0],
	[3,240,400,100,0,0],
	// wave 2
	[2,60,500,100,0,150],
	[2,180,500,100,0,150],
	[2,300,500,100,0,150],
	// wave 3
	[1,30,500,100,0,350],
	[1,90,500,100,0,350],
	[1,150,500,100,0,350],
	[1,210,500,100,0,350],
	[1,270,500,100,0,350],
	[1,330,500,100,0,350]
];

//------------------------------
// level 11
missiles[10] = 50;
enemies[10] = [
	// wave 1
	[2,30,400,100,0,0],
	[2,90,400,100,0,0],
	[2,150,400,100,0,0],
	[2,210,400,100,0,0],
	[2,270,400,100,0,0],
	[2,330,400,100,0,0],
	// wave 2
	[2,0,500,100,0,100],
	[2,60,500,100,0,100],
	[2,120,500,100,0,100],
	[2,180,500,100,0,100],
	[2,240,500,100,0,100],
	[2,300,500,100,0,100],
	// wave 3
	[2,20,500,100,0,200],
	[2,80,500,100,0,200],
	[2,140,500,100,0,200],
	[2,200,500,100,0,200],
	[2,260,500,100,0,200],
	[2,320,500,100,0,200],
	// wave 4
	[2,10,500,100,0,300],
	[2,70,500,100,0,300],
	[2,130,500,100,0,300],
	[2,190,500,100,0,300],
	[2,250,500,100,0,300],
	[2,310,500,100,0,300]
];

//------------------------------
// level 12
missiles[11] = 100;
enemies[11] = [
	// wave 1
	[1,240,300,100,0,0],
	[1,250,300,100,0,0],
	[2,260,300,100,0,0],
	[3,270,300,100,0,0],
	[2,280,300,100,0,0],
	[1,290,300,100,0,0],
	[1,300,300,100,0,0],
	// wave 2
	[1,60,400,100,0,150],
	[1,70,400,100,0,150],
	[2,80,400,100,0,150],
	[3,90,400,100,0,150],
	[2,100,400,100,0,150],
	[1,110,400,100,0,150],
	[1,120,400,100,0,150],
	// wave 3
	[1,330,470,100,0,300],
	[1,340,470,100,0,300],
	[2,350,470,100,0,300],
	[3,0,470,100,0,300],
	[2,10,470,100,0,300],
	[1,20,470,100,0,300],
	[1,30,470,100,0,300],
	// wave 4
	[1,150,470,100,0,450],
	[1,160,470,100,0,450],
	[2,170,470,100,0,450],
	[3,180,470,100,0,450],
	[2,190,470,100,0,450],
	[1,200,470,100,0,450],
	[1,210,470,100,0,450],
	// wave 5
	[2,25,520,100,0,700],
	[3,35,520,100,0,700],
	[2,45,520,100,0,700],
	// wave 6
	[2,205,520,100,0,850],
	[3,215,520,100,0,850],
	[2,225,520,100,0,850],
	// wave 7
	[2,135,520,100,0,1000],
	[3,145,520,100,0,1000],
	[2,155,520,100,0,1000],
	// wave 8
	[2,315,520,100,0,1150],
	[3,325,520,100,0,1150],
	[2,335,520,100,0,1150],
];

//------------------------------
// level 13
missiles[12] = 80;
enemies[12] = [
	// wave 1
	[1,210,330,100,0,0],
	[1,225,330,100,0,0],
	[1,240,330,100,0,0],
	[1,255,330,100,0,0],
	[1,270,330,100,0,0],
	[1,285,330,100,0,0],
	[1,300,330,100,0,0],
	[1,315,330,100,0,0],
	[1,330,330,100,0,0],
	// wave 2
	[2,350,430,100,0,220],
	[3,0,430,100,0,220],
	[2,10,430,100,0,220],
	[2,170,430,100,0,220],
	[3,180,430,100,0,220],
	[2,190,430,100,0,220],
	// wave 3
	[2,115,350,100,0,450],
	[4,105,350,100,0,450],
	[2,95,350,100,0,450],
	[2,85,350,100,0,450],
	[4,75,350,100,0,450],
	[2,65,350,100,0,450],
	// wave 4
	[1,260,350,100,0,600],
	[4,270,350,100,0,600],
	[1,280,350,100,0,600]
];

//------------------------------
// level 14
missiles[13] = 120;
enemies[13] = [
	// wave 1
	[3,345,400,100,0,0],
	[3,0,400,100,0,0],
	[3,15,400,100,0,0],
	// wave 2
	[2,140,500,100,0,200],
	[2,150,500,100,0,200],
	[2,160,500,100,0,200],
	[2,200,500,100,0,200],
	[2,210,500,100,0,200],
	[2,220,500,100,0,200],
	// wave 3
	[2,330,500,100,0,400],
	[4,320,500,100,0,400],
	[2,310,500,100,0,400],
	[2,30,500,100,0,400],
	[4,40,500,100,0,400],
	[2,50,500,100,0,400],
	// wave 4
	[3,160,450,100,0,700],
	[4,170,450,100,0,700],
	[4,190,450,100,0,700],
	[3,200,450,100,0,700],
	// wave 5
	[2,70,400,100,0,950],
	[3,90,400,100,0,950],
	[2,110,400,100,0,950],
	[2,250,400,100,0,950],
	[3,270,400,100,0,950],
	[2,290,400,100,0,950]
];

//------------------------------
// level 15
missiles[14] = 200;
enemies[14] = [
	// wave 1
	[3,150,450,100,0,0],
	[3,210,450,100,0,0],
	[3,30,450,100,0,0],
	[3,330,450,100,0,0],
	// wave 2
	[4,0,430,100,0,100],
	[2,85,330,100,0,100],
	[2,95,330,100,0,100],
	[4,180,430,100,0,100],
	[2,275,330,100,0,100],
	[2,265,330,100,0,100],
	// wave 3
	[1,15,530,100,0,500],
	[1,45,530,100,0,500],
	[1,75,530,100,0,500],
	[1,105,530,100,0,500],
	[1,135,530,100,0,500],
	[1,165,530,100,0,500],
	[1,195,530,100,0,500],
	[1,225,530,100,0,500],
	[1,255,530,100,0,500],
	[1,285,530,100,0,500],
	[1,315,530,100,0,500],
	[1,345,530,100,0,500],
	// wave 4
	[2,30,530,100,0,900],
	[2,60,530,100,0,900],
	[2,90,530,100,0,900],
	[2,120,530,100,0,900],
	[2,150,530,100,0,900],
	[2,180,530,100,0,900],
	[2,210,530,100,0,900],
	[2,240,530,100,0,900],
	[2,270,530,100,0,900],
	[2,300,530,100,0,900],
	[2,330,530,100,0,900],
	[2,0,530,100,0,900],
	// wave 5
	[3,135,550,100,0,1250],
	[3,225,550,100,0,1250],
	[3,45,550,100,0,1250],
	[3,315,550,100,0,1250],
	[4,0,430,100,0,1250],
	[2,85,330,100,0,1250],
	[2,95,330,100,0,1250],
	[4,180,430,100,0,1250],
	[2,275,330,100,0,1250],
	[2,265,330,100,0,1250]
];