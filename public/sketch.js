// trace, debug, info, warn, error
// const SWITCH_LOGGING_LEVEL = "warn";
// const SWITCH_LOGGING_LEVEL = "info";
const SWITCH_LOGGING_LEVEL = "debug";

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1080;

let gravity_counter = 0;

let fps = 0;
let default_debugging_text_size = 15;
let debugging_physical_body_count = 0;

// REWORK
let timeScaleTarget = 1;

// matter.js stuff
var Engine = Matter.Engine;
var World = Matter.World;
var Body = Matter.Body;
var Bodies = Matter.Bodies;
var Composite = Matter.Composite;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;
var world;

let SCALING_FACTOR = 1;
let rescaling_width;
let rescaling_height;

let width_points = [0];
let height_points = [0];

let physical_objects = [];

let line_coords = { x: 30, y: 40 };

// how many combinations to provide
let combinations_x = 2
let combinations_y = 3

let left_label
let right_label

logging.info("FXHASH: " + fxhash);

let PAIRING_COUNT;
PAIRING_COUNT = Math.floor(getRandomFromInterval(1, 3));
logging.info("PAIRING_COUNT: " + PAIRING_COUNT)  // how many pairings of boxes.
// PAIRING_COUNT = 2;

let PADDING_X;
let PADDING_Y;
let DISTANCE_BETWEEN_LINES;
let STROKE_SPEED;
let STROKE_DISTORT;
let STROKE_SIZE;
let STROKE_COLOR;

PADDING_X = 20;
PADDING_Y = 20;
DISTANCE_BETWEEN_LINES = 10;
STROKE_SPEED = 1;
STROKE_DISTORT = 0.1;
STROKE_SIZE = 1;
STROKE_COLOR = 0;

let lines;

// // for FEATURE creation
// chosen_palette = getRandomFromList(PALETTE);
// PALETTE = chosen_palette.values;
// PALETTE_NAME = chosen_palette.name;

// const NUMBER_PARTICLES = Math.floor(getRandomFromInterval(40, 130));  // 70

// const EXPLOSION_INTERVAL = getRandomFromInterval(4000, 8000);  // 8000
// const FREEZE_DURATION = getRandomFromInterval(3000, 9000);  // 5000
// const EXPLOSION_TO_FREEZE = getRandomFromInterval(20, 50);  // 30;

// const EXPLOSION_FORCE = getRandomFromInterval(0.1, 1);  // 0.5
// const GRAVITY_SPEED = getRandomFromInterval(0.1, 1); // 0.5


// if (NUMBER_PARTICLES < 70) {
//   NUMBER_PARTICLES_LABEL = "Low"
// } else if (NUMBER_PARTICLES < 100) {
//   NUMBER_PARTICLES_LABEL = "Medium"
// } else {
//   NUMBER_PARTICLES_LABEL = "High"
// }

// if (EXPLOSION_INTERVAL < 5000) {
//   EXPLOSION_INTERVAL_LABEL = "Low"
// } else if (EXPLOSION_INTERVAL < 7000) {
//   EXPLOSION_INTERVAL_LABEL = "Medium"
// } else {
//   EXPLOSION_INTERVAL_LABEL = "High"
// }


// if (EXPLOSION_FORCE < 0.4) {
//   EXPLOSION_FORCE_LABEL = "Low"
// } else if (EXPLOSION_FORCE < 0.7) {
//   EXPLOSION_FORCE_LABEL = "Medium"
// } else {
//   EXPLOSION_FORCE_LABEL = "High"
// }

// if (FREEZE_DURATION < 5000) {
//   FREEZE_DURATION_LABEL = "Low"
// } else if (FREEZE_DURATION < 7000) {
//   FREEZE_DURATION_LABEL = "Medium"
// } else {
//   FREEZE_DURATION_LABEL = "High"
// }

// if (EXPLOSION_TO_FREEZE < 30) {
//   EXPLOSION_TO_FREEZE_LABEL = "Low"
// } else if (EXPLOSION_TO_FREEZE < 40) {
//   EXPLOSION_TO_FREEZE_LABEL = "Medium"
// } else {
//   EXPLOSION_TO_FREEZE_LABEL = "High"
// }


// if (GRAVITY_SPEED < 0.4) {
//   GRAVITY_SPEED_LABEL = "Low"
// } else if (GRAVITY_SPEED < 0.7) {
//   GRAVITY_SPEED_LABEL = "Medium"
// } else {
//   GRAVITY_SPEED_LABEL = "High"
// }

// logging.info("Palette: " + PALETTE_NAME);
// // logging.info("Number of particles: " + NUMBER_PARTICLES);
// logging.info("Number of particles label: " + NUMBER_PARTICLES_LABEL);
// // logging.info("Explosion interval: " + EXPLOSION_INTERVAL);
// logging.info("Explosion interval label: " + EXPLOSION_INTERVAL_LABEL);
// // logging.info("Freeze duration: " + FREEZE_DURATION);
// logging.info("Freeze duration label: " + FREEZE_DURATION_LABEL);
// // logging.info("Explosion to freeze: " + EXPLOSION_TO_FREEZE);
// logging.info("Explosion to freeze label: " + EXPLOSION_TO_FREEZE_LABEL);
// // logging.info("Explosion force: " + EXPLOSION_FORCE);
// logging.info("Explosion force label: " + EXPLOSION_FORCE_LABEL);
// // logging.info("Gravity: " + GRAVITY_SPEED);
// logging.info("Gravity speed label: " + GRAVITY_SPEED_LABEL);



function preload() {
  font = loadFont('SourceSansPro-Regular.otf');

}

function setup() {

  let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL).parent('canvasHolder');

  logging.setLevel(SWITCH_LOGGING_LEVEL);

  engine = Engine.create();
  world = engine.world;

  const VERTICAL_GRAVITY = 1;
  // const VERTICAL_GRAVITY = getRandomFromInterval(0.05, 0.5);

  Matter.Runner.run(engine)
  engine.world.gravity.y = VERTICAL_GRAVITY;


  let points = create_coordinates_for_boxes();
  boxes = new Boxes(points[0], points[1], PAIRING_COUNT);

  // console.log(boxes);

  resize_canvas();
}


function draw() {

  translate(-width / 2, -height / 2, 0);
  background(255);

  boxes.show();
  boxes.show_lines();

  for (var object of physical_objects) {
    push();
    strokeWeight(1);
    fill(255, 0, 0, 50);
    beginShape();
    for (var i = 0; i < object.vertices.length; i++) {
      vertex(object.vertices[i].x, object.vertices[i].y);
    }
    endShape(CLOSE);
    pop();
  }

  Engine.update(engine);
}


function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    console.log("left arrow pressed");

    // for (box of boxes.real_boxes)
    console.log(boxes.real_boxes[0].lines.bodies[0].history);


    horst = Body.create({
      position: { x: 300, y: 300 },
      vertices: boxes.real_boxes[0].lines.bodies[0].history, //, ...options
    });

    // horst = Bodies.circle(300, 300, 10);
    physical_objects.push(horst)

    World.add(world, horst)
  }
}