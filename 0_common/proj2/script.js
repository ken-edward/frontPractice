

// wasd
var up = false,
    right = false,
    down = false,
    left = false,
    x = 50.0,
    y = 50.0,
		ans = true;
document.addEventListener('keydown',press);
document.getElementById("btn1").addEventListener('click',hello);

function checkAnswer() {
	ans = x <= window.innerWidth/2 ? true : false;

	var div = document.querySelector('#selection')
	
	if (ans) {
		div.innerText="현재 선택: O";
	} else {
		div.innerText="현재 선택: X";
	}
}

function hello() {
  if (ans) {
		location.href = "result.html?1"
	} else {
		location.href = "result.html?0"
	}
}

function press(e){
  if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */){
    up = true
  }
  if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */){
    right = true
  }
  if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */){
    down = true
  }
  if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */){
    left = true
  }
}
document.addEventListener('keyup',release)
function release(e){
  if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */){
    up = false
  }
  if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */){
    right = false
  }
  if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */){
    down = false
  }
  if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */){
    left = false
  }
}
function gameLoop(){
  var div = document.querySelector('.move')
  if (up){
    y = y - 1
  }
  if (right){
    x = x + 1
  }
  if (down){
    y = y + 1
  }
  if (left){
    x = x - 1
  }
	if (x < 0) x = 0;
	if (x > 100) x = 100;
  if (y < 50) y = 50;
	if (y > 100) y = 100;
  div.style.left = x+'%'
  div.style.top = y+'%'
	checkAnswer();
  window.requestAnimationFrame(gameLoop)
}
window.requestAnimationFrame(gameLoop)

