// trace, debug, info, warn, error
// const SWITCH_LOGGING_LEVEL = "warn";
const SWITCH_LOGGING_LEVEL = "info";
// const SWITCH_LOGGING_LEVEL = "debug";

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

let rects = [];
let width_points = [];
let height_points = [];

let possible_combinations_x = [];
let possible_combinations_y = [];

let label_counter = 0;

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

}

function setup() {

  let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL).parent('canvasHolder');

  logging.setLevel(SWITCH_LOGGING_LEVEL);

  // engine = Engine.create();
  // world = engine.world;

  const VERTICAL_GRAVITY = 1;
  // const VERTICAL_GRAVITY = getRandomFromInterval(0.05, 0.5);

  // Matter.Runner.run(engine)
  // engine.world.gravity.y = VERTICAL_GRAVITY;

  // resize_canvas();


  // add the min and max 
  width_points = [0, 100, 200, 250, width]
  height_points = [0, 80, 180, height]

  let columns_count = width_points.length - 1;
  let row_count = height_points.length - 1;

  let rects_count = (columns_count) * (row_count)
  // save in rects
  // console.log(rects_count)

  for (let v = 0; v < (row_count); v++) {
    for (let i = 0; i < (columns_count); i++) {
      label_counter += 1;

      rects.push({
        label: (label_counter),
        a: {
          x: width_points[i],
          y: height_points[v]
        },
        b: {
          x: width_points[i + 1],
          y: height_points[v]
        },
        c: {
          x: width_points[i + 1],
          y: height_points[v + 1]
        },
        d: {
          x: width_points[i],
          y: height_points[v + 1]
        },
      })
    }
  }

  // console.log(rects);

  // find out possible combinations
  for (let i = 0; i < rects.length; i++) {
    if (rects[i].label % columns_count != 0) {
      possible_combinations_x.push({
        left: rects[i].label,
        right: rects[(i + 1)].label
      })
    }
    // skip last row
    if (rects[i].label <= (rects.length - columns_count)) {
      possible_combinations_y.push({
        left: rects[i].label,
        right: rects[(i + row_count + 1)].label  // next row
      })
    }
  }



  console.log(possible_combinations_x);
  console.log(possible_combinations_y);

}


function draw() {

  translate(-width / 2, -height / 2, 0);
  background(255);

  if (logging.getLevel() <= 1) {
  }

  push();
  rectMode(CORNERS);
  for (let rectangle of rects) {
    // fill(random(0, 255));
    rect(rectangle.a.x, rectangle.a.y, rectangle.c.x, rectangle.c.y);
  }
  pop();

  // Engine.update(engine);
}
