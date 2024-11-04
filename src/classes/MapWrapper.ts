import { GameMap } from './GameMap'

export class MapWrapper {
    wrapper: HTMLElement;
    map: GameMap;
    isdown: Boolean;
    areaPaintStart: Array<number> | null;

    private setup() {
        this.wrapper.addEventListener("mousedown", (e) => {
            e.preventDefault();
            this.isdown = true;
            console.log('is down');
        })
        this.wrapper.addEventListener("mouseup", (e) => {
            this.isdown = false;
            console.log('is up');
        })
        let x = 0;
        let y = 0
        for (let i = 0; i < (18 * 18); i++) {
            const div = document.createElement("div");
            div.id = `tile-${x}-${y}`;
            div.draggable = false;
            div.addEventListener("mouseover", (e) => {
                // REFORMULAR PARA NÃO USAR MAIS DIVS
                //
                // FAZER POR COORDENADAS
                //
                const mode = sessionStorage.getItem('pencil-mode')
                if (mode === 'default') {
                    this.applyPaint(e);
                }
            })
            div.addEventListener("mousedown", (e) => {
                const mode = sessionStorage.getItem('pencil-mode')
                if (mode === 'area') {
                    console.log('Area');
                    this.selectArea(e);
                } else {
                    this.applyPaint(e);
                }
            })
            div.addEventListener("mouseup", (e) => {
                this.releaseArea(e);
            })
            div.addEventListener("click", (e) => {
                this.applyPaint(e, true);
            })
            x++;
            if (x === 18) {
                y++;
                x = 0;
            }
            this.wrapper.appendChild(div);
        }
    }

    private applyPaint(e: Event, click?: Boolean) {
        const pencil = sessionStorage.getItem('pencil-value');
        if ((pencil && e.target) && (this.isdown || click)) {
            if (sessionStorage.getItem('pencil-type') === 'color') {
                const selectedId = (e.target as HTMLInputElement).id;
                this.map.paintColor(pencil, Number(selectedId.split("-")[1]), Number(selectedId.split("-")[2]));
            } else if (sessionStorage.getItem('pencil-type') === 'texture') {
                const selectedId = (e.target as HTMLInputElement).id;
                this.map.paintTexture(Number(pencil), Number(selectedId.split("-")[1]), Number(selectedId.split("-")[2]));
            } else {
                const selectedId = (e.target as HTMLInputElement).id;
                this.map.paintSprite(Number(pencil), Number(selectedId.split("-")[1]), Number(selectedId.split("-")[2]));
            }
        }
    }

    private selectArea(e: Event) {
        if (!this.areaPaintStart) {
            const selectedId = (e.target as HTMLInputElement).id;
            this.areaPaintStart = [Number(selectedId.split("-")[1]), Number(selectedId.split("-")[2])]
        }
    }

    private releaseArea(e: Event) {
        const selectedId = (e.target as HTMLInputElement).id;
        const areaEnd = [Number(selectedId.split("-")[1]), Number(selectedId.split("-")[2])];
        if (this.areaPaintStart) {
            this.paintArea(this.areaPaintStart[0], this.areaPaintStart[1], areaEnd[0], areaEnd[1]);
        }
        this.areaPaintStart = null
    }

    private paintArea(x1: number, y1: number, x2: number, y2: number) {
        const startX = Math.min(x1, x2);
        const endX = Math.max(x1, x2);
        const startY = Math.min(y1, y2);
        const endY = Math.max(y1, y2);
    
        for (let i = startX; i <= endX; i++) {    
            for (let j = startY; j <= endY; j++) {
                const pencilValue = sessionStorage.getItem('pencil-value');
                const pencilType = sessionStorage.getItem('pencil-type');
                if (pencilType === 'color' && pencilValue) {
                    this.map.paintColor(pencilValue, i, j);
                } else if (pencilType === 'texture' && pencilValue) {
                    this.map.paintTexture(Number(pencilValue), i, j);
                } else {
                    this.map.paintSprite(Number(pencilValue), i, j);
                }
            }
        }
    }
    
    constructor(wrapper: HTMLElement, map: GameMap) {
        this.map = map;
        this.wrapper = wrapper;
        this.isdown = false;
        this.areaPaintStart = [];

        this.setup();
    }
}