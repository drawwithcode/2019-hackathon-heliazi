var mySong;
var earth;
var tg1logo;
var fft;

function preload(){
  mySong = loadSound("assets/TG1_bumper.mp3");
  background = loadImage("assets/earth.jpg");
  tg1logo = loadImage("assets/tg1-png-3.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  angleMode(DEGREES);
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
  fft = new p5.FFT();
}

function mousePressed() {
  if ( mySong.isPlaying() ) {
    mySong.pause();
  } else {
    mySong.play();
  }
}

function draw() {
  var volume = 0;
  var spectrum = fft.analyze();

  if ( mySong.isPlaying()) {
    imageMode(CENTER);
    image(background, width/2, height/2, width, 1080);
  } else {
    push();
    imageMode(CENTER);
    pop();
  }

  for (var i = 0; i< spectrum.length-200; i+=10){
    //lines of the pattern
    var h = map(spectrum[i], 30, 255, 0, 70);
    if(h<0){
     //values
     h=0;
   }


    //pattern
    var x = map(i, 0, spectrum.length-200, 180, 0);
      stroke('white');
      strokeWeight(2);
      push();
      translate(width/2,height/2);
      rotate(x+45);
      //half
      line(cos(x)+100, sin(x)+100, cos(x)+100+h, sin(x)+100+h);
    pop();

    var x = map(i, spectrum.length-200, 0, 360, 180);
    push();
      translate(width/2,height/2);
      rotate(x+45);
      //other half

      line(cos(x)+100, sin(x)+100, cos(x)+100+h, sin(x)+100+h);
    pop();

  }
//tg1 logo that changes size depending on the volume
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, height)
  imageMode(CENTER);
}
