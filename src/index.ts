import * as p5 from "p5";
import * as Honeycomb from "honeycomb-grid";
import * as CellBasic from "./CellBasic";
import moment = require("moment");

const cellPixSize = 16;
const gridCellsPerSide = 20;

//Define the hex cell
const Hex = Honeycomb.extendHex(CellBasic.CreateCell());

const grid = Honeycomb.defineGrid(Hex)// 2a. create a rectangular grid:
const rect = grid.rectangle({ width: gridCellsPerSide, height: gridCellsPerSide });


let gridPixWidth = rect[rect.length - 1].toPoint().x + (cellPixSize * 2);
let gridPixHeight = rect[rect.length - 1].toPoint().y + (cellPixSize * 2);


//Setup each cell
rect.forEach((hex, index) => {
    hex.Assign(rect, index, hex);
});


let lastRender: moment.Moment;
lastRender = moment();
let forceRedraw: boolean = true;

const p5Instance = new p5(
    (sketch: p5) => {
        sketch.setup = () => {
            sketch.createCanvas(
                gridPixWidth,
                gridPixHeight
            );
            sketch.mousePressed =
                function () {
                    forceRedraw = true;
                    // convert point to hex (coordinates)
                    let hexCoordinates = grid.pointToHex(sketch.mouseX, sketch.mouseY)
                    // get the actual hex from the grid
                    let clicked = rect.get(hexCoordinates);
                    //Reveal this tile
                    if (clicked)
                        clicked.Reveal();
                };
        };

        sketch.draw = () => {
            let now = moment();
            if ((moment.duration(now.diff(lastRender)) > moment.duration(1000, 'ms')) || forceRedraw) {
                forceRedraw = false;
                lastRender = moment();

                sketch.fill("black");
                sketch.stroke("white");
                sketch.strokeWeight(2);
                sketch.push();
                rect.forEach(hex => {
                    hex.Draw(sketch);
                });
                sketch.pop();
            }

        };
    }
);