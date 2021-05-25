var ghost, ghostimage,ghost2image, tower, towerimage, towerimage2, tower2, climberimage, climber, climberGroup, doorGroup, doorimage, door, invisiblesprite, invisiblegroup;
var gameState, PLAY = 1, END = 0;
var x;
var c = camera.position;// w = displayWidth; h = diaplyHeight;
function preload(){
  ghostimage = loadImage("ghost-jumping.png");
  ghost2image = loadImage("ghost-standing.png");
  towerimage = loadImage("tower.png");
  towerimage2 = loadImage("tower.png");
  climberimage = loadImage("climber.png");
  doorimage = loadImage("door.png");

}

function setup(){
  var w = displayWidth, h = displayHeight;
  //canvas is 600x600
  createCanvas(displayWidth,displayHeight)
  tower = createSprite(w/2,258,w,h);
  tower.addImage(towerimage);
  tower.velocityY = 5
  tower2 = createSprite(w/2,tower.y-(606*2)+10,w,h);
  tower2.addImage(towerimage);
  tower2.velocityY = 5
  ghost = createSprite(w/2,h/2,20,20);
  ghost.addImage(ghostimage);
  ghost.scale = 0.5;
    ghost.velocityY = ghost.velocityY+0.7;
   
  gameState = PLAY;
  climberGroup = new Group();
  doorGroup = new Group();
  invisibleGroup = new Group();
  
  
  
}
function draw(){
  background("black");
  var c = camera.position;

tower2.velocityY = 0;
tower.velocityY=0;


if( c.y <= tower.y-172){
tower2.y = tower.y-(606*2)+15
  }
  if(c.y<= tower2.y-172){
    tower.y = tower2.y-(606*2)+15
  }
    var w = displayWidth, h = displayHeight;
    c.y-=5

  if(gameState === PLAY){
    x = 1;
    ghost.velocityY = ghost.velocityY+0.7;

    if(keyDown(LEFT_ARROW)){
      ghost.x = ghost.x-10;
      console.log(ghost.x)
    } else if(keyDown(RIGHT_ARROW)){
      ghost.x = ghost.x+10;
      console.log(ghost.x)

    }
    
    if(keyDown("Space")){
      ghost.velocityY = -10;
    }
    if(ghost.isTouching(climberGroup)){
      ghost.velocityY = 0;
    }
     
    if(ghost.isTouching (invisibleGroup)){
      gameState = END;
      x = 0;
    }
    if(ghost.y > c.y + 432 || ghost.x <478 || ghost.x > 1078 || ghost.y < c.y-432){
      gameState = END;
    }
    if(frameCount%100 === 0){
      spawnclimber();
      
    }
    
    drawSprites();
  }else if(gameState === END){
    textSize(28);
   text("Game Over", w/2,c.y);
    text("Hit r to restart", w/2,c.y + 50);
       
    
  }
   if(keyDown("r") && gameState === END){
  x = 0;
     location.reload();
      gameState = PLAY;
        ghost = createSprite(w/2,h/2,20,20);
  ghost.addImage(ghostimage);
  ghost.scale = 0.5;
   }
  if(x ===0){
   
    
    ghost.velocityY = ghost.velocityY+0.7;
  }
  if(gameState === PLAY){
  textSize(30);
   fill("red");
  text("Do not go out of the frame, or out of the tower background", w/2-400, c.y-300);
  }
}

function spawnclimber(){
  var w = displayWidth, h = displayHeight;
  var c = camera.position;

  climber = createSprite(w/2, c.y-430, 10,10);
  climber.x = Math.round(random(w/2-300,w/2+300));

  //console.log(climber.x);
  climber.addImage(climberimage);
  climber.velocityY = 5
  climber.depth = ghost.depth-1;
  climberGroup.add(climber);
  climber.lifetime = h/5;
  invisiblesprite = createSprite(climber.x,climber.y+4,80,10);
  invisiblesprite.velocityY = 5;
  invisiblesprite.visible = false;
  invisibleGroup.add(invisiblesprite)
  door = createSprite(climber.x, climber.y-70, 10,10);
  door.addImage(doorimage);
  door.velocityY = 5;
  door.x = climber.x ;
  door.depth = climber.depth;
  doorGroup.add(door);
 doorGroup.lifetime = h/5;
  
}

  
