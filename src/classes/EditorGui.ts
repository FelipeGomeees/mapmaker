

import { textureList } from "../utils/lists";
import { GameMap } from "./GameMap";
import { MapWrapper } from "./MapWrapper";

export class EditorGui {
    colorArea: HTMLElement;
    textureArea: HTMLElement;
    colorMap: GameMap
    textureMap: GameMap;
    wrapper: MapWrapper;

    public openColors() {
        this.textureArea.style.display = 'none';
        this.colorArea.style.display = 'flex';
        if (this.textureMap && this.colorMap) {
            this.textureMap.el.style.opacity = '60%';
            this.colorMap.el.style.opacity = '1';
            this.wrapper.map = this.colorMap;
        }
    }
    public openTextures() {
        this.colorArea.style.display = 'none';
        this.textureArea.style.display = 'flex';
        if (this.colorMap && this.textureMap) {
            this.colorMap.el.style.opacity = '60%';
            this.textureMap.el.style.opacity = '1';
            this.wrapper.map = this.textureMap;
        }
    }
    private setup() {
        Object.entries(textureList).forEach((textures) => {
            const div = document.createElement('div');
            div.addEventListener('click', () => {
                sessionStorage.setItem('pencil-type','texture');
                sessionStorage.setItem('pencil-value', textures[0]);
            })
            div.classList.add('tile');
            div.style.backgroundImage = `url(${textures[1]})`;
            div.style.backgroundSize = 'cover';
            div.style.backgroundPosition = 'center';
            div.style.backgroundRepeat = 'no-repeat'; 
            this.textureArea.appendChild(div);
        });

        const color = document.getElementById('input__color');
        if (color) {
            color.addEventListener('change', (e) => {
                const target = (e.target) as HTMLInputElement
                sessionStorage.setItem('pencil-type', 'color');
                sessionStorage.setItem('pencil-value',target.value);
            })
        }

        const colorBtn = document.getElementById('btn__color');
        if (colorBtn) {
            colorBtn.addEventListener('click', (e) => {
                this.openColors();
            })
        }
        const textureBtn = document.getElementById('btn__texture');
        if (textureBtn) {
            textureBtn.addEventListener('click', (e) => {
                this.openTextures();
            })
        }
    }

    constructor(colorArea: HTMLElement, textureArea: HTMLElement, colorMap: GameMap, textureMap: GameMap,wrapper: MapWrapper ) {
        this.textureArea = textureArea;
        this.textureMap =  textureMap;
        this.colorArea = colorArea;
        this.colorMap = colorMap;
        this.wrapper = wrapper;

        this.setup()
    }
}