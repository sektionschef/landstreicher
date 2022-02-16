// trace, debug, info, warn, error
// const SWITCH_LOGGING_LEVEL = "warn";
// const SWITCH_LOGGING_LEVEL = "info";
const SWITCH_LOGGING_LEVEL = "debug";

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = CANVAS_WIDTH;
let MINIMIMUM_DISTANCE = CANVAS_WIDTH / 20

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


let palettes = [
  // {
  //   name: "mellow melone",
  //   stroke_color: "#484848",
  //   background_color: "#F7AF9D"
  // },
  // {
  //   name: "Lohengrin",
  //   stroke_color: "#4281A4",
  //   background_color: "#48A9A6"
  // },
  // {
  //   name: "horsereddish",
  //   stroke_color: "#f25e44",
  //   background_color: "#D91C32"
  // },
  // {
  //   name: "nurnuri",
  //   stroke_color: "#484848",
  //   background_color: "#f25e44"
  // },
  {
    name: "sunny",
    stroke_color: "#484848",
    background_color: "#ffe173"
  },
]

let chosen_palette = getRandomFromList(palettes);

let COUNT_OF_POINTS_X;
let COUNT_OF_POINTS_Y;
let PAIRING_COUNT;
let PADDING_X;
let PADDING_Y;
let DISTANCE_BETWEEN_LINES;
let STROKE_SPEED;
let STROKE_DISTORT;
let STROKE_SIZE;
let STROKE_COLOR;
let STROKE_RESOLUTION;
let BACKGROUND_COLOR;
let PALETTE_NAME;

// PADDING_X = 20;
// PADDING_Y = 20;
// DISTANCE_BETWEEN_LINES = 10;
// STROKE_SPEED = 1;
// STROKE_DISTORT = 0.1;
// STROKE_SIZE = 1;
// STROKE_COLOR = 0;
// STROKE_RESOLUTION = 5;

// cool, big stripes
// PADDING_X = 10;
// PADDING_Y = 10;
// DISTANCE_BETWEEN_LINES = 25;
// STROKE_SPEED = 3;
// STROKE_DISTORT = 0.3;
// STROKE_SIZE = 3;
// STROKE_COLOR = 0;
// STROKE_RESOLUTION = 1;


COUNT_OF_POINTS_X = Math.floor(getRandomFromInterval(1, 5));  // 1-5
COUNT_OF_POINTS_Y = Math.floor(getRandomFromInterval(1, 5));  // 1-5

PAIRING_COUNT = Math.floor(getRandomFromInterval(1, 3));

// PAIRING_COUNT = 2;

// PADDING_X = getRandomFromInterval(0, 20);
// PADDING_Y = getRandomFromInterval(0, 20);
PADDING_X = 20;
PADDING_Y = 40;
STROKE_SPEED = getRandomFromInterval(1, 3);
STROKE_DISTORT = getRandomFromInterval(0.1, 0.4);
STROKE_SIZE = getRandomFromInterval(1, 5);
DISTANCE_BETWEEN_LINES = getRandomFromInterval(10, 25);
PALETTE_NAME = chosen_palette.name;
// STROKE_COLOR = 0;
STROKE_COLOR = chosen_palette.stroke_color;
STROKE_RESOLUTION = 1;
BACKGROUND_COLOR = chosen_palette.background_color;


logging.info("PAIRING_COUNT: " + PAIRING_COUNT)  // how many pairings of boxes.
logging.info("PADDING_X: " + PADDING_X);
logging.info("PADDING_Y: " + PADDING_Y);
logging.info("DISTANCE_BETWEEN_LINES: " + DISTANCE_BETWEEN_LINES);
logging.info("STROKE_SPEED: " + STROKE_SPEED);
logging.info("STROKE_DISTORT: " + STROKE_DISTORT);
logging.info("STROKE_SIZE: " + STROKE_SIZE);
logging.info("STROKE_COLOR: " + STROKE_COLOR);
logging.info("STROKE_RESOLUTION: " + STROKE_RESOLUTION);
logging.info("BACKGROUND_COLOR: " + BACKGROUND_COLOR);
logging.info("PALETTE_NAME: " + PALETTE_NAME);

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


  let points = create_coordinates_for_boxes(COUNT_OF_POINTS_X, COUNT_OF_POINTS_Y);
  boxes = new Boxes(points[0], points[1], PAIRING_COUNT);

  // let points2 = create_coordinates_for_boxes(COUNT_OF_POINTS_X, COUNT_OF_POINTS_Y);
  // boxes2 = new Boxes(points2[0], points2[1], PAIRING_COUNT);

  // console.log(boxes);

  resize_canvas();
}


function draw() {

  translate(-width / 2, -height / 2, 0);
  background(BACKGROUND_COLOR);

  boxes.show();
  boxes.show_lines();
  boxes.check_boxes_complete();

  if (boxes.boxes_completely_run == true) {
    logging.info("Fully rendered, stop the loop, brother!");
    noLoop();
  }

  // boxes2.show();
  // boxes2.show_lines();
  // boxes2.check_boxes_complete();
  // END LOOP after second

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

    for (var line of boxes.real_boxes[0].lines.bodies) {

      new_object = Body.create({
        // position: { x: boxes.real_boxes[0].lines.bodies[0].history[0].x, y: boxes.real_boxes[0].lines.bodies[0].history[0].y },
        position: { x: line.history[0].x, y: line.history[0].y },
        vertices: line.history, //, ...options
      });
      physical_objects.push(new_object)
      World.add(world, new_object);
    }


  }
}