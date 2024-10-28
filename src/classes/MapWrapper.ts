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
            div.addEventListener("hover", (e) => {
                if (e.target && this.isdown) {
                    const colorInput = document.getElementById("input__color") as HTMLInputElement;
                    const selectedId = (e.target as HTMLInputElement).id;
                    this.map.paintColor(colorInput.value, Number(selectedId.split("-")[1]), Number(selectedId.split("-")[2]));
                }
            })
            x++;
            if (x === 18) {
                y++;
                x = 0;
            }
            this.wrapper.appendChild(div);
        }
    }
    

    constructor(wrapper: HTMLElement, map: GameMap) {
        this.map = map;
        this.wrapper = wrapper;
        this.isdown = false;

        this.setup();
    }
}