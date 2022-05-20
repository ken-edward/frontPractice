//플레이어 x 와 y 위치 추적 
class Ship {

  constructor(x, spaceshipImage) {
   	this.x = x;
    this.score = 0;
    this.r = 15;
    this.respawn();
    // store the image in the ship object
    this.spaceshipImage = spaceshipImage;
  }
  
  //실시간으로 움직이는거랑 점수 올라가는거 
  update() {
  	if (this.isUp && this.y > 0) {
    	this.up();
    } else if (this.isDown && this.y < height - 20) {
    	this.down();
    }
    
    if (this.hasPlayerScoredAPoint()) {
    	this.score ++;
      this.respawn();
    }
  }
  
  display() {
    
    // 우주선 이미지 출력
    imageMode(CENTER);
    image(this.spaceshipImage, this.x, this.y, this.r*2, this.r*2);
  }
  
  //올라가기
  up() {
  	this.y--;
  }
  //내려가기
  down() {
  	this.y++;
  }
  //도착 지점에 도착하는지
  hasPlayerScoredAPoint() {
  	if (this.y <= 0) {
    	return true;
    }
    return false;
  }
  
  //리스폰
  respawn() {
    this.y = height - 20;
    this.isUp = false
    this.isDown = false;
  }
  

}