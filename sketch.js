const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var player, goal, ground, ball, goalKeeper, keeper1, goalImg, rightSlide, leftSlide, stand, keeper;

function preload(){
  goalImg = loadImage("sprites/GoalImg2.png")
  keeper = loadAnimation("sprites/Stand.png",
  "sprites/Stand.png","sprites/Stand.png",
  "sprites/Stand.png","sprites/Stand.png",
  "sprites/Stand.png","sprites/Stand.png",
  "sprites/LeftSlide.png","sprites/LeftSlide.png",
  "sprites/LeftSlide.png","sprites/Stand.png",
  "sprites/Stand.png","sprites/Stand.png",
  "sprites/Stand.png","sprites/Stand.png",
  "sprites/Stand.png","sprites/Stand.png",
  "sprites/RightSlide.png","sprites/RightSlide.png",
  "sprites/RightSlide.png");
  keeper1 = loadImage("sprites/Stand.png")
}

function setup() {
  createCanvas(800,800);
  engine = Engine.create();
  world = engine.world;
  player = createSprite(400,600,40,40);
  ground = Bodies.rectangle(width/2,height-249,width,10,{isStatic: true});
  World.add(world,ground)
  ball = new Ball(400,550,20);
  goal = Bodies.rectangle(width/2, 100, 50, 50,{isStatic: true});
  World.add(world,goal);
  goalKeeper = createSprite(400, 200, 25, 25);
  //goalKeeper.addImage(keeper1)
  goalKeeper.scale = 0.6
  goalKeeper.velocityX = -3
  //engine.world.gravity.y = -1
}

function draw() {
  background("green");  
  Engine.update(engine);
  imageMode(CENTER)
  image(goalImg,goal.position.x,goal.position.y,width/2,200);
  drawSprites();
  collide();
  ball.display();
  console.log(goalKeeper.x);
  if(goalKeeper.x<150||goalKeeper.x>650){
    goalKeeper.velocityX = goalKeeper.velocityX * -1;
  }
  if(ball.body.position.y<=150){
    Matter.Body.setStatic(ball.body,true);
    }
}

function keyPressed(){
  //if(keyCode===32){
    //engine.world.gravity.y = -1
  //}

  if(keyIsDown(UP_ARROW)){
    engine.world.gravity.y = -1
  }

  if(keyIsDown(LEFT_ARROW)){
    ball.body.position.x-=6
  }

  if(keyIsDown(RIGHT_ARROW)){
    ball.body.position.x+=6
  }
}

function collide(){
  if(ball.body.position.x === goalKeeper.x&&ball.body.position.y===goalKeeper.y){
    Matter.Body.setStatic(ball.body, true);
  }
}
