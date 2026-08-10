import * as THREE from "three";

import { EventEmitter } from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import Experience from "../Experience.js";

export default class Resources extends EventEmitter {
    constructor(assets) {
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;

        this.assets = assets;

        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    }

    startLoading() {
        for (const asset of this.assets) {
            if (asset.type === "glbModel") {
                this.loaders.gltfLoader.load(
                    asset.path,
                    (file) => {
                        this.singleAssetLoaded(asset, file);
                    },
                    undefined,
                    (error) => {
                        console.error(`Error loading model ${asset.path}:`, error);
                    }
                );
            } else if (asset.type === "videoTexture") {
                this.video = this.video || {};
                this.videoTexture = this.videoTexture || {};

                const videoEl = document.createElement("video");
                videoEl.src = asset.path;
                videoEl.muted = true;
                videoEl.playsInline = true;
                videoEl.autoplay = true;
                videoEl.loop = true;
                videoEl.setAttribute("preload", "metadata");

                this.video[asset.name] = videoEl;

                // Play video non-blockingly
                videoEl.play().catch(() => {
                    // Autoplay fail-safe
                });

                this.videoTexture[asset.name] = new THREE.VideoTexture(
                    this.video[asset.name]
                );
                this.videoTexture[asset.name].minFilter = THREE.LinearFilter;
                this.videoTexture[asset.name].magFilter = THREE.LinearFilter;
                this.videoTexture[asset.name].generateMipmaps = false;
                this.videoTexture[asset.name].encoding = THREE.sRGBEncoding;

                this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
            }
        }
    }

    singleAssetLoaded(asset, file) {
        this.items[asset.name] = file;
        this.loaded++;

        if (this.loaded === this.queue) {
            this.emit("ready");
        }
    }
}
