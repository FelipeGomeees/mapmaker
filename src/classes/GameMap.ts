import { colorList, tileList } from "../utils/lists";
export class GameMap {
    colorMap: number[][]
    tileMap: number[][];
    collisionMap: number[][];

    private static defaultMap(): number[][] {
        const map: number[][] = [];
        for (let i = 0; i < 20; i++) {
            map.push([]);
            for (let j = 0; j < 20; j++) {
                map[i].push(0);
            }
        }
        return map;
    }

    public draw() {
        const canvas = document.getElementById("map") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        console.log(this.tileMap.length);
        if (ctx) {
            for (let i = 0; i < this.tileMap.length; i++) {
                for (let j = 0; j < this.tileMap[i].length; j++) {
                    ctx.fillStyle = colorList[this.colorMap[i][j]];
                    ctx.fillRect(i * 50, j * 50, 50, 50);
                    const img = new Image();
                    img.src = tileList[this.tileMap[i][j]];
                    img.onload = () => {
                        ctx.drawImage(img, i * 50, j * 50, 50, 50);
                    }
                }
            }
        }
    }

    constructor(colorMap?: number[][], tileMap?: number[][], collisionMap?: number[][]) {
        this.colorMap = colorMap || GameMap.defaultMap();
        this.tileMap = tileMap || GameMap.defaultMap();
        this.collisionMap = collisionMap || GameMap.defaultMap();     
    }
}