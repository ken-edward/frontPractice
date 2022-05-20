// 맵과 캐릭터 자원을 가져옴
var character = document.querySelector(".character");
var map = document.querySelector(".map");

//start in the middle of the map
var x = 90;
var y = 34;
var held_directions = []; //State of which arrow keys we are holding down
var speed = 1; //How fast the character moves in pixels per frame

const placeCharacter = () => {
   
    // 이건 뭔지 모르겠음
   var pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );
   
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
   
   // 벽에 충돌시 나가지 않게 하기 위한 코드
   var leftLimit = -8;
   var rightLimit = (16 * 11)+8;
   var topLimit = -8 + 32;
   var bottomLimit = (16 * 7);
   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; }
   
   // 카메라 크기 설정과 동시에 고정
   var camera_left = pixelSize * 66;
   var camera_top = pixelSize * 42;
   
   // 맵의 위치를 바꿈 카메라는 고정
   map.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, ${-y*pixelSize+camera_top}px, 0 )`;
   // 캐릭터의 위치를 변경
   character.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`;  
}


// 키 입력이나 패드 움직임을 받을 때마다 캐릭터의 머리 방향, 카메라 시점, 캐릭터 위치를 변경시킴
const step = () => {
   placeCharacter();
   window.requestAnimationFrame(() => {
      step();
   })
}
step(); //kick off the first step!



// 키보드로 입력받아 이벤트 발생
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







