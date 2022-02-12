function getRandomFromInterval(min, max) {
    return fxrand() * (max - min) + min;
}

function getRandomFromList(items) {
    return items[Math.floor(fxrand() * items.length)];
}

function distortColor(colorObject) {
    let max_diff = 10;
    let red = (colorObject.levels[0] + getRandomFromInterval(-max_diff, max_diff));
    let green = (colorObject.levels[1] + getRandomFromInterval(-max_diff, max_diff));
    let blue = (colorObject.levels[2] + getRandomFromInterval(-max_diff, max_diff));

    // not larger than 255 and not smaller than 0
    red = Math.min(Math.max(parseInt(red), 0), 255);
    green = Math.min(Math.max(parseInt(green), 0), 255);
    blue = Math.min(Math.max(parseInt(blue), 0), 255);

    return color(red, green, blue);
}

// each time window.innerWidth changes
function windowResized() {
    logging.debug("Window is resized.");
    resize_canvas();
}

// calculate the scaling params - choose the limiting factor either height or width
function resize_canvas() {
    rescaling_width = windowWidth / CANVAS_WIDTH
    rescaling_height = windowHeight / CANVAS_HEIGHT

    if (rescaling_width < rescaling_height) {
        logging.debug("Width is smaller than height. Width dominates")
        SCALING_FACTOR = rescaling_width
    } else {
        logging.debug("width is larger than height. Height dominates.")
        SCALING_FACTOR = rescaling_height
    }

    // Override for full scale
    // SCALING_FACTOR = 1;

    // particles_physical.kill_all();

    // reboot - since scaling in physical world is only possible relative to the preceding body.
    // impediment_strokes.kill_all();
    // impediment_strokes.create_all();
    // impediment_strokes.rescale();

    // impediment_walls.kill_all();
    // impediment_walls.create_all();
    // impediment_walls.rescale();

    // origins.kill_all();
    // origins.create_all();

    resizeCanvas(CANVAS_WIDTH * SCALING_FACTOR, CANVAS_HEIGHT * SCALING_FACTOR);
}