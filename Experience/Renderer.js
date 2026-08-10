import * as THREE from "three";
import Experience from "./Experience.js";

export default class Renderer {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

        this.setRenderer();
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            powerPreference: "high-performance",
        });

        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        // PCFShadowMap is significantly faster than PCFSoftShadowMap while looking virtually identical
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        
        // Cap pixel ratio at 1.5 to save ~45% GPU fragment rendering cost on 4K/Retina displays
        const cappedDPR = Math.min(this.sizes.pixelRatio, 1.5);
        this.renderer.setPixelRatio(cappedDPR);
    }

    resize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        const cappedDPR = Math.min(this.sizes.pixelRatio, 1.5);
        this.renderer.setPixelRatio(cappedDPR);
    }

    update() {
        this.renderer.render(this.scene, this.camera.orthographicCamera);
    }
}
