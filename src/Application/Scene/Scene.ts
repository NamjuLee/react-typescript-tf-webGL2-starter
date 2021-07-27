import { Application } from '../';
export class Scene{
    public app: Application;
    public geo: any = [];
    constructor(app: Application){
        this.app = app;
    }
    public render(gl : WebGL2RenderingContext ){
        for(let g of this.geo){
            g.render(gl);
        }
        // console.log('rendering....');
    }
}