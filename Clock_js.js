let numbers = [];

let u;
let l;

let desc;
let temp;
let pm;

function preload() {
  let url = "https://api.openweathermap.org/data/2.5/weather?q=Leuven&appid=201fecd1717242e4163b575f13bf6cf9&units=metric";
  loadJSON(url, getData);
}

function setup() {
  createCanvas(windowWidth, windowHeight);  
  noFill(); 
  u = height/15;
  l = height/10;
  
  //time
  numbers[0] = new Numbers(-4.0*l, 0, l);
  numbers[1] = new Numbers(-1.5*l, 0, l);
  numbers[2] = new Numbers(1.50*l, 0, l);
  numbers[3] = new Numbers(4.00*l, 0, l);
  //date
  numbers[4] = new Numbers(0.75*u, height - 2*u, 0.5*u);
  numbers[5] = new Numbers(2.00*u, height - 2*u, 0.5*u);
  numbers[6] = new Numbers(4.00*u, height - 2*u, 0.5*u);
  numbers[7] = new Numbers(5.25*u, height - 2*u, 0.5*u);
  //temp
  numbers[8] = new Numbers(width - 3.75*u, height - 2*u, 0.5*u);
  numbers[9] = new Numbers(width - 5*u, height - 2*u, 0.5*u);
}


function draw() {
  background(127, 0, 0);
  
  days();
  weather();
  digitalDay();
  
  //date
  for(i = 4; i <= 7; i++){
    numbers[i].show();
  }
  
  translate(width/2, height/2);
  digitalTime(); 
  for(i = 0; i <= 3; i++){
    numbers[i].show();
  } 
}

function weather(){
  if(pm != minute()){
    preload();
  }
  pm = minute();
  
  let absTemp = abs(temp);  
  let temp1 = floor(absTemp/10);
  let temp2 = absTemp - temp1*10;

  numbers[8].update(temp2);
  numbers[9].update(temp1);
  if(absTemp >= 10){
    numbers[9].show();
  }
  numbers[8].show();
  
  textSize(2.50*u);
  textAlign(RIGHT, CENTER);
  if(temp < 0){
    stroke(255);
    strokeWeight(u/6);
    if(absTemp < 10){
      line(width - 4.50*u, height - 2*u, width - 5*u, height - 2*u);
    }else{
      line(width - 5.75*u, height - 2*u, width - 6.25*u, height - 2*u);
    }
  }
  
  fill(255);
  noStroke();
  text("°",width - 2.00*u, height - 2*u, 0.5*u);
  image(desc, width - 3*u, height - 3*u, 3*u, 3*u);
}

function digitalDay(){
  //days
  if(day() < 10){
    numbers[4].update(0);
  }else{
    numbers[4].update(floor(day()/10));
  }
  numbers[5].update(day() - floor(day()/10)*10);
  
  //months
  if(month() < 10){
    numbers[6].update(0);
  }else{
    numbers[6].update(floor(month()/10));
  }
  numbers[7].update(month() - floor(month()/10)*10);
  
  //slash
  strokeWeight(u/6);
  stroke(255);
  line(3.1*u, height-3*u, 2.9*u, height-1*u);
}

function digitalTime(){
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
  
  //dots
  strokeWeight(l/3);
  stroke(255);
  point(0, -0.8*l);
  point(0, 0.80*l); 
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
  textSize(1.5*u);
  textAlign(LEFT, TOP); 
  text(d, 0.5*u, 0.5*u);  
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

function getData(data) {
  desc = loadImage("https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
  temp = round(data.main.temp);
}
