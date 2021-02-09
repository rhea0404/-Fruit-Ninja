//Game States
var PLAY=1;
var END=0;
var gameState=PLAY;

var knife;
var knifeImage ;
var sound;
var fruit,enemy,fruitGroup,enemyGroup;
var fruit1,fruit2,fruit3,fruit4,gameoverImage;
 var monster,monsterImage;

function preload(){
  
knifeImage = loadImage("knife.png");
fruit1=loadImage("fruit1.png");
fruit2=loadImage("fruit2.png");
fruit3=loadImage("fruit3.png");
fruit4=loadImage("fruit4.png");
gameoverImage=loadImage("gameover.png");
monsterImage=loadAnimation("alien1.png","alien2.png");
  
sound1=loadSound("knifeSwoosh.mp3");
sound2=loadSound("gameover.mp3");
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
fruitGroup=new Group();
enemyGroup=new Group();
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    fruits();
    Enemy();
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    knife.addImage(knifeImage);
  
    // Increase score if knife touching fruit
   if(knife.isTouching(fruitGroup)){
     fruitGroup.destroyEach();
     sound1.play();
     score=score+2;
   }
    
    if(knife.isTouching(enemyGroup)){
      gameState=END;
      knife.addImage(gameoverImage);
      sound2.play();
    }
   
     
   }
  if(gameState===END){
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityEach(0);
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    
    knife.x=250;
    knife.y=250;
  }
      
  
  
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}

function fruits(){
  if(World.frameCount%80===0){
    position=Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    //fruit.debug=true;
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1);
    } else{
      fruit.addImage(fruit4);
    }
    if(position==1){
      fruit.x=600;
      fruit.velocityX=7+(score/4);
    }
    else if (position==2){
      fruit.x=0;
      fruit.velocityX=7+(score/4);
    }
    fruit.y=Math.round(random(50,340));
    
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}

function Enemy(){
if(World.frameCount%200===0){
  monster=createSprite(450,25020,20);
  monster.addAnimation("alien",monsterImage);
  monster.y=Math.round(random(120,440));
  monster.velocityX=-(8+(score/10));
  monster.lifetime=100;
  
  enemyGroup.add(monster);
}
}