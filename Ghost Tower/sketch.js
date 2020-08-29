var bg, bg1;
var usr, usr1;
var clm, clm1;
var dor, dor1;
var d, c;
var l, l1;
var gameState = 0;

function preload() {
  bg1 = loadImage("tower.png");
  usr1 = loadImage("ghost.png");
  clm1 = loadImage("climber.png");
  dor1 = loadImage("door.png");
  
  d = new Group();
  c = new Group();
  l1 = new Group();
}

function setup() {
  createCanvas(600 ,500);
  bg = createSprite(300, 250, 600, 500);
  bg.addImage("tower", bg1);
  
  usr = createSprite(300, 250, 20, 20);
  usr.addImage("ghost", usr1);
  usr.scale = 0.4;
}

function draw() 
{
  background(180);
  drawSprites();
  
  if (gameState === 0) {
    bg.velocityY = 3;
  
    spawnD();
    if (bg.y > 500) {
      bg.y = 400;
    }
  
    if (keyDown("space")) {
      usr.velocityY = -6;
    }
  
    if (keyDown("right")) {
    usr.x = usr.x + 3;
    }
  
    if (keyDown("left")) {
    usr.x = usr.x - 3;
    }
  
    usr.velocityY = usr.velocityY + 0.8
    
    if (c.isTouching(usr)) {
      usr.velocityY = 0;
    }
    
    if (usr.isTouching(l1) || usr.y > 500) {
      usr.destroy();
      gameState = 1;
    }
  }
  
  if(gameState === 1) {
    d.visible = false;
    c.visible = false;
    l1.visible = false;
    usr.visible = false;
    bg.visible = false;
    background("black");
    textSize(90);
    text("GAME OVER", 40, 250);
  }
}

function spawnD() {
  if (frameCount % 80 === 0) {
    clm = createSprite(300, 250, 20, 20);
    clm.addImage("climber", clm1);
    
    l = createSprite(300, 250);
    l.width = clm.width;
    l.height = 5;
    
    dor = createSprite(200, 200, 20, 20);
    dor.addImage("door", dor1);
    
    dor.x = Math.round(random(63, 538));
    
    dor.velocityY = 3;
    clm.velocityY = 3;
    l.velocityY = 3;
    
    clm.depth = dor.depth + 1;
    
    clm.x = dor.x;
    l.x = dor.x;
    
    d.add(dor);
    c.add(clm);
    l1.add(l);
    
    dor.lifetime = 100;
    clm.lifetime = 100;
    l.lifetime = 100;
    
    usr.depth = dor.depth;
    usr.depth = usr.depth + 1;
  }
  
}