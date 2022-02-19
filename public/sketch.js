// trace, debug, info, warn, error
// const SWITCH_LOGGING_LEVEL = "warn";
const SWITCH_LOGGING_LEVEL = "info";
// const SWITCH_LOGGING_LEVEL = "debug";

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = CANVAS_WIDTH;
let MINIMIMUM_DISTANCE = CANVAS_WIDTH / 20

let SCALING_FACTOR = 1;
let rescaling_width;
let rescaling_height;

let width_points = [0];
let height_points = [0];

let line_canvas;

let lines;


let PALETTES = [
  {
    name: "Mellow Melone",
    stroke_color: "#484848",
    background_color: "#F7AF9D"
  },
  {
    name: "Lohengrin",
    stroke_color: "#58b0e0",
    background_color: "#358f8c"
  },
  {
    name: "Horseradish",
    stroke_color: "#f25e44",
    background_color: "#D91C32"
  },
  {
    name: "Nur-nuri",
    stroke_color: "#D5D5D5",
    background_color: "#f25e44"
  },
  {
    name: "Sunny from the Swiss mountains",
    stroke_color: "#666666",
    background_color: "#ffe173"
  },
  {
    name: "Würstelprater",
    stroke_color: "#73A3BF",
    background_color: "#A97A60"
  },
  {
    name: "Majestix",
    stroke_color: "#938FB8",
    background_color: "#5A4EE4"
  },
  {
    name: "Funky Funkelstein",
    stroke_color: "#9070B5",
    background_color: "#B1ABB8"
  },
  {
    name: "Beef Burger",
    stroke_color: "#376F7D",
    background_color: "#7A2E1B"
  },
  {
    name: "Helgoland",
    stroke_color: "#376F7D",
    background_color: "#E1E1E1"
  },
  {
    name: "Flasche",
    stroke_color: "#FF896B",
    background_color: "#D5D5D5"
  },
  {
    name: "Lachsforelle",
    stroke_color: "#FF896B",
    background_color: "#ECECEC"
  },

]

let CHOSEN_PALETTE = getRandomFromList(PALETTES);

let SECOND_RUN;
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
// let STROKE_RESOLUTION;
let BACKGROUND_COLOR;
let PALETTE_NAME;
let BACKGROUND_NOISE;
let STROKE_NOISE;
let GRID;

let STROKE_DISTORT_LABEL;
let STROKE_SIZE_LABEL;
let BACKGROUND_NOISE_LABEL;

SECOND_RUN = true;


COUNT_OF_POINTS_X = Math.floor(getRandomFromInterval(1, 5));  // 1-5
COUNT_OF_POINTS_Y = Math.floor(getRandomFromInterval(1, 5));  // 1-5
GRID = COUNT_OF_POINTS_X + "x" + COUNT_OF_POINTS_Y;

PAIRING_COUNT = Math.floor(getRandomFromInterval(1, 4));

// PADDING_X = getRandomFromInterval(0, 20);
// PADDING_Y = getRandomFromInterval(0, 20);
PADDING_X = 0;
PADDING_Y = 0;

// STROKE_SPEED = getRandomFromInterval(1, 3);
// STROKE_SPEED = 5;
STROKE_DISTORT = getRandomFromInterval(0.1, 0.4);
STROKE_SIZE = getRandomFromInterval(2, 5);
// DISTANCE_BETWEEN_LINES = getRandomFromInterval(10, 25);  // moved to setup
PALETTE_NAME = CHOSEN_PALETTE.name;
STROKE_COLOR = CHOSEN_PALETTE.stroke_color;
STROKE_NOISE = getRandomFromInterval(5, 30);
// STROKE_RESOLUTION = 1;
BACKGROUND_COLOR = CHOSEN_PALETTE.background_color;
BACKGROUND_NOISE = getRandomFromInterval(5, 20);

logging.info("FXHASH: " + fxhash);

logging.info("PADDING_X: " + PADDING_X);
logging.info("PADDING_Y: " + PADDING_Y);
logging.info("Grid: " + GRID);
logging.info("PAIRING_COUNT: " + PAIRING_COUNT)  // how many pairings of boxes.
logging.info("DISTANCE_BETWEEN_LINES: " + DISTANCE_BETWEEN_LINES);
logging.info("STROKE_SPEED: " + STROKE_SPEED);
logging.info("STROKE_DISTORT: " + STROKE_DISTORT);
logging.info("STROKE_SIZE: " + STROKE_SIZE);
logging.info("STROKE_COLOR: " + STROKE_COLOR);
logging.info("STROKE_NOISE: " + STROKE_NOISE);
// logging.info("STROKE_RESOLUTION: " + STROKE_RESOLUTION);
logging.info("BACKGROUND_COLOR: " + BACKGROUND_COLOR);
logging.info("PALETTE_NAME: " + PALETTE_NAME);



if (STROKE_DISTORT < 0.1) {
  STROKE_DISTORT_LABEL = "Surgeon"
} else if (STROKE_DISTORT < 0.3) {
  STROKE_DISTORT_LABEL = "Average"
} else {
  STROKE_DISTORT_LABEL = "Drunk"
}

if (STROKE_SIZE < 3) {
  STROKE_SIZE_LABEL = "Small"
} else if (STROKE_SIZE < 4) {
  STROKE_SIZE_LABEL = "Medium"
} else {
  STROKE_SIZE_LABEL = "Large"
}

if (BACKGROUND_NOISE < 10) {
  BACKGROUND_NOISE_LABEL = "Easy"
} else if (BACKGROUND_NOISE < 15) {
  BACKGROUND_NOISE_LABEL = "Peasy"
} else {
  BACKGROUND_NOISE_LABEL = "Cheesy"
}

function preload() {
  font = loadFont('SourceSansPro-Regular.otf');
}

function setup() {
  logging.setLevel(SWITCH_LOGGING_LEVEL);

  let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL).parent('canvasHolder');

  DISTANCE_BETWEEN_LINES = map(STROKE_SIZE, 1, 5, 10, 25, true);

  let points = create_coordinates_for_boxes(COUNT_OF_POINTS_X, COUNT_OF_POINTS_Y);
  boxes = new Boxes(points[0], points[1], PAIRING_COUNT);

  if (SECOND_RUN == true) {
    let points2 = create_coordinates_for_boxes(COUNT_OF_POINTS_X, COUNT_OF_POINTS_Y);
    boxes2 = new Boxes(points2[0], points2[1], PAIRING_COUNT);
  }

  background_buffer = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);
  background_buffer.loadPixels()
  for (let x = 0; x < background_buffer.width; x++) {
    for (let y = 0; y < background_buffer.height; y++) {
      background_buffer.set(x, y, distortColor(color(BACKGROUND_COLOR), BACKGROUND_NOISE));
    }
  }
  background_buffer.updatePixels()

  // background_buffer.strokeWeight(3);
  // background_buffer.stroke(10);
  // background_buffer.point(getRandomFromInterval(0, width), getRandomFromInterval(0, height));

  // const ammount = 3000;
  // for (let i = 0; i < ammount; i++) {
  //   let x = getRandomFromInterval(0, background_buffer.width);
  //   let y = getRandomFromInterval(0, background_buffer.height);
  //   background_buffer.strokeWeight(getRandomFromInterval(1, 3));
  //   background_buffer.stroke(getRandomFromInterval(150, 250));
  //   background_buffer.point(x, y);
  // }

  // layer without background for seeing traces
  line_canvas = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);
  line_canvas.clear();

  resize_canvas();
}


function draw() {

  translate(-width / 2, -height / 2, 0);
  // background(BACKGROUND_COLOR);
  image(background_buffer, 0, 0, background_buffer.width * SCALING_FACTOR, background_buffer.height * SCALING_FACTOR);
  image(line_canvas, 0, 0, CANVAS_WIDTH * SCALING_FACTOR, CANVAS_HEIGHT * SCALING_FACTOR);

  boxes.show();
  boxes.show_lines();
  boxes.check_boxes_complete();

  if (SECOND_RUN == true) {
    boxes2.show();
    boxes2.show_lines();
    boxes2.check_boxes_complete();
  }


  if (SECOND_RUN == true) {
    if (boxes.boxes_completely_run == true && boxes2.boxes_completely_run == true) {
      logging.info("Fully rendered, stop the loop, brother!");
      noLoop();
      fxpreview();
    }
  } else {
    if (boxes.boxes_completely_run == true) {
      logging.info("Fully rendered, stop the loop, brother!");
      noLoop();
      fxpreview();
    }
  }

}

