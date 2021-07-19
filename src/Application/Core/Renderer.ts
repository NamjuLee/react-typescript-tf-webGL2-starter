import { Application } from '../';

export class Renderer{
    public app: Application;

    constructor(app: Application) {
        this.app = app;
    }
    public Render(gl : WebGL2RenderingContext) {
        this.app.scene.Render(gl);
    }
}