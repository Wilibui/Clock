let rh;
let rm;
let rs;
let lh;
let lm;
let ls;

let a;
let b;
let start;
let sS;
let sSm;
let sM;

let h;
let m;
let s;
let d;

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
  sS = second(); 
  sM = millis();
  
  a = PI / 30;
  b = PI / 12;
  start = 3 * PI / 2;
  sSm = map(sS, 0, 60, start, start + TWO_PI);
  
  numbers[0] = new Numbers(1.5*u, height/7, u);
  numbers[1] = new Numbers(4*u, height/7, u);
  numbers[2] = new Numbers(7*u, height/7, u);
  numbers[3] = new Numbers(9.5*u, height/7, u);
  numbers[4] = new Numbers(11.5*u, height/7 + u, 0.5*u);
  numbers[5] = new Numbers(13*u, height/7 + u, 0.5*u);  
  numbers[6] = new Numbers(1*u, 6*height/7 + u, 0.5*u);
  numbers[7] = new Numbers(2.5*u, 6*height/7 + u, 0.5*u);
  numbers[8] = new Numbers(4.5*u, 6*height/7 + u, 0.5*u);
  numbers[9] = new Numbers(6*u, 6*height/7 + u, 0.5*u);
}

function draw() {
  background(150, 0, 0);
  
  s = second();
  m = minute() + (s/60);
  h = hour() + (m/60);
  
  digital();
    
  days();
  clock();
}

function days(){
  let date = new Date();
  let D = date.getDay();
  if(D == 1){
    d = "Maandag";
  }else if(D == 2){
    d = "Dinsdag";
  }else if(D == 3){
    d = "Woensdag";
  }else if(D == 4){
    d = "Donderdag";
  }else if(D == 5){
    d = "Vrijdag";
  }else if(D == 6){
    d = "Zaterdag";
  }else if(D == 0){
    d = "Zondag";
  }

  fill(255);
  noStroke();
  textSize(2*u);
  textAlign(LEFT, BOTTOM); 
  text(d, 0.5*u, height-3.5*u);  
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
  angle = map(millis(), sM, sM + 60000, sSm, sSm + TWO_PI);
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
  
  //days
  if(day() < 10){
    numbers[6].update(0);
  }else{
    numbers[6].update(floor(day()/10));
  }
  numbers[7].update(day() - floor(day()/10)*10);
  
  //months
  if(month() < 10){
    numbers[8].update(0);
  }else{
    numbers[8].update(floor(month()/10));
  }
  numbers[9].update(month() - floor(month()/10)*10);
  
  //show numbers
  for(let number of numbers){
    number.show();
  }
  
  //dots
  strokeWeight(u/3);
  stroke(255);
  point(5.5*u, height/7 - 0.8*u);
  point(5.5*u, height/7 + 0.8*u);
  
  //slash
  strokeWeight(u/6);
  stroke(255);
  line(3.7*u, 6*height/7, 3.3*u, 6*height/7 + 2*u);
}

class Numbers{
  constructor(x, y, p){
    this.x = x;
    this.y = y;
    this.n = 8;
    this.u = p;
  }
  
  show(){
    strokeWeight(this.u/3);
    
    //      1
    //     ---
    //  2 |   | 3
    //    | 4 |
    //     ---
    //  5 |   | 6
    //    |   |
    //     ---
    //      7
      
    //1
    this.list = [0, 2, 3, 5, 6, 7, 8, 9];
    check(this.n, this.list);
    line(this.x - (0.6*this.u), this.y - (2*this.u), this.x + (0.6*this.u), this.y - (2*this.u));
    
    //2
    this.list = [0, 4, 5, 6, 8, 9];
    check(this.n, this.list);
    line(this.x - (0.8*this.u), this.y - (1.6*this.u), this.x - (0.8*this.u), this.y - (0.4*this.u));
    
    //3
    this.list = [0, 1, 2, 3, 4, 7, 8, 9];
    check(this.n, this.list);
    line(this.x + (0.8*this.u), this.y - (1.6*this.u), this.x + (0.8*this.u), this.y - (0.4*this.u));
    
    //4
    this.list = [2, 3, 4, 5, 6, 8, 9];
    check(this.n, this.list);
    line(this.x - (0.6*this.u), this.y, this.x + (0.6*this.u), this.y);
    
    //5
    this.list = [0, 2, 6, 8];
    check(this.n, this.list);
    line(this.x - (0.8*this.u), this.y + (0.4*this.u), this.x - (0.8*this.u), this.y + (1.6*this.u));
    
    //6
    this.list = [0, 1, 3, 4, 5, 6, 7, 8, 9];
    check(this.n, this.list);
    line(this.x + (0.8*this.u), this.y + (0.4*this.u), this.x + (0.8*this.u), this.y + (1.6*this.u));
    
    //7
    this.list = [0, 2, 3, 5, 6, 8, 9];
    check(this.n, this.list);
    line(this.x - (0.6*this.u), this.y + (2*this.u), this.x + (0.6*this.u), this.y + (2*this.u));
  }
  update(n){
    this.n = n;
  }
}

function check(n, list){
  if(list.includes(n)){
    stroke(255);  
  }else{
    noStroke(); 
  }  
}
