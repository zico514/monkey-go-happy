//Global Variables
var playerRun, bananaImage, obstacleImage, obstacleGroup, backgroun, score, foodGroup;

var gameState = "play";

function preload() {
  backgroun = loadImage("jungle.jpg");

  playerRun = loadAnimation("Monkey_02.png", "Monkey_01.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");

}


function setup() {
  createCanvas(600, 350);
  if (gameState === "play" || gameState === "over") {

    backgrou = createSprite(0, 200, 200, 1000);
    backgrou.addImage(backgroun);
    
    backgrou.velocityX = -4;
    backgrou.x = backgrou.width / 2;
    
    player = createSprite(50, 300, 10, 10);
    player.addAnimation("running", playerRun);
    player.scale = 0.15;

  }




  obstacleGroup = new Group();
  foodGroup = new Group();
  ground = createSprite(300, 350, 2000, 10);
  player.collide(ground);
  ground.visible = false;

  score = 0;

  textSize(20);
  stroke("white");
  fill("white");
}


function draw() {


  background("black");

  if (gameState === "play") {






    if (player.isTouching(obstacleGroup)) {
      gameState = "over";
      obstacleGroup.destroyEach();


    }

  } else if (gameState === "over") {



    player.scale = 0.12;





    if (player.isTouching(obstacleGroup)) {
      gameState = "real";
      obstacleGroup.destroyEach();
    
    }


  } else if (gameState === "real") {
    text("game over!!", 233, 120)
    player.velocityX = -200;
  }


  if (gameState === "play" || gameState === "over") {
    if (keyDown("space") && player.y >= 300) {
      player.velocityY = -17;


    }










    if (backgrou.x < 200) {
      backgrou.x = backgrou.width / 2;
    }






    spawnstone();
    spawnFood();



    if (player.isTouching(foodGroup)) {
      score = score + 2;
      foodGroup.destroyEach();
    }

  }




  player.velocityY = player.velocityY + 0.8



  switch (score) {
    case 10:
      player.scale = 0.17
      break;
    case 20:
      player.scale = 0.19
      break;
    case 30:
      player.scale = 0.21
      break;
    case 40:
      player.scale = 0.23
      break;
    default:
      break;
  }





  //console.log(frameCount);





  player.collide(ground);

  drawSprites();
  text(mouseX + "," + mouseY, mouseX, mouseY);
  text("SCORE: " + score, 400, 50);

}

function spawnFood() {

  if (frameCount % 200 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(200, 50));
    cloud.addImage(bananaImage);
    cloud.scale = 0.07;
    cloud.velocityX = -4;

    //assign lifetime to the variable
    cloud.lifetime = 150;
    
    //adjust the depth
    cloud.depth = player.depth;
    player.depth = player.depth + 1;
    // add each cloud to the group
    foodGroup.add(cloud);

  }

}


function spawnstone() {

  if (frameCount % 300 === 0) {
    var clou = createSprite(600, 330, 40, 10);
    clou.addImage(obstacleImage);
    clou.scale = 0.2;
    clou.velocityX = -4;

    //assign lifetime to the variable
    clou.lifetime = 170;
    clou.debug = true;
    clou.setCollider("circle", 0, 0, 150);
    //adjust the depth
    clou.depth = player.depth;
    player.depth = player.depth + 1;
    // add each cloud to the group
    obstacleGroup.add(clou);

  }

}