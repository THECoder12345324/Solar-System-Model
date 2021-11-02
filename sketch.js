let sun;
let cam;
var suntext, img;
var textures = [];
var paused = 1;

function setup() {
  let canvas = createCanvas(1800, 900, WEBGL);

  img = loadImage("starfield.jpg");
  suntext = loadImage("sun.jpg");
  textures[0] = loadImage("earth.jpg");
  textures[1] = loadImage("jupiter.jpg");
  textures[2] = loadImage("mercury.jpg");


  canvas.elt.oncontextmenu = () => false;

  cam = createEasyCam({distance : 500})


  sun = new Planet(50, 0, 0, random(TWO_PI), suntext);
  sun.spawnMoons(6, 2);

  alphacentauri = new Planet(20, 550, 200, random(TWO_PI), suntext);
  alphacentauri.spawnMoons(3, 2);
}
function draw() {
  background(0);
  ambientLight(255, 255, 255);
  pointLight(255, 255, 255, 0, 0, 0);
  //pointLight(255, 255, 255, 550, 200, 0)
  sun.show();
  alphacentauri.show();
  if (paused === 1) {
    sun.orbit();
    //alphacentauri.orbit();
  }
}
function keyPressed() {
  if (keyCode === 32) {
    paused = paused * -1;
  }
}