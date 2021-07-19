import { Application } from '..';

export class CanvasGL {
    public app: Application;
    public gl: WebGL2RenderingContext;
    public canvas: HTMLCanvasElement;
    public isActive: boolean = true;

    constructor(app: Application) {
        this.app = app;
        this.InitCanvas(this.app.host);
    }
    private InitCanvas(hostDiv: HTMLElement) {
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
        this.canvas.width = hostDiv.clientWidth; // hostDivForSize.clientWidth;
        this.canvas.height = hostDiv.clientHeight; // hostDivForSize.clientHeight;
        let GLParm = { preserveDrawingBuffer: true, antialias: true, depth: true };
        this.gl = this.canvas.getContext('webgl2', GLParm) as WebGL2RenderingContext; // experimental-webgl
        // if (!this.gl) { console.debug('webGL does not support, try experimental-webgl'); this.gl = this.canvas.getContext('experimental-webgl') as WebGLRenderingContext; }
        if (!this.gl) { console.debug('your browser does not support WebGL.'); }


        this.LoopIndependentCanvas(this.gl);
    }
    public LoopIndependentCanvas(gl: WebGL2RenderingContext) {
        if (!this.isActive) { return; }
        requestAnimationFrame(() => { this.LoopIndependentCanvas(gl); }); 
        this.RenderIndependentCanvas(gl);        
    }
    public RenderIndependentCanvas(gl: WebGL2RenderingContext) {
        console.log('implementation needed');
    }  
}