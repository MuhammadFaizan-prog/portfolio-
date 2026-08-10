import { EventEmitter } from "events";

export default class Time extends EventEmitter {
    constructor() {
        super();
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;
        this.isPaused = false;

        // Pause animation updates when browser tab is inactive to save CPU/GPU resources
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                this.isPaused = true;
            } else {
                this.current = Date.now();
                this.isPaused = false;
                this.update();
            }
        });

        this.update();
    }

    update() {
        if (this.isPaused) return;

        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;

        this.emit("update");
        window.requestAnimationFrame(() => this.update());
    }
}
