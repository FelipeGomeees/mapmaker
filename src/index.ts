import { GameMap } from "./classes/GameMap";
import { MapWrapper } from "./classes/MapWrapper";
import { EditorGui } from "./classes/EditorGui";
import { testMap } from "./maps";

window.onload = () => {
    const colorCanvas = document.getElementById("color__map") as HTMLCanvasElement;
    const ColorMap = new GameMap(colorCanvas);
    const textureCanvas = document.getElementById("texture__map") as HTMLCanvasElement;
    const TextureMap = new GameMap(textureCanvas);
    const spriteCanvas = document.getElementById("texture__map") as HTMLCanvasElement;
    const SpriteMap = new GameMap(spriteCanvas);
    const downloadCanvas = document.getElementById("download__map") as HTMLCanvasElement;
    // colocar failsave ifs para tratar caso o elemento não seja encontrado
    ColorMap.draw();
    TextureMap.draw();
    SpriteMap.draw();

    const wrapperEl = document.getElementById('wrapper');
    if (wrapperEl) {
        const wrapper = new MapWrapper(wrapperEl, ColorMap);

        const colorArea = document.getElementById('tile-area__color')
        const textureArea = document.getElementById('tile-area__texture')
        const spriteArea = document.getElementById('tile-area__sprite')
        if (colorArea && textureArea &&  spriteArea && wrapper) {
            const gui = new EditorGui(colorArea, textureArea, spriteArea, ColorMap, TextureMap, SpriteMap, wrapper);
        }
    }

    const download = document.getElementById('gui__download');
    if (download) {
        download.addEventListener('click', () => {

            const finalCanvas = document.getElementById("color__map") as HTMLCanvasElement;
            const FinalMap = new GameMap(finalCanvas, ColorMap.colorMap, TextureMap.textureMap, SpriteMap.spriteMap);

            const exportData = FinalMap.export();
            console.log(exportData);

            // const final = downloadCanvas.getContext('2d');
            // if (final) {
            //     final.drawImage(colorCanvas, 0, 0);
            //     final.drawImage(textureCanvas, 0, 0);
            //     const link = document.createElement('a');
            //     link.download = 'map.png';
            //     link.href = downloadCanvas.toDataURL();
            //     link.click();
            // }
        })
    }
}   