class Lines {
    constructor(x, y) {
        logging.debug("Creating lines");
        this.x = x;
        this.y = y;
        this.history = [];
    }

    show() {
        if (frameCount % 3 == 0) {
            this.x += 1;
        }
        this.history.push(createVector(this.x, this.y));
        circle(this.x * SCALING_FACTOR, this.y * SCALING_FACTOR, 2);
    }
}