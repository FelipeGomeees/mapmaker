import { textureList } from "../utils/lists";
export class GameMap {
    colorMap: string[][]
    textureMap: number[][];
    collisionMap: number[][];
    ctx: CanvasRenderingContext2D | null;
    el: HTMLCanvasElement;

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
        if (this.ctx) {
            for (let i = 0; i < this.textureMap.length; i++) {
                for (let j = 0; j < this.textureMap[i].length; j++) {
                    //
                    // Está RENDERIZANDO COR MESMO COM ARRAY VAZIO
                    //
                    // this.ctx.fillStyle = this.colorMap[i][j];
                    // this.ctx.fillRect(i * 50, j * 50, 50, 50);
                    // const img = new Image();
                    // img.src = textureList[this.textureMap[i][j]];
                    // img.onload = () => {
                    //     if (this.ctx) {
                    //         this.ctx.drawImage(img, i * 50, j * 50, 50, 50);
                    //     } 
                    // }
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

    public paintTexture(detailId: number, x: number, y: number) {
        if (this.ctx) {
            const img = new Image();
            this.textureMap[x][y] = detailId;
            img.src = textureList[detailId];

            img.onload = () => {
                if (this.ctx) {
                    this.ctx.drawImage(img, x * 50, y * 50, 50, 50);
                }
            }
        }
    }

    constructor(canvas: HTMLCanvasElement, colorMap?: string[][], textureMap?: number[][], collisionMap?: number[][]) {
        this.el = canvas;
        this.ctx = canvas.getContext("2d");
        this.colorMap = colorMap || GameMap.defaultColorMap();
        this.textureMap = textureMap || GameMap.defaultMap();
        this.collisionMap = collisionMap || GameMap.defaultMap();     
    }
}   