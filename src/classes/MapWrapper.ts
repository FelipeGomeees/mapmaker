import { GameMap } from './GameMap'

export class MapWrapper {
    wrapper: HTMLElement;
    map: GameMap;
    isdown: Boolean;

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
                this.applyPaint(e)
            })
            div.addEventListener("mousedown", (e) => {
                this.applyPaint(e)
            })
            x++;
            if (x === 18) {
                y++;
                x = 0;
            }
            this.wrapper.appendChild(div);
        }
    }

    private applyPaint(e: Event) {
        const pencil = sessionStorage.getItem('pencil-value');
        if (pencil && e.target && this.isdown) {
            if (sessionStorage.getItem('pencil-type') === 'color') {
                const selectedId = (e.target as HTMLInputElement).id;
                this.map.paintColor(pencil, Number(selectedId.split("-")[1]), Number(selectedId.split("-")[2]));
            } else {
                const selectedId = (e.target as HTMLInputElement).id;
                this.map.paintTexture(Number(pencil), Number(selectedId.split("-")[1]), Number(selectedId.split("-")[2]));
            }
        }
    }
    
    constructor(wrapper: HTMLElement, map: GameMap) {
        this.map = map;
        this.wrapper = wrapper;
        this.isdown = false;

        this.setup();
    }
}