import * as CellBasic from "./CellBasic";
import * as HoneyComb from "honeycomb-grid";
import * as p5 from "p5";

//Simply used to draw a single polygon
export function polygon(x, y, radius, npoints, rotation, sketch: p5) {
    let angle = sketch.TWO_PI / npoints;

    sketch.beginShape();
    for (let a = 0; a < sketch.TWO_PI; a += angle) {
        let sx = x + sketch.cos(a + rotation) * radius;
        let sy = y + sketch.sin(a + rotation) * radius;
        sketch.vertex(sx, sy);
    }
    sketch.endShape(sketch.CLOSE);
}

export function CreateCellWater(): CellBasic.CellBasic {
    return {
        size: 16,
        revealed: false,

        grid: null,
        ourIndex: -1,

        Reveal() { this.revealed = true; },

        Draw() {
            // const point = hex.toPoint();
            // polygon(point.x, point.y, this.size, 6, sketch.radians(30), sketch);
        },

        DrawHidden() { },

        DrawRevealed() { }
    };
}