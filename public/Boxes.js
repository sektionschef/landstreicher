class Boxes {
    constructor(width_points, height_points, pairing_count) {
        this.width_points = width_points;
        this.height_points = height_points;

        this.columns_count = this.width_points.length - 1;
        this.row_count = this.height_points.length - 1;

        this.virtual_boxes = [];
        this.possible_combinations_x = [];
        this.possible_combinations_y = [];
        this.real_boxes = [];


        this.boxes_count = (this.columns_count) * (this.row_count)

        this.create_virtual_boxes();
        // console.log(this.virtual_boxes);

        this.scout_possible_combinations();
        this.real_boxes = this.virtual_boxes;

        this.pairing_count = pairing_count;
        logging.info("Number of pairings: " + this.pairing_count);
        if (this.pairing_count > 0 && this.possible_combinations_x.length > 0 && this.possible_combinations_y.length > 0) {
            for (var i = 0; i < this.pairing_count; i++) {
                this.choose_combination();
            }
        }
    }

    create_virtual_boxes() {
        this.label_counter = 0;

        for (let v = 0; v < (this.row_count); v++) {
            for (let i = 0; i < (this.columns_count); i++) {
                this.label_counter += 1;

                this.virtual_boxes.push({
                    label: (this.label_counter),
                    a: {
                        x: this.width_points[i],
                        y: this.height_points[v]
                    },
                    b: {
                        x: this.width_points[i + 1],
                        y: this.height_points[v]
                    },
                    c: {
                        x: this.width_points[i + 1],
                        y: this.height_points[v + 1]
                    },
                    d: {
                        x: this.width_points[i],
                        y: this.height_points[v + 1]
                    },
                })
            }
        }
    }

    scout_possible_combinations() {

        // skip boxes at the end of the row
        for (let i = 0; i < this.virtual_boxes.length; i++) {
            if (this.virtual_boxes[i].label % this.columns_count != 0) {
                this.possible_combinations_x.push({
                    left: this.virtual_boxes[i].label,
                    right: this.virtual_boxes[(i + 1)].label
                })
            }
            // skip last row
            // console.log(i + this.row_count + 1);
            // console.log(this.row_count);
            if (this.virtual_boxes[i].label <= (this.virtual_boxes.length - this.columns_count)) {
                this.possible_combinations_y.push({
                    left: this.virtual_boxes[i].label,
                    // right: this.virtual_boxes[(i + this.row_count + 1)].label  // next row
                    right: this.virtual_boxes[(i + this.columns_count)].label  // next row
                })
            }
        }

        logging.debug("possible combinations to choose from - x: ");
        logging.debug(this.possible_combinations_x);
        logging.debug("possible combinations to choose from - y: ");
        logging.debug(this.possible_combinations_y);
    }

    choose_combination() {

        if (fxrand() >= 0.5) {
            this.chosen_axis = "x"
            this.chosen = getRandomFromList(this.possible_combinations_x)
            console.log("chosen on x axis: ");
            console.log(this.chosen);
        } else {
            this.chosen_axis = "y"
            this.chosen = getRandomFromList(this.possible_combinations_y)
            console.log("chosen on y axis: ");
            console.log(this.chosen);
        }

        // get labels
        for (var box of this.virtual_boxes) {
            if (box.label == this.chosen.left) {
                left_label = box.label;
            }
            if (box.label == this.chosen.right) {
                right_label = box.label;
            }
        }

        logging.debug("left label: " + left_label);
        logging.debug("right label: " + right_label);


        this.create_combination(left_label, right_label);

        // remove used combination from both pools
        for (var i = this.possible_combinations_x.length - 1; i >= 0; i--) {

            if (
                this.possible_combinations_x[i].left == this.chosen.left ||
                this.possible_combinations_x[i].left == this.chosen.right ||
                this.possible_combinations_x[i].right == this.chosen.left ||
                this.possible_combinations_x[i].right == this.chosen.right
            ) {
                this.possible_combinations_x.splice(i, 1);
            }
        }
        for (var i = this.possible_combinations_y.length - 1; i >= 0; i--) {
            if (
                this.possible_combinations_y[i].left == this.chosen.left ||
                this.possible_combinations_y[i].left == this.chosen.right ||
                this.possible_combinations_y[i].right == this.chosen.left ||
                this.possible_combinations_y[i].right == this.chosen.right
            ) {
                this.possible_combinations_y.splice(i, 1);
            }
        }


    }

    create_combination(left_label, right_label) {

        let left_temp;
        let right_temp;

        for (let box of this.virtual_boxes) {
            if (box.label == left_label) {
                left_temp = {
                    a: box.a, b: box.b, c: box.c, d: box.d
                }
            } else if (box.label == right_label) {
                right_temp = {
                    a: box.a, b: box.b, c: box.c, d: box.d
                }
            } else {
            }
        }

        // console.log(left_temp);
        // console.log(right_temp);

        if (this.chosen_axis == "x") {
            this.paired_box = {
                label: left_label + "+" + right_label,
                a: {
                    x: left_temp.a.x,
                    y: left_temp.a.y
                },
                b: {
                    x: right_temp.b.x,
                    y: right_temp.b.y
                },
                c: {
                    x: right_temp.c.x,
                    y: right_temp.c.y
                },
                d: {
                    x: left_temp.d.x,
                    y: left_temp.d.y
                },
            };
        } else {
            this.paired_box = {
                label: left_label + "+" + right_label,
                a: {
                    x: left_temp.a.x,
                    y: left_temp.a.y
                },
                b: {
                    x: left_temp.b.x,
                    y: left_temp.b.y
                },
                c: {
                    x: right_temp.c.x,
                    y: right_temp.c.y
                },
                d: {
                    x: right_temp.d.x,
                    y: right_temp.d.y
                },
            };
        }

        logging.debug("adding newly paired box: ");
        logging.debug(this.paired_box);

        this.real_boxes.push(this.paired_box)


        // remove simple boxes from array, so they cannot be chosen again
        for (var i = this.real_boxes.length - 1; i >= 0; i--) {
            if (this.real_boxes[i].label == left_label) {
                this.real_boxes.splice(i, 1);
            }
            if (this.real_boxes[i].label == right_label) {
                this.real_boxes.splice(i, 1);
            }
        }
        // console.log(this.real_boxes);
    }

    show() {
        let center_x;
        let center_y;

        push();
        textFont(font);
        textSize(20 * SCALING_FACTOR);
        rectMode(CORNERS);
        for (let box_real of this.real_boxes) {
            // console.log(box_real.label);
            // fill(random(0, 255));
            fill(133);
            strokeWeight(6);
            stroke(51);
            rect(box_real.a.x, box_real.a.y, box_real.c.x, box_real.c.y);
            fill(0)
            center_x = (box_real.b.x - box_real.a.x) / 2
            center_y = (box_real.d.y - box_real.a.y) / 2
            if (logging.getLevel() <= 1) {
                text(box_real.label, box_real.a.x + center_x, box_real.a.y + center_y);
            }
        }
        pop();
    }
}

