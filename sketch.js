var dog,dog_Img,dog_Img1;
var database;
var foods,foodStock;

function preload(){
   dog_Img=loadImage("images/dogImg.png");
   dog_Img1=loadImage("images/dogImg1.png");
  }

function setup() {
  createCanvas(600,700);
  database=firebase.database();

  dog=createSprite(250,300,150,150);
  dog.addImage("dog",dog_Img1);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}

function draw() {
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW) ){
    writeStock(foods);
    dog.addImage("dog",dog_Img);
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foods,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

function readStock(data){
  
  foods=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
  
}