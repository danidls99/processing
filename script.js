
let numBalls = 13;
let spring = 0.01;
let gravity = 0.03;
let friction = -0.9;
let balls = [];
let images = [];
let bg;
let font,
 
function preload() {
  images.push(loadImage('images/hemsworth.png'));
  images.push(loadImage('images/pratt.png'));
  images.push(loadImage('images/evans.png'));
  images.push(loadImage('images/pine.png'));
  images.push(loadImage('images/meloni.png'));
  images.push(loadImage('images/martin.png'));
  images.push(loadImage('images/rock.png'));
  images.push(loadImage('images/bale.png'));
  images.push(loadImage('images/slater.png'));

  // font = loadFont('Helvetica');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      random(width),
      random(height),
      random(90, 200),
      i,
      balls,
      images[Math.floor(random(0, images.length))],
    );    
    }
  
  noStroke();
  noFill();
  
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);
}



function draw() {
  background(175, 251, 255);

  textAlign(RIGHT);
  drawWords(width * 0.25);

  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.display();
  });
}

function drawWords(x) {
  // The text() function needs three parameters:
  // the text to draw, the horizontal position,
  // and the vertical position

  fill(255);
  text('Please do not tap on the glass.', x, 290);
}

//test
function mousePressed(event) {
  console.log(event);
    rect(mouseX, mouseY, 33, 33);
  }

class Ball {
  constructor(xin, yin, din, idin, oin, img) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
    this.chrispic = img;
  }

  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }



  display() {
    image(this.chrispic,this.x -this.diameter/4, this.y - this.diameter/4, this.diameter, this.diameter);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
