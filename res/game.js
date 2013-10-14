var width = 320,
//width of the canvas
  height = 500,
//height of the canvas
	gLoop,
	fallspeed = 10,

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
  ctx.fillStyle = '#d0e7f9';
//set active color to #d0e... (nice blue)
//UPDATE - as 'Ped7g' noticed - using clearRect() in here is useless, we cover whole surface of the canvas with blue rectangle two lines below. I just forget to remove this line
//ctx.clearRect(0, 0, width, height);
//clear whole surface
  ctx.beginPath();
//start drawing
  ctx.rect(0, 0, width, height);
//draw rectangle from point (0, 0) to
//(width, height) covering whole canvas
  ctx.closePath();
//end drawing
  ctx.fill();
//fill rectangle with active
//color selected before
}



//TODO: array drops


var drop = new (function(){
//create new object based on function and assign 
//what it returns to the 'player' variable

//attributes
    this.image = new Image();
    this.image.src = "drop.png";
//create new Image and set it's source to the 
//'angel.png' image I upload above


//TODO: clipping an size von tropfen anpassen
    this.width = 141;
//width of the single frame
    this.height = 137;
//height of the single frame

    this.X = 0;
    this.Y = 0;
//X&Y position

//methods 
    this.setPosition = function(x, y){
    this.X = x;
    this.Y = y;
}


	this.falling = function(){
		
		this.setPosition(this.X, this.Y+1);
		this.draw();
		
	}
	
	
    this.draw = function(){
        try {
			console.log("im try block");
			//ctx.drawImage(this.image, 10,10);
            ctx.drawImage(this.image, 0, 0, this.width, this.height, this.X, this.Y, this.width, this.height);
//cutting source image and pasting it into destination one, drawImage(Image Object, source X, source Y, source Width, source Height, destination X (X position), destination Y (Y position), Destination width, Destination height)
        } catch (e) {
//sometimes, if character's image is too big and will not load until the drawing of the first frame, Javascript will throws error and stop executing everything. To avoid this we have to catch an error and retry painting in another frame. It is invisible for the user with 50 frames per second.
		console.log("im catch block");
	   }
    }
})();
//we immediately execute the function above and 
//assign its result to the 'player' variable
//as a new object 

//drop.setPosition(~~((width-drop.width)/2),  ~~((height - drop.height)/2));
//our character is ready, let's move it 
//to the center of the screen,
//'~~' returns nearest lower integer from
//given float, equivalent of Math.floor()





var GameLoop = function(){
  clear();
  //MoveCircles(5);
  //DrawCircles();
  
  
	
	
	//drop.checkFall();
	drop.falling();
	//drop.draw();
	//drop.setPosition(20, 20);

	//drop.setPosition(this.X, this.Y + this.fallSpeed);

  
  gLoop = setTimeout(GameLoop, 20);
}
GameLoop();