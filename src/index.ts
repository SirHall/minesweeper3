import * as p5 from "p5";
import * as Honeycomb from "honeycomb-grid";
import * as CellBasic from "./CellBasic";
import * as CellWater from "./CellWater";

const cellPixSize = 16;
const gridCellsPerSide = 32;
const gridPixSize = gridCellsPerSide * cellPixSize;

//Define the hex cell
const Hex = Honeycomb.extendHex(CellWater.CreateCellWater());

const grid = Honeycomb.defineGrid(Hex)// 2a. create a rectangular grid:
const rect = grid.rectangle({ width: gridCellsPerSide, height: gridCellsPerSide });


const p5Instance = new p5(
    (sketch: p5) => {
        sketch.setup = () => {
            sketch.createCanvas(
                gridPixSize,
                gridPixSize
            );
            document.addEventListener('click', ({ offsetX, offsetY }) => {
                // convert point to hex (coordinates)
                const hexCoordinates = grid.pointToHex(offsetX, offsetY)
                // get the actual hex from the grid
                console.log(rect.get(hexCoordinates))
            })
        };

        sketch.draw = () => {
            sketch.background(0);
            sketch.fill(255);
            sketch.push();
            rect.forEach(hex => {
                hex.Draw();
                // const point = hex.toPoint();
                // polygon(point.x, point.y, this.size, 6, sketch.radians(30), sketch);
            });
            sketch.pop();
        };
    }
);