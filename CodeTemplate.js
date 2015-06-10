$(document).ready(function(){
	
document.body.onmousedown = function() { return false; } //so page is unselectable

	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var mx, my;
	var Menu = 0;
	var bx1 = 200;
	var by1 = 50;
	var bw1 = 180;
	var bh1 = 300;
	var playery = 200;
	var playerx = 75;
	var playerSizeX = 6;
	var playerSizeY = 6;
	var numenemiesV1 = 20;
	var N = 1;
	var numenemiesV2 = 1;
	var enemies3 = [];
	var enemies = [];
	var enemies2 = [];
	var player = [];
	var numplayer = 1;
	var numenemiesV3 = 1;
	var score = 0;
	
	/*
	var enemy = makePicture(Enemy1)
	
	var numObjects = 0;
	var numObjectsLoaded = 0;
	
	function loadObjects(){
		numObjectsLoaded++;
	}
	
	function makePicture(Enemy1){
		var newPic = new Image();
		newPic.src = path;
		newPic.onload = loadObjects;
		
		numObjects++;
		
		return newPic;
		}
	
	*/
	
	
	/////////////////////////////////
	////////////////////////////////
	////////	GAME INIT
	///////	Runs this code right away, as soon as the page loads.
	//////	Use this code to get everything in order before your game starts 
	//////////////////////////////
	/////////////////////////////
	function init()
	{
		
		
	//////////
	///STATE VARIABLES
	
	//////////////////////
	///GAME ENGINE START
	//	This starts your game/program
	//	"paint is the piece of code that runs over and over again, so put all the stuff you want to draw in here
	//	"60" sets how fast things should go
	//	Once you choose a good speed for your program, you will never need to update this file ever again.

	if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 60);
	}

	
	
	
	
	function makePlayer(color,sizex,sizey){ ////////////////// Making the player code with eating ////////////////////////
		var result = {
			cc:color,
			width:sizex,
			height:sizey,
			draw:function(){
				ctx.fillStyle = this.cc;
				ctx.fillRect(playerx,playery,this.width,this.height);
			},
			eating:function(){
				for(var i = 0; i < enemies.length; i++){
					if(enemies[i].x <= (playerx + this.width) && enemies[i].x >= playerx && enemies[i].y <= (playery + this.height) && enemies[i].y >= playery){
						if (enemies[i].width < this.width && enemies[i].height < this.height){
							score++;
							enemies.splice(i,1);
							this.width += enemies[i].width;
							this.height += enemies[i].height;
							playerSizeX = this.width;
							playerSizeY = this.height;
						}else{
							Menu = 0;
						}
					}
				}
				for(var i = 0; i < enemies2.length; i++){
					if(enemies2[i].x <= (playerx + this.width) && enemies2[i].x >= playerx && enemies2[i].y <= (playery + this.height) && enemies2[i].y >= playery){
						if (enemies2[i].width < this.width && enemies2[i].height < this.height){
							score++
							enemies2.splice(i,1);
							this.width++;
							this.height++;
							playerSizeX = this.width;
							playerSizeY = this.height;
						}else{
						if(enemies2[i].width > playerx && enemies2[i].height > playery){
							Menu = 4;
							}
						}
					}
				}
				for(var i = 0; i < enemies3.length; i++){
					if(enemies3[i].x <= (playerx + this.width) && enemies3[i].x >= playerx && enemies3[i].y <= (playery + this.height) && enemies3[i].y >= playery){
						if (enemies3[i].width < this.width && enemies3[i].height < this.height){
							score++
							enemies3.splice(i,1);
							this.width++;
							this.height++;
							playerSizeX = this.width;
							playerSizeY = this.height;
						}else{
							Menu = 4;
						}
					}
				}
				
				
				
			}
			
		}
		return result;
	}
	
	function makeEnemy(c){// The enemy Code and their moving code////////////////////////
		var result = {
			path:c,
			x:Math.floor(Math.random()*w),
			y:Math.floor(Math.random()*h), 
			width:5,
			height:5,
			speedx:1,
			speedy:1,
			visible:false,
			draw:function(){
				//ctx.fillStyle = 'green';
				var newPic = new Image();
				newPic.src = this.path;
				ctx.drawImage(newPic,this.x,this.y,this.width,this.height);
				//ctx.fillRect(this.x,this.y,this.width,this.height);
				if(this.x >= w){
			this.x = 0
			}
			},
			move:function(){
			this.x += this.speedx;
			this.y += this.speedy;
		
			if(this.x + this.width> w) this.speedx *= -1;
			if(this.x < (w/w-1)) this.speedx *= -1;
			if(this.y + this.height >h) this.speedy *= -1;
			if(this.y < (h/h-1))this.speedy *= -1;
			
			
			
			
			
		},
		}
		return result;
		}
		
	function makeEnemy2(c,w,h,posx,posy){// The enemy Code for the goomba and their moving code////////////////////////
		var result = {
			path:c,
			x:posx + Math.floor(Math.random()*w),
			y:posy + Math.floor(Math.random()*h), 
			width:w,
			height:h,
			speed:3,
			visible:false,
			draw:function(){
				var newPic = new Image();
				newPic.src = this.path;
				ctx.drawImage(newPic,this.x,this.y,this.width*2,this.height*2);
			},
			move:function(){
		
			if(this.x > playerx)this.x-= this.speed;
			if(this.x < playerx)this.x+= this.speed;
			if(this.y > playery)this.y-= this.speed;
			if(this.y < playery)this.y+= this.speed;
			
			
			
		},
		}
		return result;
		}

		
	
		
		
	for(var i = 0; i < numenemiesV1;i++){
	enemies[i] = makeEnemy('Enemy1.png');
	}
	
	for(var i = 0; i < numenemiesV2;i++){
	enemies2[i] = makeEnemy2('Enemy2.png',30,30,300,50);
	}
	for(var i = 0; i < numplayer;i++){
	player[i] = makePlayer('blue');
	}
	for(var i = 0; i < numenemiesV3;i++){
	enemies3[i] = makeEnemy2('Enemy3.png',50,50,400,200);
	}
	
	
	
	
	
	
	
	
	
	
	
	/////////////////////////////////////////all the way to here
	
	
	
	
	
	
	///////////////////////////////////////////////////////
	//////////////////////////////////////////////////////
	////////	Main Game Engine
	////////////////////////////////////////////////////
	///////////////////////////////////////////////////
	function paint()
	{
		
		ctx.fillStyle = 'white';
		ctx.fillRect(0,0, w, h);

		if(Menu == 0){/////////////////////////////////////////////////////////////////////////
		ctx.fillStyle = 'blue';/////////////////////////////////////////////////////////////////////
		ctx.fillRect(bx1,by1,bw1,bh1);/////////////////////// This is the menu//////////////////////////
		ctx.fillStyle = 'white';///////////////////////////////Kappa With The ////////////////////////
		ctx.font = 'Bold 15pt Times New Roman';//////////////   Blue Screen ///////////////////////////
		ctx.fillText('Welcome To Game',200,100) /////////////////////////////////////////////////////////
		ctx.fillText('Friendo Please Click',200,150)//////////////////////////////////////////////////
		ctx.fillText('To Continue',200,200)//////////////////////////////////////////////////////////////////
		}
		if(Menu == 1){// Red Menu
		ctx.fillStyle = 'red';
		ctx.fillRect(bx1,by1,bw1,bh1);
		ctx.fillStyle = 'white';
		ctx.fillText('Intro:',200,100)
		ctx.fillText('You are a blob but',200,120)
		ctx.fillText('you are not the king',200,140)
		ctx.fillText('eat other blobs to be',200,160)
		ctx.fillText('the biggest and you',200,180)
		ctx.fillText('win',200,200)
		ctx.fillText('Careful though if',200,240)
		ctx.fillText('they are bigger they',200,260)
		ctx.fillText('eat you',200,280)
		}
		else if(Menu == 2){// Green Menu
		ctx.fillStyle = 'green';
		ctx.fillRect(bx1,by1,bw1,bh1);
		ctx.fillStyle = 'white';
		ctx.fillText('Controls:',200,100)
		ctx.fillText('Up Arrow - Up',200,120)
		ctx.fillText('Down Arrow - Down',200,140)
		ctx.fillText('Left Arrow - Left',200,160)
		ctx.fillText('Right Arrow - Right',200,180)
		ctx.fillText('Space - Split In 2',200,200)
		ctx.fillText('Click to play',200,240)
		}
		else if(Menu == 3){
		
		var playa = makePlayer('blue',playerSizeX,playerSizeY);
		playa.draw();
		playa.eating();
		
		var total = enemies.length + enemies2.length + enemies3.length;
		if(total <= 5){
		for(var i = 0; i < numenemiesV1;i++){
		enemies[i] = makeEnemy('Enemy1.png');
	}
		for(var i = 0; i < numenemiesV2;i++){
		enemies2[i] = makeEnemy2('Enemy2.png',50,50,100,50);
	}
		for(var i = 0; i < numenemiesV3;i++){
		enemies3[i] = makeEnemy2('Enemy3.png',100,100,300,200);
	}
	}
		for(var i = 0; i < enemies.length;i++){ // Drawing the enemies
		enemies[i].draw();
		enemies[i].move();
		ctx.fillStyle = 'red';
	
		}
		
		for(var i = 0; i < enemies2.length;i++){ // Drawing the bigger enemies 
		enemies2[i].draw();
		enemies2[i].move();
}
		for(var i = 0; i < enemies3.length;i++){
		enemies3[i].draw();
		enemies3[i].move();
	}
	}	
		else if(Menu == 4){// Game Over Menu////////
		ctx.fillStyle = 'black';
		ctx.fillRect(bx1,by1,bw1,bh1);
		ctx.fillStyle = 'red';
		ctx.fillText('GAME OVER', 200,100)
		ctx.fillText('Refresh To Play',200,120)
		ctx.fillText('Again',200,140)
		}
		ctx.fillStyle = 'red';
		ctx.fillText('Score: '+ score,w - 100,450);
		
		
	}////////////////////////////////////////////////////////////////////////////////END PAINT/ GAME ENGINE
	

	
	
	////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////
	/////	MOUSE LISTENER 
	//////////////////////////////////////////////////////
	/////////////////////////////////////////////////////
	





	/////////////////
	// Mouse Click
	///////////////
	canvas.addEventListener('click', function (evt){
		if(Menu < 3 && mx > bx1 && mx < bw1+bx1 && my > by1 && my < bh1+by1){Menu++;//// Cycling through Menu Code /////
		}
		if(Menu == 4){
		
		location.reload();
		}
		
		
	      
	}, false);

	
	

	canvas.addEventListener ('mouseout', function(){pause = true;}, false);
	canvas.addEventListener ('mouseover', function(){pause = false;}, false);

      	canvas.addEventListener('mousemove', function(evt) {
        	var mousePos = getMousePos(canvas, evt);

		mx = mousePos.x;
		my = mousePos.y;

      	}, false);


	function getMousePos(canvas, evt) 
	{
	        var rect = canvas.getBoundingClientRect();
        	return {
          		x: evt.clientX - rect.left,
          		y: evt.clientY - rect.top
        		};
      	}
      

	///////////////////////////////////
	//////////////////////////////////
	////////	KEY BOARD INPUT
	////////////////////////////////
	
	function moveVert(howmuch){ //////////////////////// Function For Moving Up/Down  ////////////////////////
	 playery -= howmuch;///////////////////////////////////////////////////////////////////////////
	 if(playery < 0) playery = 0;//////////////////////////////////////////////////////////////
	 else if(playery > h - 10) playery = h - 10;////////////////////////////////////
	}
	function moveHori(howmuch){ /////////////////////// Function For Moving Left/Right ////////////////////
	playerx -= howmuch;////////////////////////////////////////////////////////////////////////////////////
	if(playerx < 0) playerx=0;///////////////////////////////////////////////////////////////////////////////
	else if(playerx > w - 10) playerx = w - 10;//////////////////////////////////////////////////////////////////
	}

	

	window.addEventListener('keydown', function(evt){
		var key = evt.keyCode;
		
	//p 80
	//r 82
	//1 49
	//2 50
	//3 51
		
	if(key == 40){// Move up
	
	  moveVert(-10);
	   }
	else if(key == 38){// Move Down
	
	moveVert(10);
	}
	if(key == 37){// Move left
	
	moveHori(10);
	}
	else if (key == 39){// Move Right
	moveHori(-10);
	}
		
		
		
		
		
		
		
		
		
		
	}, false);


init();	

})
