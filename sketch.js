let ground;
let lander;
var lander_img;
var bg_img;
var thrust,crash,land;
var izq_img;
var der_img;
var mardidefraicheur;




var vx = 0;
var vy = 0;
var g = 0.05;
var fuel = 100;
var timer;

var lz_img;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("vasquezbol.png");
  thrust = loadAnimation("pelota_abajo.png");
  crash= loadAnimation("crash1.png","crash2.png","crash3.png");
  land = loadAnimation("pngwing_com.png");
  der_img = loadAnimation("pelota_a_la_derecha.png");
  normal = loadAnimation("pngwing_com.png");
  izq_img = loadAnimation("pelota_a_la_izquierda.png");
  
  lz_img = loadImage("red.png");

  thrust.playing= true;
  thrust.looping= false;
  land.looping = false;
  crash.looping = false; 
  der_img.looping = false;
  izq_img.looping = false;

  mardidefraicheur = loadSound("mardi_de_fraicheur.mp3");
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);
  timer = 1500;
 
    
  
  

  thrust.frameDelay = 5;
  land.frameDelay = 5;
  crash.frameDelay = 10;
  izq_img.frameDelay = 5;

  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
  lander.setCollider("rectangle",0,0,200,200)

  //lander.addAnimation('thrust',"b_thrust_1.png","b_thrust_2.png","b_thrust_3.png" );
  lander.addAnimation('thrusting',thrust);
  lander.addAnimation('crashing',crash);
  lander.addAnimation('landing',land);
  lander.addAnimation('left',izq_img);
  lander.addAnimation('normal',normal);
  lander.addAnimation('right',der_img);

 

  ground = createSprite(500,690,1000,20);
  //ground.debug = true;
  lz = createSprite(860,480,50,30);
  lz.addImage(lz_img);
  lz.scale = 0.3;

  lz.setCollider("rectangle",0,0,400,100)
  //lz.debug = true;
  rectMode(CENTER);
  textSize(15);


  
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Velocidad horizontal: " +round(vx,2),800,50);
  text("Combustible: "+fuel,800,25);
  text("Velocidad vertical: "+round(vy),800,75);
  
  pop();
 
             
  // Caída
  vy +=g;
  lander.position.y+=vy;
  lander.position.x +=vx;

  // Detección de obstáculo

  // Detección de zona de aterrizaje
  var d = dist(lander.position.x,lander.position.y,lz.position.x,lz.position.y);
  console.log(d);

  if(d<=35 && (vy<2 && vy>-2 ) && (vx<2 && vx >-2) )
  {
    console.log("landed");
    vx = 0;
    vy = 0;
    g=0;
    lander.destroy();
    //lander.changeAnimation('landing');
    noLoop();
    mardidefraicheur.play();
    gameWon();  
  }

 /* * */   if(lander.collide(ground)==true)
  {
    console.log("collided");
    lander.changeAnimation('crashing');
    
    
    vx = 0;
    vy = 0;
    g = 0;
    mardidefraicheur.play();
gameOver();

  }

  drawSprites();
  lz.depth = lander.depth;
  lander.depth = lander.depth +1;
}

function keyPressed()
{
  if(keyCode==UP_ARROW && fuel>0)
  {
    upward_thrust();
    lander.changeAnimation('thrusting');
    thrust.nextFrame();
    
  }
  if(keyCode==RIGHT_ARROW && fuel>0)
  {
    lander.changeAnimation('left');
    right_thrust();
  }

  if(keyCode==LEFT_ARROW && fuel>0)
  {
    lander.changeAnimation('right');
    left_thrust();
  }
}

function upward_thrust()
{
  vy = -1;
  fuel-=1;
}

function right_thrust()
{ 
  vx += 0.2;
  fuel -=1;
}

function left_thrust()
{
  vx -= 0.2;
  fuel-=1;
}

function stop()
{
  vx = 0;
  vy = 0;
  fuel = 0;
  g = 0;
}

function gameOver(){
  swal(
    {
      title:'Perdiste eres una basura 👻',
      text: "Gracias por jugar, ya no regreses",
      imageUrl: "astley.gif",
      imageSize: "150x150",
      confirmButtonText: "Jugar de nuevo"
    },
    function(isConfirm){
      if(isConfirm){
        location.reload();
      }
    }
  )
}

function gameWon(){
  swal(
    {
      title:'Ganaste, eres una basura 👻',
      text: "Gracias por jugar, ya no regreses",
      imageUrl: "astley.gif",
      imageSize: "150x150",
      confirmButtonText: "Jugar de nuevo"
    },
    function(isConfirm){
      if(isConfirm){
        location.reload();
      }
    }
  )
}