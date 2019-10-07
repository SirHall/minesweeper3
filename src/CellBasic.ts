import * as Honeycomb from "honeycomb-grid";
import * as p5 from "p5";
import moment = require("moment");

const possibleColors = ["#ff595e", "#625daf", "#ffca3a"];

export interface CellBasic {
    cellType: string;
    size: any;
    orientation: any;
    revealed: boolean;

    grid: Honeycomb.Grid<Honeycomb.Hex<CellBasic>>;
    ourIndex: number;
    ourHex: Honeycomb.Hex<CellBasic>;

    color: string;
    neighbours: number;

    Assign(grid: Honeycomb.Grid<Honeycomb.Hex<CellBasic>>, ourIndex: number, ourHex: Honeycomb.Hex<CellBasic>): void;

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
        neighbours: 0,
        Assign(grid: Honeycomb.Grid<Honeycomb.Hex<CellBasic>>, ourIndex: number, ourHex: Honeycomb.Hex<CellBasic>) {
            this.grid = grid;
            this.ourIndex = ourIndex;
            this.ourHex = ourHex;
            this.lastRender = moment();
            this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
        },

        Reveal() {
            if (this.revealed)
                return;
            this.revealed = true;
            //Find the number of neighbours that are the same color
            this.grid.neighborsOf(this.ourHex).forEach((h) => {
                if (h && (h.color === this.color)) {
                    this.neighbours++;
                    if (h.revealed) {
                        //We have a neighbour that has previously been revealed, and is the same color as us
                        this.grid.forEach(element => {
                            if (!element.revealed)
                                element.revealed = true;
                        });
                        return;
                    }
                }
            });

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
        },
        DrawRevealed(sketch: p5) {
            const point = this.ourHex.toPoint();
            sketch.fill(this.color);
            point.x += this.size.xRadius;
            point.y += this.size.yRadius;
            polygon(point.x, point.y, this.size.xRadius, 6, sketch.radians(30), sketch);

            if (this.neighbours > 0)
                sketch.text(this.neighbours, point.x, point.y);
        }
    };
}