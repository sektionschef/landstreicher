class Line {
    constructor(orientation, x, y, limit_x, limit_y) {
        this.orientation = orientation;
        this.x = x;
        this.y = y;
        this.limit_x = limit_x;
        this.limit_y = limit_y;
        this.history = [];
    }

    show() {

        if (this.orientation == "x") {
            if (this.x <= this.limit_x) {
                this.x += STROKE_SPEED;
                this.y = this.y + getRandomFromInterval(-1 * STROKE_DISTORT, STROKE_DISTORT);
            }
        } else if (this.orientation == "y") {
            if (this.y <= this.limit_y) {
                this.y += STROKE_SPEED;
                this.x = this.x + getRandomFromInterval(-1 * STROKE_DISTORT, STROKE_DISTORT);
            }
        } else if (this.orientation == "xy") {
            if (this.x <= this.limit_x && this.y <= this.limit_y) {
                this.x += STROKE_SPEED;
                this.y += STROKE_SPEED;
                this.x = this.x + getRandomFromInterval(-1 * STROKE_DISTORT, STROKE_DISTORT);
                this.y = this.y + getRandomFromInterval(-1 * STROKE_DISTORT, STROKE_DISTORT);
            }
        }

        // PUT TO END
        if (frameCount % 10 == 0) {
            // if (this.x - this.history[(this.history.length - 1)].x != 0) {
            this.history.push(createVector(this.x, this.y));
            // }
        }

        push();
        strokeWeight(STROKE_SIZE);
        stroke(STROKE_COLOR);
        noFill();
        beginShape();
        for (let i = 0; i < this.history.length; i++) {
            vertex(this.history[i].x * SCALING_FACTOR, this.history[i].y * SCALING_FACTOR);
        }
        endShape();
        pop();

        // brush
        push();
        noStroke();
        fill(STROKE_COLOR);
        circle(this.x * SCALING_FACTOR, this.y * SCALING_FACTOR, STROKE_SIZE);
        pop()

    }
}

class Lines {
    constructor(x_start, y_start, x_stop, y_stop, padding_x, padding_y, distance_between_lines) {
        this.x_start = x_start;
        this.y_start = y_start;
        this.x_stop = x_stop;
        this.y_stop = y_stop;
        this.padding_x = padding_x;
        this.padding_y = padding_y;
        this.distance_between_lines = distance_between_lines;

        this.bodies = [];

        let chosen_axis = getRandomFromList(["x", "y", "xy"])
        logging.debug(chosen_axis + " axis randomly chosen.");

        if (chosen_axis == "x") {
            this.count_lines = ((this.y_stop - this.y_start) - 2 * this.padding_y) / this.distance_between_lines;

            for (let i = 0; i < this.count_lines; i++) {
                this.bodies.push(new Line(
                    chosen_axis,
                    (this.x_start + this.padding_x),
                    (this.y_start + this.padding_y + this.distance_between_lines * i),
                    (this.x_stop - this.padding_x),
                    this.y_stop));
            }
        } else if (chosen_axis == "y") {
            this.count_lines = ((this.x_stop - this.x_start) - 2 * this.padding_x) / this.distance_between_lines;

            for (let i = 0; i < this.count_lines; i++) {
                this.bodies.push(new Line(
                    chosen_axis,
                    (this.x_start + this.padding_x + this.distance_between_lines * i),
                    (this.y_start + this.padding_y),
                    this.x_stop,
                    (this.y_stop - this.padding_x)));
            }
        } else if (chosen_axis == "xy") {
            this.count_lines = ((this.x_stop - this.x_start) - 2 * this.padding_x) / this.distance_between_lines;

            for (let i = 0; i < this.count_lines; i++) {
                this.bodies.push(new Line(
                    chosen_axis,
                    (this.x_start + this.padding_x + this.distance_between_lines * i),
                    (this.y_start + this.padding_y),
                    this.x_stop - this.padding_x,
                    (this.y_stop - this.padding_x)));
            }
            this.count_lines = ((this.y_stop - this.y_start) - 2 * this.padding_y) / this.distance_between_lines;
            // skip first one
            for (let i = 1; i < this.count_lines; i++) {
                this.bodies.push(new Line(
                    chosen_axis,
                    (this.x_start + this.padding_x),
                    (this.y_start + this.padding_y + this.distance_between_lines * i),
                    this.x_stop - this.padding_x,
                    (this.y_stop - this.padding_x)));
            }
        }
    }

    show() {
        for (var line of this.bodies) {
            line.show();
        }
    }
}