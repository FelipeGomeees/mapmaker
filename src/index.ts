import { GameMap } from "./classes/GameMap";
import { MapWrapper } from "./classes/MapWrapper";
import { EditorGui } from "./classes/EditorGui";
import { testMap } from "./maps";

window.onload = () => {
    const colorCanvas = document.getElementById("color__map") as HTMLCanvasElement;
    const ColorMap = new GameMap(colorCanvas);
    const textureCanvas = document.getElementById("texture__map") as HTMLCanvasElement;
    const TextureMap = new GameMap(textureCanvas);
    ColorMap.draw();
    TextureMap.draw();

    const wrapperEl = document.getElementById('wrapper');
    if (wrapperEl) {
        const wrapper = new MapWrapper(wrapperEl, ColorMap);

        const colorArea = document.getElementById('tile-area__color')
        const textureArea = document.getElementById('tile-area__texture')
        if (colorArea && textureArea && wrapper) {
            const gui = new EditorGui(colorArea, textureArea, ColorMap, TextureMap, wrapper);
        }
    }
}   