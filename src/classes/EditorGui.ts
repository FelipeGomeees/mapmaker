

import { spriteList, textureList } from "../utils/lists";
import { GameMap } from "./GameMap";
import { MapWrapper } from "./MapWrapper";

export class EditorGui {
    colorArea: HTMLElement;
    textureArea: HTMLElement;
    spriteArea: HTMLElement;
    colorMap: GameMap
    textureMap: GameMap;
    spriteMap: GameMap;
    wrapper: MapWrapper;

    public openColors() {
        this.textureArea.style.display = 'none';
        this.spriteArea.style.display = 'none';
        this.colorArea.style.display = 'flex';
        if (this.textureMap && this.colorMap && this.spriteMap) {
            this.textureMap.el.style.opacity = '60%';
            this.colorMap.el.style.opacity = '1';
            this.spriteMap.el.style.opacity = '60%';
            this.wrapper.map = this.colorMap;
        }
    }
    public openTextures() {
        this.colorArea.style.display = 'none';
        this.spriteArea.style.display = 'none';
        this.textureArea.style.display = 'flex';
        if (this.colorMap && this.textureMap && this.spriteMap) {
            this.colorMap.el.style.opacity = '60%';
            this.textureMap.el.style.opacity = '1';
            this.spriteMap.el.style.opacity = '60%';
            this.wrapper.map = this.textureMap;
        }
    }
    public openSprites() {
        this.colorArea.style.display = 'none';
        this.textureArea.style.display = 'none';
        this.spriteArea.style.display = 'flex';
        if (this.colorMap && this.textureMap && this.spriteMap) {
            this.colorMap.el.style.opacity = '60%';
            this.textureMap.el.style.opacity = '1';
            this.spriteMap.el.style.opacity = '1';
            this.wrapper.map = this.spriteMap;
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

        Object.entries(spriteList).forEach((sprites) => {
            const div = document.createElement('div');
            div.addEventListener('click', () => {
                sessionStorage.setItem('pencil-type','sprite');
                sessionStorage.setItem('pencil-value', sprites[0]);
            })
            div.classList.add('tile');
            div.style.backgroundImage = `url(${sprites[1]})`;
            div.style.backgroundSize = 'cover';
            div.style.backgroundPosition = 'center';
            div.style.backgroundRepeat = 'no-repeat'; 
            this.spriteArea.appendChild(div);
        });

        // Selection Buttons
        const defaultCursor = document.getElementById('btn__default-selection')
        if (defaultCursor) {
            defaultCursor.addEventListener('click', (e) => {
                sessionStorage.setItem('pencil-mode','default');
            })
        };

        const areaCursor = document.getElementById('btn__area-selection');
        if (areaCursor) {
            areaCursor.addEventListener('click', (e) => {
                sessionStorage.setItem('pencil-mode','area');
            })
        }

        const fillCursor = document.getElementById('btn__fill-selection');
        if (fillCursor) {
            fillCursor.addEventListener('click', (e) => {
                sessionStorage.setItem('pencil-mode','fill');
            })
        }

        // Paint Buttons
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

        const spriteBtn = document.getElementById('btn__sprite');
        if (spriteBtn) {
            spriteBtn.addEventListener('click', (e) => {
                this.openSprites();
            })
        }
    }

    constructor(
        colorArea: HTMLElement,
        textureArea: HTMLElement, 
        spriterArea: HTMLElement,
        colorMap: GameMap, 
        textureMap: GameMap,
        spriteMap: GameMap,
        wrapper: MapWrapper 
    ) {
        this.textureArea = textureArea;
        this.textureMap =  textureMap;
        this.spriteArea = spriterArea;
        this.colorArea = colorArea;
        this.colorMap = colorMap;
        this.spriteMap = spriteMap;
        this.wrapper = wrapper;

        this.setup()
    }
}