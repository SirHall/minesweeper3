import * as p5 from "p5";
// import * as p5_glob from "p5/global";
// import * as p5_const from "p5/constants";
// import * as p5_lits from "p5/literals";


// const Honeycomb = require('honeycomb-grid')
// import * as p5 from "../node_modules/p5/lib/p5";
import * as Honeycomb from "../node_modules/honeycomb-grid/src/honeycomb"


const grid = Honeycomb.defineGrid()// 2a. create a rectangular grid:
const rect = grid.rectangle({ width: 16, height: 16 });

const cellSize = 16;

//Simply used to draw a single polygon
function polygon(x, y, radius, npoints, rotation, sketch: p5) {
    let angle = sketch.TWO_PI / npoints;

    sketch.beginShape();
    for (let a = 0; a < sketch.TWO_PI; a += angle) {
        let sx = x + sketch.cos(a + rotation) * radius;
        let sy = y + sketch.sin(a + rotation) * radius;
        sketch.vertex(sx, sy);
    }
    sketch.endShape(sketch.CLOSE);
}

const p5Instance = new p5(
    (sketch: p5) => {
        const x = 100;
        const y = 100;

        sketch.setup = () => {
            sketch.createCanvas(
                200,
                200
            );
        };

        sketch.draw = () => {
            sketch.background(0);
            sketch.fill(255);
            rect.forEach(hex => {
                const point = hex.toPoint();
                sketch.push();
                // sketch.rotate(60);
                // sketch.translate(cellSize * 0.8, cellSize * 0.5);
                polygon(point.x * cellSize, point.y * cellSize, cellSize, 6, sketch.radians(30), sketch);
                sketch.pop();
            });
        };
    }
);