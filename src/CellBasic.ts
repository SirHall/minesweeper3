import * as Honeycomb from "honeycomb-grid";
import * as p5 from "p5";
import moment = require("moment");

export interface CellBasic {
    cellType: string;
    size: any;
    orientation: any;
    revealed: boolean;

    grid: Honeycomb.Grid;
    ourIndex: number;
    ourHex: Honeycomb.Hex<CellBasic>;

    color: string;

    Assign(grid: Honeycomb.Grid, ourIndex: number, ourHex: Honeycomb.Hex<CellBasic>): void;

    Reveal(): void;

    Draw(sketch: p5): void;

    DrawHidden(sketch: p5): void;

    DrawRevealed(sketch: p5): void;
};

//Simply used to draw a single polygon
export function polygon(x: number, y: number, radius: number, npoints: number, rotation: number, sketch: p5) {
    let angle = sketch.TWO_PI / npoints;

    sketch.beginShape();
    for (let a = 0; a < sketch.TWO_PI; a += angle) {
        let sx = x + sketch.cos(a + rotation) * radius;
        let sy = y + sketch.sin(a + rotation) * radius;
        sketch.vertex(sx, sy);
    }
    sketch.endShape(sketch.CLOSE);
}

export function CreateCell(): CellBasic {
    return {
        cellType: "basic",
        size: 16,
        orientation: "pointy",
        revealed: false,
        grid: null,
        ourIndex: -1,
        ourHex: null,
        color: "blue",
        Assign(grid: Honeycomb.Grid, ourIndex: number, ourHex: Honeycomb.Hex<CellBasic>) {
            this.grid = grid;
            this.ourIndex = ourIndex;
            this.ourHex = ourHex;
            this.lastRender = moment();
        },
        Reveal() {
            this.revealed = true;
        },
        Draw(sketch: p5) {
            if (this.revealed)
                this.DrawRevealed(sketch);
            else
                this.DrawHidden(sketch);
        },
        DrawHidden(sketch: p5) {
            let point = this.ourHex.toPoint();
            point.x += this.size.xRadius;
            point.y += this.size.yRadius;
            sketch.fill("black");
            polygon(point.x, point.y, this.size.xRadius, 6, sketch.radians(30), sketch);
            sketch.fill("red");
            sketch.circle(point.x, point.y, 3);
        },
        DrawRevealed(sketch: p5) {
            const point = this.ourHex.toPoint();
            sketch.fill(this.color);
            point.x += this.size.xRadius;
            point.y += this.size.yRadius;
            polygon(point.x, point.y, this.size.xRadius, 6, sketch.radians(30), sketch);
        }
    };
}