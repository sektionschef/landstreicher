class Boxes {
    constructor(width_points, height_points) {
        this.width_points = width_points;
        this.height_points = height_points;

        this.columns_count = this.width_points.length - 1;
        this.row_count = this.height_points.length - 1;

        this.virtual_boxes = [];
        this.possible_combinations_x = [];
        this.possible_combinations_y = [];
        this.real_boxes = [];

        // save in rects
        this.boxes_count = (this.columns_count) * (this.row_count)
        // console.log(rects_count)

        this.create_virtual_boxes();
        // console.log(this.virtual_boxes);
        this.scout_possible_combinations();

        this.choose_combination();
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

        // console.log(this.possible_combinations_x);
        // console.log(this.possible_combinations_y);
    }

    choose_combination() {
        let chosen_x;
        chosen_x = getRandomFromList(this.possible_combinations_x)
        // console.log(chosen_x);

        left_label = this.virtual_boxes[(chosen_x.left - 1)].label
        right_label = this.virtual_boxes[(chosen_x.right - 1)].label
        // console.log(left_label);
        // console.log(right_label);


        this.create_combination(left_label, right_label);
    }

    create_combination(left_label, right_label) {

        let left_temp;
        let right_temp;

        // TODO remove boxes already chosen - in a separate list

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
                this.real_boxes.push(box)  // move to the final array 
            }
        }

        // console.log(left_temp);
        // console.log(right_temp);

        this.real_boxes.push({
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
        })

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

