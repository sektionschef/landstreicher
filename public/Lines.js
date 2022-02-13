class Line {
    constructor(x, y, limit_x = {}, limit_y = {}) {
        logging.debug("Creating lines");
        this.x = x;
        this.y = y;
        this.limit_x = limit_x;
        this.limit_y = limit_y;
        this.history = [];

        this.size = 2;
    }

    show() {

        if (frameCount % 1 == 0 && this.x <= this.limit_x) {
            this.x += 3;
            this.history.push(createVector(this.x, this.y));
            this.y = this.y + (fxrand() * 0.01);
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
    constructor(x_start, y_start, x_stop, padding_x, padding_y, distance_between_lines) {
        this.x_start = x_start;
        this.y_start = y_start;
        this.x_stop = x_stop; // 180
        this.padding_x = padding_x;  // 20
        this.padding_y = padding_y;  // 40
        this.distance_between_lines = distance_between_lines;  // 30

        this.count_lines = (height - 2 * this.padding_y) / this.distance_between_lines;
        this.bodies = [];

        for (let i = 0; i < this.count_lines; i++) {
            this.bodies.push(new Line(
                (this.x_start + this.padding_x),
                (this.x_start + this.padding_y + this.distance_between_lines * i),
                this.x_stop));
        }
    }

    show() {
        for (var line of this.bodies) {
            line.show();
        }
    }
}