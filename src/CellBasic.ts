import * as Honeycomb from "honeycomb-grid";
import * as p5 from "p5";

export interface CellBasic {
    cellType: string;
    size: number;
    revealed: boolean;

    grid: Honeycomb.Grid;
    ourIndex: number;

    Reveal(): void;

    Draw(): void;

    DrawHidden(): void;

    DrawRevealed(): void;
};