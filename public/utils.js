function getRandomFromInterval(min, max) {
    return fxrand() * (max - min) + min;
}

function getRandomFromList(items) {
    return items[Math.floor(fxrand() * items.length)];
}

function distortColor(colorObject, max_diff) {
    if (typeof max_diff == "undefined") {
        max_diff = 10;
    }
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

function create_coordinates_for_boxes(count_of_points_x, count_of_points_y) {

    logging.info(count_of_points_x + " random points on x axis.");
    logging.info(count_of_points_y + " random points on y axis.");

    for (let i = 0; i < count_of_points_x; i++) {
        width_points.push(Math.floor(getRandomFromInterval(0, (width - MINIMIMUM_DISTANCE))));
    }
    for (let i = 0; i < count_of_points_y; i++) {
        height_points.push(Math.floor(getRandomFromInterval(0, (height - MINIMIMUM_DISTANCE))));
    }

    // add width and height
    width_points.push(width);
    height_points.push(height);

    // simple sort
    width_points.sort(function (a, b) {
        return a - b;
    });
    height_points.sort(function (a, b) {
        return a - b;
    });

    for (var i = width_points.length - 1; i >= 0; i--) {
        if ((width_points[(i)] - width_points[i - 1]) < MINIMIMUM_DISTANCE) {
            if (width_points[i] != width) {  // do not remove the width value
                width_points.splice(i, 1);
            }
        }
    }

    for (var i = height_points.length - 1; i >= 0; i--) {
        if ((height_points[(i)] - height_points[i - 1]) < MINIMIMUM_DISTANCE) {
            if (height_points[i] != height) {
                height_points.splice(i, 1);
            }
        }
    }

    logging.debug("Coordinates of points on x axis: " + width_points);
    logging.debug("Coordinates of points on y axis: " + height_points);

    return [width_points, height_points]
}
