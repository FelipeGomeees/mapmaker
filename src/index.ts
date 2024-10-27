import { GameMap } from "./classes/GameMap";
import { testMap } from "./maps";

window.onload = () => {
    const wrapper = document.getElementById("wrapper");
    if (wrapper) {
        let x = 0;
        let y = 0
        for (let i = 0; i < (18 * 18); i++) {
            const div = document.createElement("div");
            div.id = `tile-${x}-${y}`;
            div.addEventListener("click", (e) => {
                if (e.target) {
                    const selectedId = (e.target as HTMLInputElement).id;
                    map.paintColor('#33f', Number(selectedId.split("-")[1]), Number(selectedId.split("-")[2]));
                }
            })
            x++;
            if (x === 18) {
                y++;
                x = 0;
            }
            wrapper.appendChild(div);
        }
    }
    const map = new GameMap(undefined, testMap);
    map.draw();
}   