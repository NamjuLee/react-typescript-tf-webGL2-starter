import { Application } from '../';

export class Renderer{
    public app: Application;

    constructor(app: Application) {
        this.app = app;
    }
    public render(gl : WebGL2RenderingContext) {
        this.app.scene.render(gl);
    }
}