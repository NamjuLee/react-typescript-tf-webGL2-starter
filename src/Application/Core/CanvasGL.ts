import { Application } from '..';

export class CanvasGL {
    public app: Application;
    public gl: WebGL2RenderingContext;
    public canvas: HTMLCanvasElement;
    public isActive: boolean = true;

    constructor(app: Application) {
        this.app = app;
        this.initCanvas(this.app.host);
    }
    private initCanvas(hostDiv: HTMLElement) {
        console.log(hostDiv.style.height);
        console.log(hostDiv.style.width);

        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.height = hostDiv.style.height + 'px';
        this.canvas.style.width = hostDiv.style.width + 'px';
        hostDiv.appendChild(this.canvas);
        this.canvas.id = 'WebGL2';
        this.canvas.className = 'WebGLRenderer';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.width = hostDiv.clientWidth;
        this.canvas.height = hostDiv.clientHeight;
        let GLParm = { preserveDrawingBuffer: true, antialias: true, depth: true };
        this.gl = this.canvas.getContext('webgl2', GLParm) as WebGL2RenderingContext; // experimental-webgl
        if (!this.gl) { console.debug('your browser does not support WebGL.'); }

        this.loopIndependentCanvas(this.gl);
    }
    public loopIndependentCanvas(gl: WebGL2RenderingContext) {
        if (!this.isActive) { return; }
        requestAnimationFrame(() => { this.loopIndependentCanvas(gl); }); 
        this.renderIndependentCanvas(gl);        
    }
    public renderIndependentCanvas(gl: WebGL2RenderingContext) {
        console.log('implementation needed');
    }  
}