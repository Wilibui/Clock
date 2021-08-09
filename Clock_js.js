let rh;
let rm;
let rs;
let lh;
let lm;
let ls;

let a;
let b;
let start;

let h;
let m;
let s;

let u = 50;
let numbers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);  
  noFill(); 
  
  u = width/40;
  
  rh = height / (4/3);
  rm = height / (40/33);
  rs = height / (10/9);
  lh = height / 5;
  lm = height / 4;
  ls = height / (10/3);
  
  a = PI / 30;
  b = PI / 12;
  start = 3 * PI / 2;
  
  numbers[0] = new Number(1.5*u, height/7, u);
  numbers[1] = new Number(4*u, height/7, u);
  numbers[2] = new Number(7*u, height/7, u);
  numbers[3] = new Number(9.5*u, height/7, u);
  numbers[4] = new Number(11.5*u, height/7 + u, 0.5*u);
  numbers[5] = new Number(13*u, height/7 + u, 0.5*u);
}

function draw() {
  background(127, 0, 0);
  s = second();
  m = minute() + (s / 60);
  h = hour() + (m / 60);
  digital();
  clock();  
}

function clock(){
  translate(2*width / 3, height / 2);
  strokeWeight(height / 40);
  noFill();
  
  //lines
  stroke(255);
  for (let i = 0; i < 12; i++) {
    let angle = i * (PI / 6) + start;
    let x1 = cos(angle) * (height / (20 / 9));  
    let y1 = sin(angle) * (height / (20 / 9));
    let x2 = cos(angle) * (height / (8 / 3));
    let y2 = sin(angle) * (height / (8 / 3));
    line(x1, y1, x2, y2);
  }
        
  //hours
  angle = b * h * 2 + start;
  stroke(0);
  line(0, 0, lh*cos(angle), lh*sin(angle));
  arc(0, 0, rh, rh, start, angle);

  //minutes
  angle = a * m + start;
  stroke(0, 150, 0);
  line(0, 0, lm*cos(angle), lm*sin(angle));
  arc(0, 0, rm, rm, start, angle);

  //seconds
  angle = a * s + start;
  stroke(0, 0, 150);
  line(0, 0, ls*cos(angle), ls*sin(angle));
  arc(0, 0, rs, rs, start, angle);
  point(0, 0);
}

function digital(){
  //hours
  if(hour() < 10){
    numbers[0].update(10);
  }else{
    numbers[0].update(floor(hour()/10));
  }
  numbers[1].update(hour() - floor(hour()/10)*10);  
  
  //minutes
  if(minute() < 10){
    numbers[2].update(0);
  }else{
    numbers[2].update(floor(minute()/10));
  }
  numbers[3].update(minute() - floor(minute()/10)*10);  
  
  
  //seconds
  if(second() < 10){
    numbers[4].update(0);
  }else{
    numbers[4].update(floor(second()/10));
  }
  numbers[5].update(second() - floor(second()/10)*10);  
  
  //show numbers
  for(let number of numbers){
    number.show();
  }
  
  //dots
  strokeWeight(u/3);
  stroke(255);
  point(5.5*u, height/7 - 0.8*u);
  point(5.5*u, height/7 + 0.8*u);
}

class Number{
  constructor(x, y, p){
    this.x = x;
    this.y = y;
    this.n = 8;
    this.u = p;
  }
  
  show(){
    strokeWeight(this.u/3);
    
    //1
    if(this.n == 0||this.n == 2||this.n == 3||this.n == 5||this.n == 6||this.n == 7||this.n == 8||this.n == 9){
      stroke(255);
    }else{
      noStroke();
    }
    line(this.x - (0.6*this.u), this.y - (2*this.u), this.x + (0.6*this.u), this.y - (2*this.u));
    //2
    if(this.n == 0||this.n == 4||this.n == 5||this.n == 6||this.n == 8||this.n == 9){
      stroke(255);
    }else{
      noStroke();
    }
    line(this.x - (0.8*this.u), this.y - (1.6*this.u), this.x - (0.8*this.u), this.y - (0.4*this.u));
    //3
    if(this.n == 0||this.n == 1||this.n == 2||this.n == 3||this.n == 4||this.n == 7||this.n == 8||this.n == 9){
      stroke(255);
    }else{
      noStroke();
    }
    line(this.x + (0.8*this.u), this.y - (1.6*this.u), this.x + (0.8*this.u), this.y - (0.4*this.u));
    //4
    if(this.n == 2||this.n == 3||this.n == 4||this.n == 5||this.n == 6||this.n == 8||this.n == 9){
      stroke(255);
    }else{
      noStroke();
    }
    line(this.x - (0.6*this.u), this.y, this.x + (0.6*this.u), this.y);
    //5
    if(this.n == 0||this.n == 2||this.n == 6||this.n == 8){
      stroke(255);
    }else{
      noStroke();
    }
    line(this.x - (0.8*this.u), this.y + (0.4*this.u), this.x - (0.8*this.u), this.y + (1.6*this.u));
    //6
    if(this.n == 0||this.n == 1 ||this.n == 3||this.n == 4||this.n == 5||this.n == 6||this.n == 7||this.n == 8||this.n == 9){
      stroke(255);
    }else{
      noStroke();
    }
    line(this.x + (0.8*this.u), this.y + (0.4*this.u), this.x + (0.8*this.u), this.y + (1.6*this.u));
    //7
    if(this.n == 0||this.n == 2||this.n == 3||this.n == 5||this.n == 6||this.n == 8||this.n == 9){
      stroke(255);
    }else{
      noStroke();
    }
    line(this.x - (0.6*this.u), this.y + (2*this.u), this.x + (0.6*this.u), this.y + (2*this.u));
  }
  update(n){
    this.n = n;
  }
}
