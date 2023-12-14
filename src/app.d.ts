import * as PIXI from "pixi.js";

declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface Platform {}
    }

    type RoomData = {
        roomName: string;
        tiles: TileProps[];
        rows: number;
        cols: number;
        tileSize: number;
    };

    type TileProps = {
        x: number;
        y: number;
        colour: string;
    };
}

export {};
