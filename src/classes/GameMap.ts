import { detailList } from "../utils/lists";
export class GameMap {
    colorMap: string[][]
    detailMap: number[][];
    collisionMap: number[][];
    ctx: CanvasRenderingContext2D | null;

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

    private static defaultColorMap(): string[][] {
        const map: string[][] = [];
        for (let i = 0; i < 20; i++) {
            map.push([]);
            for (let j = 0; j < 20; j++) {
                map[i].push('#222');
            }
        }
        return map;
    }

    public draw() {
        const canvas = document.getElementById("map") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        console.log(this.detailMap.length);
        if (ctx) {
            for (let i = 0; i < this.detailMap.length; i++) {
                for (let j = 0; j < this.detailMap[i].length; j++) {
                    ctx.fillStyle = this.colorMap[i][j];
                    ctx.fillRect(i * 50, j * 50, 50, 50);
                    const img = new Image();
                    img.src = detailList[this.detailMap[i][j]];
                    img.onload = () => {
                        ctx.drawImage(img, i * 50, j * 50, 50, 50);
                    }
                }
            }
        }
    }

    public paintColor(color: string, x: number, y: number) {
        if (this.ctx) {
            this.colorMap[x][y] = color;
            this.ctx .fillStyle = this.colorMap[x][y];
            this.ctx .fillRect(x * 50, y * 50, 50, 50); 
        }
    }

    public paintDetail(detailId: number, x: number, y: number) {
        if (this.ctx) {
            const img = new Image();
            this.detailMap[x][y] = detailId;
            img.src = detailList[detailId];

            img.onload = () => {
                if (this.ctx) {
                    this.ctx.drawImage(img, x * 50, y * 50, 50, 50);
                }
            }
        }
    }

    constructor(colorMap?: string[][], detailMap?: number[][], collisionMap?: number[][]) {
        const canvas = document.getElementById("map") as HTMLCanvasElement;
        this.ctx = canvas.getContext("2d");
        this.colorMap = colorMap || GameMap.defaultColorMap();
        this.detailMap = detailMap || GameMap.defaultMap();
        this.collisionMap = collisionMap || GameMap.defaultMap();     
    }
}   