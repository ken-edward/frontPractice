var 가로 = 8;
var 세로 = 6;
var 색깔들 = [];
var 색깔후보 = 색깔들.slice();
var 색깔 = [];
var 클릭플래그 = true;
var 클릭카드 = [];
var 완성카드 = [];
var 시작시간;
function 셔플() { // 피셔예이츠 셔플
  for (var i = 0; 색깔후보.length > 0; i += 1) {
    색깔 = 색깔.concat(색깔후보.splice(Math.floor(Math.random() * 색깔후보.length), 1));
  }
}

function 카드세팅(가로, 세로) {
    클릭플래그 = false;
  for (var i = 0; i < 가로 * 세로; i += 1) {
    var card = document.createElement('div');
    card.className = 'card';
    var cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    var cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    var cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = 색깔[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
  

// ---------------여기서부터------------------------
    (function (c) { // 클로저 문제 해결
      card.addEventListener('click', function() {
        if (클릭플래그 && !완성카드.includes(c)) {
          c.classList.toggle('flipped');
          클릭카드.push(c);
          if (클릭카드.length === 100) {
            //뒤집을 기회 100번
            if (클릭카드[0].querySelector('.card-back').style.backgroundColor === 클릭카드[1].querySelector('.card-back').style.backgroundColor) {
              완성카드.push(클릭카드[0]);
              완성카드.push(클릭카드[1]);
              클릭카드 = [];
            }
          }
        }
      });
    })(card);
    document.querySelector('#wrapper').appendChild(card);
  }

//---------------여기까지 안쓸 코드찾기..-------------------
  document.querySelectorAll('.card').forEach(function (card, index) { // 초반 카드 공개
    setTimeout(function() {
      card.classList.add('flipped');
    }, 100 * index);
  });

  setTimeout(function() { // 카드 감추기
    document.querySelectorAll('.card').forEach(function (card) {
      card.classList.remove('flipped');
    });
    클릭플래그 = true;
    시작시간 = new Date();
  }, 5000);
}

셔플();
카드세팅(가로, 세로);






//---------------------캐릭터 색상 가져오기---------------------------
/*
1. 캐릭터색상이 뭔지 가져오는 코드
2. 그 색상을 카드 뒤집기에 대입
*/

//----------------------움직이는 코드---------------------------
// wasd
var up = false,
    right = false,
    down = false,
    left = false,
    x = 50.0,
    y = 50.0;

document.addEventListener('keydown',press);

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
	if (x < 5) x = 5;
	if (x > 90) x = 90;
  if (y < 5) y = 5;
	if (y > 95) y = 95;
  player.style.left = x +'%';
  player.style.top = y +'%';
  window.requestAnimationFrame(gameLoop);
}



//div(card)의 좌표를 구하는 소스
var divcard = $('card');

var divX = divcard.offset().left;
var divY = divcard.offset().top;


//-------------------카드 뒤집는 코드-------------------------------
document.addEventListener("keypress", checkKeyPressed, false);

function checkKeyPressed(e) {
	
     //move(div)영역과 card(div)영역이 겹친다면
	if(x == divX2 && y == divY2){
        if (e.keyCode === 74) { //키보드 j 키를 누르면 반응            
           c.classList.toggle('flipped'); //뒤집히는 효과
        }
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

document.addEventListener('keyup',release);
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

window.requestAnimationFrame(gameLoop);