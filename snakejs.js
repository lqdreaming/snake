var screen=document.getElementById('screen');

	//简单模式
	var start=document.getElementById('start');
	var SimpleMode=document.getElementById('SimpleMode');
	var mode=document.getElementById('mode');
	SimpleMode.onclick=function(){
		mode.style.display='none';
		screen.style.display='block';
		snake();
		food();
		time=400;

	//复杂模式
	var complexMode=document.getElementById('complexMode');
	complexMode.onclick=function(){
		mode.style.display='none';
		screen.style.display='block';
		snake();
		food();
		time=200;
	}

	//开始
	start.onclick=function(){
		main(time);
	}
}

	function snake(){
		var snakePart=document.getElementsByClassName('snakePart');
		var screen=document.getElementById('screen');
		var food=document.getElementById('food');
		xb=Math.floor(Math.random()*(screen.offsetWidth-100)/25)*25;
		yb=Math.floor(Math.random()*(screen.offsetHeight-25)/25)*25;
		for (var i = 0; i < snakePart.length; i++) {
		snakePart[i].style.left=xb+25*i+'px';
		snakePart[i].style.top=yb+'px';
		}
	}
	//画食物以及所在位置
	function food(){
		var snakePart=document.getElementsByClassName('snakePart');
		var screen=document.getElementById('screen');
		var food=document.getElementById('food');
		var contextFood=food.getContext('2d');
		xa=Math.floor(Math.random()*(screen.offsetWidth-25)/25)*25;
		ya=Math.floor(Math.random()*(screen.offsetHeight-25)/25)*25;
		xc=snakePart[0].style.left;
		yc=	snakePart[0].style.top;
		while(xa<=xc+60&&xa>=xc&&ya<=yc+25&&ya>=yc) {
		xa=Math.floor(Math.random()*(screen.offsetWidth-25)/25)*25;
		ya=Math.floor(Math.random()*(screen.offsetHeight-25)/25)*25;	
	} 
		food.style.position="absolute";
		food.style.left=xa+'px';
		food.style.top=ya+'px';
		drawRect(contextFood,0,0,25,25,1,"blue","blue");
	}


	//蛇的运动
	var nowDirection='right';//定义当前移动方向
	var nextDirection='right';//下次移动方向
	var bool=true;//撞到边界结束游戏的判断
	function MoveSnake(){
		//蛇头位置
		if (bool) {
		var snakePart=document.getElementsByClassName('snakePart');
		var snakeHeadLeft=snakePart.item(0).style.left;
		var snakeHeadTop=snakePart.item(0).style.top;
		var snakePartLeft=null;//当前节点的坐标
		var snakePartTop=null;

		//根据方向判断蛇移动
		nowDirection=nextDirection;//改变当前移动方向
		if(nextDirection=='left'){
			snakePart.item(0).style.left=parseInt(snakePart.item(0).style.left)-25+'px';
		}else if(nextDirection=='right'){
			snakePart.item(0).style.left=parseInt(snakePart.item(0).style.left)+25+'px';
		}else if(nextDirection=='up'){
			snakePart.item(0).style.top=parseInt(snakePart.item(0).style.top)-25+'px';
		}else if(nextDirection=='down'){
			snakePart.item(0).style.top=parseInt(snakePart.item(0).style.top)+25+'px';
		}

		//移动蛇身
		for(var i=1;i<snakePart.length;i++){
			//保存当前节点坐标
			snakePartLeft=snakePart.item(i).style.left;
			snakePartTop=snakePart.item(i).style.top;
			//移动当前节点
			snakePart.item(i).style.left=snakeHeadLeft;
			snakePart.item(i).style.top=snakeHeadTop;
			//初始化下个节点的移动位置
			snakeHeadLeft=snakePartLeft;
			snakeHeadTop=snakePartTop;
		}

		//蛇吃食物
		if (touchCheck(snakePart)) {
			addSnakeLength(snakePart,snakeHeadLeft,snakeHeadTop);
		}

		//蛇碰到screen边界
		if (touchSide(snakePart)) {
			var dele=document.getElementById('dele');
			var closing=document.getElementById('closing');
			var num=document.getElementById('num');
			var number=document.getElementById('number');
			dele.remove();
			number.innerHTML=num.innerHTML;
			closing.style.display='block';
			bool=false;
			return bool;
		}
		}
	}

	//蛇与screen边界的判断
	function touchSide(snakePart){
		var screen=document.getElementById('screen');
		if (parseInt(snakePart.item(0).style.left)>=parseInt(screen.offsetWidth)||parseInt(snakePart.item(0).style.left)<=-25||parseInt(snakePart.item(0).style.top)>=parseInt(screen.offsetHeight)-50+40||parseInt(snakePart.item(0).style.top)<=40-50) {
			return true;
		}

		/*for(var i=1;i<snakePart.length;i++){
			console.log((snakePart.item(0).style.top));
			console.log((snakePart.item(i).style.top));
			console.log((snakePart.item(0).style.left));
			console.log((snakePart.item(i).style.left));
			console.log(parseInt(snakePart.item(0).style.left)==parseInt(snakePart.item(i).style.left));
			console.log((snakePart.item(0).style.top)==parseInt(snakePart.item(i).style.top));
		if (parseInt(snakePart.item(0).style.left)==parseInt(snakePart.item(i).style.left)&&
			parseInt(snakePart.item(0).style.top)-1==parseInt(snakePart.item(i).style.top)){
			return true;
			}*/else{
			return false;	
			}
		}

	//蛇与食物相碰的位置判断
	function touchCheck(snakePart){
		var food=document.getElementById('food');
		var num=document.getElementById('num');
		if (snakePart.item(0).style.left==food.style.left&&snakePart.item(0).style.top==food.style.top){
			newFood();
			num.innerHTML++;
			return true;
		}
		return false;
	}

	//蛇的长度增加
	function addSnakeLength(snakePart,snakeHeadLeft,snakeHeadTop){
		var dele=document.getElementById("dele");//获取screen对象
		var newBody=snakePart.item(snakePart.length-1).cloneNode(true);
		newBody.style.left=snakeHeadLeft;
		newBody.style.top=snakeHeadTop;
		dele.appendChild(newBody);//添加节点
	}

	//新的食物
	function newFood(){
		food();
	}

	function screenFocus(){//屏幕获得焦点
		document.getElementById("screen").focus();
	}

	function main(time)
	{
		var screen=document.getElementById("screen");
		screen.focus();
		window.onkeydown=function(event){
		snakeDirection(event);
		};//控制方向

		window.setInterval("screenFocus()",10);
		var dsq=window.setInterval("MoveSnake()",time);
	
		//暂停
		var stop=document.getElementById('stop');
		stop.onclick=function(){
		window.clearInterval(dsq,time);
		}

		//结束
		var reset=document.getElementById('reset');
		reset.onclick=function(){
		window.clearInterval(dsq,time);
		if(confirm('你是否要重新开始游戏?')){
		window.location.reload();//重新加载页面
		}else{
		window.setInterval("MoveSnake()",time);}
		}
	}

	//判断蛇身的方向
	function snakeDirection(event){
		var e=event||window.event;
	if (e.keyCode==37&&nowDirection!='right'){
		nextDirection = 'left';
	}
	else if (e.keyCode==38&&nowDirection!='down'){
		nextDirection = 'up';
	}
	else if (e.keyCode==39&&nowDirection!='left'){
		nextDirection = 'right';
	}
	else if (e.keyCode==40&&nowDirection!='up'){
		nextDirection = 'down';
	}
	}

	//画矩形
	function drawRect(cxt,x,y,width,height,k,c,col){
	cxt.lineWidth=k;
	cxt.beginPath()	
	cxt.strokeStyle=c;
	cxt.rect(x,y,width,height);
	cxt.fillStyle=col;
	cxt.fill();
	cxt.stroke();
	cxt.closePath();
	}