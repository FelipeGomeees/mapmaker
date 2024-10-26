import { GameMap } from "./classes/GameMap";
import { testMap } from "./maps";

window.onload = () => {
    const wrapper = document.getElementById("wrapper");
    if (wrapper) {
        for (let i = 0; i < 20; i++) {
            const div = document.createElement("div");
            wrapper.appendChild(div);
        }
    }
    const map = new GameMap(testMap, testMap);
    map.draw();
}   