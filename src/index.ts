import { GameMap } from "./classes/GameMap";
import { MapWrapper } from "./classes/MapWrapper";
import { testMap } from "./maps";

window.onload = () => {
    const map = new GameMap(undefined, testMap);
    map.draw();
    const wrapperEl = document.getElementById('wrapper');
    if (wrapperEl) {
        const wrapper = new MapWrapper(wrapperEl, map);
    }
}   