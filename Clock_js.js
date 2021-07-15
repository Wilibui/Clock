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
let d;

let weekday=new Array(7);

function setup() {
  createCanvas(windowWidth, windowHeight);  
  noFill(); 
  print(width);
  
  u = width/30
  
  rh = height / (4/3);
  rm = height / (40/33);
  rs = height / (10/9);
  lh = height / 5;
  lm = height / 4;
  ls = height / (10/3);
  
  a = PI / 30;
  b = PI / 12;
  start = 3 * PI / 2;
  
  numbers[0] = new Number(2*width/40, height/6);
  numbers[1] = new Number(5*width/40, height/6);
  numbers[2] = new Number(9*width/40, height/6);
  numbers[3] = new Number(12*width/40, height/6);
  
  weekday[0]="Monday";
  weekday[1]="Tuesday";
  weekday[2]="Wednesday";
  weekday[3]="Thursday";
  weekday[4]="Friday";
  weekday[5]="Saturday";
  weekday[6]="Sunday";
}

function draw() {
  background(0);
  s = second();
  m = minute() + (s / 60);
  h = hour() + (m / 60);
  d = new Date();
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
  stroke(150, 0, 0);
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
  textAlign(LEFT, BOTTOM);
  noStroke();
  fill(255);
  textSize(120);
  text(weekday[d.getDay()-1],2*width/40-u, height);
  
  
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
  for(let number of numbers){
    number.show();
  }
  
  //dots
  stroke(255);
  point(7*width/40, height/6 - 0.8*u);
  point(7*width/40, height/6 + 0.8*u);
}

class Number{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.n = 8;
  }
  
  show(){
    strokeWeight(u/3);
    
    //1
    if(this.n == 0||this.n == 2||this.n == 3||this.n == 5||this.n == 6||this.n == 7||this.n == 8||this.n == 9){
      stroke(255);
    }else{
      noStroke();
    }
    line(this.x - (0.6*u), this.y - (2*u), this.x + (0.6*u), this.y - (2*u));
    //2
    if(this.n == 0||this.n == 4||this.n == 5||this.n == 6||this.n == 8||this.n == 9){
      stroke(255);
    }else{
      noStroke();
    }
    line(this.x - (0.8*u), this.y - (1.6*u), this.x - (0.8*u), this.y - (0.4*u));
    //3
    if(this.n == 0||this.n == 1||this.n == 2||this.n == 3||this.n == 4||this.n == 7||this.n == 8||this.n == 9){
      stroke(255);
    }else{
      noStroke();
    }
    line(this.x + (0.8*u), this.y - (1.6*u), this.x + (0.8*u), this.y - (0.4*u));
    //4
    if(this.n == 2||this.n == 3||this.n == 4||this.n == 5||this.n == 6||this.n == 8||this.n == 9){
      stroke(255);
    }else{
      noStroke();
    }
    line(this.x - (0.6*u), this.y, this.x + (0.6*u), this.y);
    //5
    if(this.n == 0||this.n == 2||this.n == 6||this.n == 8){
      stroke(255);
    }else{
      noStroke();
    }
    line(this.x - (0.8*u), this.y + (0.4*u), this.x - (0.8*u), this.y + (1.6*u));
    //6
    if(this.n == 0||this.n == 1 ||this.n == 3||this.n == 4||this.n == 5||this.n == 6||this.n == 7||this.n == 8||this.n == 9){
      stroke(255);
    }else{
      noStroke();
    }
    line(this.x + (0.8*u), this.y + (0.4*u), this.x + (0.8*u), this.y + (1.6*u));
    //7
    if(this.n == 0||this.n == 2||this.n == 3||this.n == 5||this.n == 6||this.n == 8||this.n == 9){
      stroke(255);
    }else{
      noStroke();
    }
    line(this.x - (0.6*u), this.y + (2*u), this.x + (0.6*u), this.y + (2*u));
  }
  update(n){
    this.n = n;
  }
}
