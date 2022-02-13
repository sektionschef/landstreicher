class Line {
    constructor(x, y, limit_x, limit_y) {
        logging.debug("Creating lines");
        this.x = x;
        this.y = y;
        this.limit_x = limit_x;
        this.limit_y = limit_y;
        this.history = [];

        this.size = 2;
    }

    show() {

        if (this.x <= this.limit_x) {
            this.x += STROKE_SPEED;
            this.history.push(createVector(this.x, this.y));
            this.y = this.y + getRandomFromInterval(-1 * STROKE_DISTORT, STROKE_DISTORT);
        }

        push();
        strokeWeight(2);
        stroke(0);
        noFill();
        beginShape();
        for (let i = 0; i < this.history.length; i++) {
            vertex(this.history[i].x * SCALING_FACTOR, this.history[i].y * SCALING_FACTOR);
        }
        endShape();
        pop();

        circle(this.x * SCALING_FACTOR, this.y * SCALING_FACTOR, this.size);
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

        this.count_lines = ((this.y_stop - this.y_start) - 2 * this.padding_y) / this.distance_between_lines;
        this.bodies = [];

        // console.log(this.x_start + this.padding_x);

        for (let i = 0; i < this.count_lines; i++) {
            this.bodies.push(new Line(
                (this.x_start + this.padding_x),
                (this.y_start + this.padding_y + this.distance_between_lines * i),
                (this.x_stop - this.padding_x),
                this.y_stop));
        }
    }

    show() {
        for (var line of this.bodies) {
            line.show();
        }
    }
}