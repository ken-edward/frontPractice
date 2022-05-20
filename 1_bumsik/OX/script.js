// wasd
var up = false,
    right = false,
    down = false,
    left = false,
    x = 50.0,
    y = 50.0,
		ans = true;
    myScore = 0;

var Question = [
                "자강두천은 사자성어이다?", // X
                "달팽이도 이빨이 있는가?", // O
                "대머리도 비듬이 생긴다?", // O
                "눈을 뜨고 재채기를 할수 있다?", // X
                "구기 종목 중에 가장 작은 공을 사용하는 경기는 골프이다?" // X
              ];

var answer = [false, true, true, false, false];

document.addEventListener('keydown',press); // 키 누르면 press 메서드
// document.getElementById("btn1").addEventListener('click', hello); // btn1에 클릭 이벤트 메서드 주입, 클릭하면 hello 메서드 실행.

function checkAnswer() {
	ans = x <= 50 ? true : false; // 화면 가로길이가 0부터 100까지 있다고 가정했을때, 0~50까지는 O를 선택한 것으로 confirm.

	var div = document.querySelector('#selection') 
	
	if (ans) {
		div.innerText = "현재 선택: O";
	} else {
		div.innerText = "현재 선택: X";
	}
}

function hello(quizNum) {
  if (ans == answer[quizNum]) {
		location.href = "result.html?1";
	} else {
		location.href = "result.html?0";
	}
}

function scoreUp(quizNum) {
  if(ans == answer[quizNum])
  {
    view.innerHTML = "정답입니다!!";
		myScore += 100;
	}
  else
  {
    view.innerHTML = "아쉽게도 오답입니다!!";
		myScore += 0;
	}
}

function press(e){
  if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */){
    up = true
  }
  if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */){
    right = true
  }
  if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */){
    down = true
  }
  if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */){
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

var Count = document.getElementById("count");
var time_5s = 5;
var timer_5s = 0;
var i = 0;

function Count_start()
{
  timer_5s = setInterval('CountDown()', 1000);
}

function CountDown()
{
  view.innerText = "READY???";
  Count.style.display = "inline";
  
  if (time_5s > 0)
  {
    Count.innerText = time_5s;
    time_5s -= 1;
  }
  else if (time_5s == 0)
  {
    view.innerText = "";
    Count.style.display = "none";
    clearInterval(timer_5s);
    time_5s = 5;
    count_bool = false;
  }
}

var view = document.getElementById("quiz"); // 문제 및 진행 상황이 들어갈 div.
var score = document.getElementById("score");
var quiz_time = 16;
var quiz_inv = 0;

function Quiz_start(quiz_num)
{
  quiz_inv = setInterval(function() { QuizLoop(quiz_num) }, 1000);
}

function QuizLoop(quiz_num)
{
  if (quiz_time > 0)
  {
    view.innerHTML = Question[quiz_num] + "<br><br>";
    quiz_time -= 1;
    console.log(quiz_time);

    if (quiz_time <= 5)
    {
      Count.style.display = "inline";
      Count.innerText = quiz_time;
    }
  }
  else if (quiz_time <= 0)
  {
    view.innerText = "";
    Count.style.display = "none";
    Count.innerText = "";
    clearInterval(quiz_inv);
    quiz_num -= 1;
    quiz_time = 16;
  }
}

function gameLoop(){
  var player = document.querySelector('.move')
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
  if (y < 25) y = 25;
	if (y > 100) y = 100;
  player.style.left = x +'%';
  player.style.top = y +'%';
  score.innerHTML = "score : " + myScore;
	checkAnswer();
  window.requestAnimationFrame(gameLoop);
}

var count_bool = true;
var quiz_length = Question.length-1;

/*function CountEnd()
{

  return new Promise(function(resolve, reject){
    resolve();
  });
}

CountEnd().then(Quiz_start(quiz_length));
setInterval(function() {QuizLoop(quiz_length)}, 1000);*/

const promise = new Promise((resolve, reject) => {

  Count_start();
  setTimeout(() => { resolve(quiz_length); }, 6000);

});
window.requestAnimationFrame(gameLoop);

promise
  .then(quiz_length => {
    Quiz_start(quiz_length);
    return new Promise((resolve, reject) => {
      setTimeout(() => { 
        if (quiz_length >= 0)
        { resolve(quiz_length); }
        else
        { reject(); }
      }, 17000);
    });
  })
  .then(quiz_length => {
    scoreUp(quiz_length);
    setTimeout(() => { Count_start() }, 3000);
    quiz_length -= 1;
    return new Promise((resolve, reject) => {
      setTimeout(() => { 
        if (quiz_length >= 0)
        { resolve(quiz_length); }
        else
        { reject(); }
      }, 8000);
    });
  })
  .then(quiz_length => {
    Quiz_start(quiz_length);
    return new Promise((resolve, reject) => {
      setTimeout(() => { 
        if (quiz_length >= 0)
        { resolve(quiz_length); }
        else
        { reject(); }
      }, 17000);
    });
  })
  .then(quiz_length => {
    scoreUp(quiz_length);
    setTimeout(() => { Count_start() }, 3000);
    quiz_length -= 1;
    return new Promise((resolve, reject) => {
      setTimeout(() => { 
        if (quiz_length >= 0)
        { resolve(quiz_length); }
        else
        { reject(); }
      }, 8000);
    });
  })
  


//////////////움직이는 코드/////////////////////
/*
var character = document.querySelector(".character");
//start in the middle of the map
var x = 90;
var y = 34;
var held_directions = []; //State of which arrow keys we are holding down
var speed = 1; //How fast the character moves in pixels per frame 
// 머리방향을 설정하기 위한 코드
   const held_direction = held_directions[0];
   if (held_direction) {
      if (held_direction === directions.right) {x += speed;}
      if (held_direction === directions.left) {x -= speed;}
      if (held_direction === directions.down) {y += speed;}
      if (held_direction === directions.up) {y -= speed;}
      // 얼굴 방향 = div character의 facing 속성
      character.setAttribute("facing", held_direction);
   }
   // 현재 캐릭터의 움직임(걷고 있는지) 여부 
   character.setAttribute("walking", held_direction ? "true" : "false");
   
// 키 입력이나 패드 움직임을 받을 때마다 캐릭터의 머리 방향, 카메라 시점, 캐릭터 위치를 변경시킴
const step = () => {
   placeCharacter();
   window.requestAnimationFrame(() => {
      step();
   })
}
step(); //kick off the first step!

const directions = {
   up: "up",
   down: "down",
   left: "left",
   right: "right",
}
const keys = {
   38: directions.up,
   37: directions.left,
   39: directions.right,
   40: directions.down,
}
// 요부분은 잘 이해 안됨
document.addEventListener("keydown", (e) => {
   var dir = keys[e.which];
   if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir)
   }
})
// 22
document.addEventListener("keyup", (e) => {
   var dir = keys[e.which];
   var index = held_directions.indexOf(dir);
   if (index > -1) {
      held_directions.splice(index, 1)
   }
});


*/