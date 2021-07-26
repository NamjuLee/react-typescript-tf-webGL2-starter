import { version } from '@tensorflow/tfjs';
import { CanvasGL } from './Core/CanvasGL';
import { Renderer } from './Core/Renderer';

import { Scene } from './Scene/Scene';

import { Triangle } from './Geometry/Triangle';

export class Application {
    public host: HTMLElement;
    public canvas: CanvasGL;
    public renderer:Renderer;

    public scene: Scene;

    constructor(id: string) {
        console.log('id: ' + id + ', App Init!!!!!');
        const host = document.getElementById(id);
        if (host) {this.host = host; }

        this.init();
        this.initPost();
    }
    public init(){
        this.scene = new Scene(this);
        this.canvas = new CanvasGL(this);
        this.renderer = new Renderer(this);
        this.canvas.renderIndependentCanvas = this.renderer.render;

        console.log('tf version: ', version);    
    }
    public initPost(){    
        new Triangle(this, this.canvas.gl, 1,0,0);
    }
}