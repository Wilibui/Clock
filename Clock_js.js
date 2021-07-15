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

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(height / 40);
  noFill(); 
  
  rh = height / (4/3);
  rm = height / (40/33);
  rs = height / (10/9);
  lh = height / 5;
  lm = height / 4;
  ls = height / (10/3);
  
  a = PI / 30;
  b = PI / 12;
  start = 3 * PI / 2;
}

function draw() {
  translate(width / 2, height / 2);
  background(0);
  
  s = second();
  m = minute() + (s / 60);
  h = hour() + (m / 60);
    
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
        
  // hours
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
