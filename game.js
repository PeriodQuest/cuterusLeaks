var width = 800,
//width of the canvas
  height = 600,
//height of the canvas
	gLoop,
	fallspeed = 1,
	cuterusspeed = 5,
	cutx,
    dropX = new Array(1000,1000,1000,1000,1000,1000,1000,1000,1000,1000),
    dropY = new Array(580,530,480,465,400,310,260,210,410,600),
	dropStatus = new Array(false,false,false,false,false,false,false,false,false,false);
	movingCount = 0;
	
	toolIsFullScore= 0;
	toolCapacity = 5;
	
	toolsCounter = 0;
	nextToolsCounter = 1;

	points = 0;
	toolIsMoving = false,
	movingSpeed = 10,
	
	

	
	padArray = new Array(4);
	padArray[0] = new Image();
    padArray[0].src = "res/images/pad_fresh.png";
	padArray[1] = new Image();
	padArray[1].src = "res/images/pad_light.png";
	padArray[2] = new Image();
	padArray[2].src = "res/images/pad_medium.png";
	padArray[3] = new Image();
	padArray[3].src = "res/images/pad_full.png";
	
	tamponArray = new Array(4);
	tamponArray[0] = new Image();
    tamponArray[0].src = "res/images/tampon_fresh.png";
	tamponArray[1] = new Image();
	tamponArray[1].src = "res/images/tampon_light.png";
	tamponArray[2] = new Image();
	tamponArray[2].src = "res/images/tampon_medium.png";
	tamponArray[3] = new Image();
	tamponArray[3].src = "res/images/tampon_full.png";

	sockArray = new Array(4);
	sockArray[0] = new Image();
    sockArray[0].src = "res/images/sock_fresh.png";
	sockArray[1] = new Image();
	sockArray[1].src = "res/images/sock_light.png";
	sockArray[2] = new Image();
	sockArray[2].src = "res/images/sock_medium.png";
	sockArray[3] = new Image();
	sockArray[3].src = "res/images/sock_full.png";
	
	
	cupArray = new Array(4);
	cupArray[0] = new Image();
    cupArray[0].src = "res/images/cup_fresh.png";
	cupArray[1] = new Image();
	cupArray[1].src = "res/images/cup_light.png";
	cupArray[2] = new Image();
	cupArray[2].src = "res/images/cup_medium.png";
	cupArray[3] = new Image();
	cupArray[3].src = "res/images/cup_full.png";
	
	imageSizeX = new Array();
	imageSizeY = new Array();

	imageSizeX[0] = 200;
	imageSizeY[0] = 121;
	imageSizeX[1] = 50;
	imageSizeY[1] = 183;
	imageSizeX[2] = 200;
	imageSizeY[2] = 113;
	imageSizeX[3] = 60;
	imageSizeY[3] = 107;
	
	toolsArray = new Array();
	toolsArray[0]= padArray;
	toolsArray[1] = tamponArray;
	toolsArray[2] = sockArray;
	toolsArray[3] = cupArray;

  c = document.getElementById('c'),
//canvas itself 

  ctx = c.getContext('2d');

//and two-dimensional graphic context of the
//canvas, the only one supported by all 
//browsers for now

c.width = width;
c.height = height;
//setting canvas size 

var clear = function(){

    
var background = new Image();
    background.src = "res/images/games-background.png";

    // Make sure the image is loaded first otherwise nothing will draw.
    ctx.drawImage(background,0,0);   
}




var cuterus = new (function(){

    this.image = new Image();
    this.image.src = "res/images/cuterus_s.png";

//TODO: clipping an size von tropfen anpassen
    this.width = 200;
    this.height = 168;

	this.movingCount= 0;
    this.X = 0;
    this.Y = 0;

//methods 
    this.setPosition = function(x, y){
    this.X = x;
    this.Y = y;
    cutx = this.X;
}


	this.moving = function(){
		
		// TODO: cuterus stoppt an den enden
		// TODO: cuterus changed position randomly nach x iterationen
		// TODO: x ist variabel
		
		movingCount = movingCount *Math.random();
		if (movingCount > 3)
		{
			console.log("movingCount= " + movingCount);
			cuterusspeed = cuterusspeed * -1;
			movingCount = 0;
			
		}
		
		
		if (this.X >= 795-this.width || this.X <= -5){
		console.log("direction of cuterus changed" + " " + movingCount);
		cuterusspeed = cuterusspeed * -1;}
		
		this.setPosition(this.X+cuterusspeed, this.Y);
		
		movingCount++;
		this.draw();
		
	}
	
	
    this.draw = function(){
        try {
			
            ctx.drawImage(this.image, 0, 0, this.width, this.height, this.X, this.Y, this.width, this.height);
//cutting source image and pasting it into destination one, drawImage(Image Object, source X, source Y, source Width, source Height, destination X (X position), destination Y (Y position), Destination width, Destination height)
        } catch (e) {
//sometimes, if character's image is too big and will not load until the drawing of the first frame, Javascript will throws error and stop executing everything. To avoid this we have to catch an error and retry painting in another frame. It is invisible for the user with 50 frames per second.
		console.log("im catch block");
	   }
    }
})();


var drop = new (function(){

    this.image = new Image();
    this.image.src = "res/images/drop_s.png";

//TODO: clipping an size von tropfen anpassen
    this.width = 141;
    this.height = 137;

    this.X = 0;
    this.Y = 0;

//methods 
    this.setPosition = function(x, y,i){
    dropX[i] = x;
    dropY[i] = y;
}


	this.falling = function(count){
		//test
		
		this.setPosition(dropX[count], dropY[count]+fallspeed,count);
		this.draw(count);
		
		
		if (dropY[count] < 0-this.height)
		{
		this.setPosition(cutx+100, dropY[count], count);
      this.draw(count);
		}
	else	
	if (dropY[count] < height)
    {
  		this.setPosition(dropX[count], dropY[count]+fallspeed,count);
      this.draw(count);
      checkCollision(count);
	   score();

    }
    else
    {
   		if(dropStatus[count] = false){
   			points = points - 1;	
   		}
      this.setPosition(cutx+100, 168, count);
      this.draw(count);
	dropStatus[count] = false;      
    }

	}
	
	
    this.draw = function(count){
        try {
			
            ctx.drawImage(this.image, 0, 0, this.width, this.height, dropX[count], dropY[count], this.width, this.height);
//cutting source image and pasting it into destination one, drawImage(Image Object, source X, source Y, source Width, source Height, destination X (X position), destination Y (Y position), Destination width, Destination height)
        } catch (e) {
//sometimes, if character's image is too big and will not load until the drawing of the first frame, Javascript will throws error and stop executing everything. To avoid this we have to catch an error and retry painting in another frame. It is invisible for the user with 50 frames per second.
		console.log("im catch block");
	   }
    }
})();



var preview = new (function(){


this.image = toolsArray[(toolsCounter+1)%4][0];
this.width = imageSizeX[(toolsCounter+1)%4];
//width of the tool
this.height = imageSizeY[(toolsCounter+1)%4];
//height of the tool

    this.X = 0;
    this.Y = 300;
//X&Y position

//methods 
	this.next = function(){

	this.image = toolsArray[(toolsCounter+1)%4][0];
	this.width = imageSizeX[(toolsCounter+1)%4];
		
	//width of the tool
	this.height = imageSizeY[(toolsCounter+1)%4];
	//height of the tool


	this.draw();
	}
	
    this.setPosition = function(x, y){
    this.X = x;
    this.Y = y;
}


  
 this.draw = function(){
        try {
            ctx.drawImage(this.image, 0, 0, this.width, this.height, this.X, this.Y, this.width, this.height);
      //cutting source image and pasting it into destination one, drawImage(Image Object, source X, source Y, source Width, source Height, destination X (X position), destination Y (Y position), Destination width, Destination height)
        } catch (e) {

     }
    }
})();


var tool = new (function(){

this.tifs = 0;
var testarray = toolsArray[toolsCounter];
this.image = testarray[0];

//this.image = toolsArray[toolsCounter][0];
this.width = imageSizeX[toolsCounter];
//width of the tool
this.height = imageSizeY[toolsCounter];

    this.X = 330;
    this.Y = 600-this.height;
//X&Y position

//methods 
	this.checkIfFull = function(){

	//console.log(toolIsFullScore);
	if (toolIsFullScore>toolCapacity){
		console.log(toolsCounter);
		var testarray = toolsArray[toolsCounter];
		this.image = testarray[this.tifs];
		console.log("tifs"+this.tifs);

		//this.image = toolsArray[toolsCounter][this.tifs];
		toolIsFullScore = 0;
		
		this.tifs++;


		this.draw();
			}
	}
    this.setPosition = function(x, y){
    this.X = x;
    this.Y = y;
}
	
	this.next = function(){
		this.tifs = 0;
		var testarray = toolsArray[toolsCounter];
		this.image = testarray[0];
		this.width = imageSizeX[toolsCounter];
		//width of the tool
		this.height = imageSizeY[toolsCounter];
		this.Y = 600-this.height;
		//height of the tool
	}


	this.move = function(){
	if (toolIsMoving){
		this.setPosition(this.X + movingSpeed, this.Y);
		}
	this.draw();}
	

  
  
 this.draw = function(){
        try {
            ctx.drawImage(this.image, 0, 0, this.width, this.height, this.X, this.Y, this.width, this.height);
      //cutting source image and pasting it into destination one, drawImage(Image Object, source X, source Y, source Width, source Height, destination X (X position), destination Y (Y position), Destination width, Destination height)
        } catch (e) {

     }
    }
})();

//COLLISION

var checkCollision = function(count) {

  
  var firstColl = height - drop.height - tool.height;

  var lastColl = height - tool.height;
  

  if ((dropY[count] > firstColl) && (dropY[count] < lastColl) && (dropStatus[count] == false)) {
      if ((dropX[count] > (tool.X - drop.width)) && (dropX[count] < (tool.X + tool.width))){
        dropStatus[count] = true;
		if(toolsCounter == 2){
			points = points -1;
		}
		else{
        points = points + 1;
        }
		toolIsFullScore++;
		
		tool.checkIfFull();
		
      }}
      else {
        //highscore down
      }
  }
  



//SCORE
var score = function() {


ctx.fillStyle = '#000000';
ctx.font="30px Arial";
ctx.fillText(points,700,580);

  ctx.fillStyle = '#000000';
	ctx.font="30px Arial";
	ctx.fillText("Next:",5,290);
}



window.addEventListener('keydown',doKeyDown,true);
window.addEventListener('keyup',doKeyUp,true);

function doKeyUp(evt){
toolIsMoving = false;
}

function doKeyDown(evt){
switch (evt.keyCode) {
case 32:
{
console.log("vor next"+toolsCounter);
toolsCounter = (toolsCounter+1)%4;
preview.next();
tool.next();
console.log("next"+toolsCounter);


//nextToolCounter = toosCounter +1;

}
break;
case 37:  /* Left arrow was pressed */
{
toolIsMoving = true;
movingSpeed = -10;
tool.move();}
break;
case 39:  /* Right arrow was pressed */
{
toolIsMoving = true;
movingSpeed = +10;
tool.move();}
break;
}
}



var GameLoop = function(){
	clear();
	cuterus.moving();
    for (var i=0; i<=10; i++){
        drop.falling(i);
        //drop.draw(i);
    }
	tool.move();
	preview.draw();
	gLoop = setTimeout(GameLoop, 20);
}
GameLoop();

