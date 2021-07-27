import { createShader, createProgram } from '../GL/GLUtility';
import { Application } from '..';

export class Triangle{
    public app: Application;
    public gl: WebGL2RenderingContext;
    public program: WebGLProgram;
    public fragmentShader: WebGLShader;
    public vertexShader: WebGLShader;
    
    public posBuffer: WebGLBuffer;
    public posLocAtt: number;

    public vertexs: number[] = [];
    public color: Float32Array;

    public colLoc: WebGLUniformLocation;
    public mouseLoc: WebGLUniformLocation;

    public v = `#version 300 es
    precision mediump float;

    in vec2 a_position;
    
    uniform vec2 mouse;

    out float dis;
    out vec2 pos;

    void main() {
        dis = distance(mouse, a_position);
        pos = vec2(a_position.xy);
        gl_Position = vec4(a_position, 0, 1);
    }
    `;

    public f = `#version 300 es
    precision mediump float;

    in vec2 pos;
    in float dis;

    uniform vec4 u_color;

    out vec4 finalColor;

    void main() {

        float r = u_color.r * dis;
        float g = pos.x * dis;
        float b = pos.y * dis;

        finalColor = vec4(r, g, b , 1);
    }
    `;
    constructor(app: Application, gl: WebGL2RenderingContext, r: number = 0.2, g: number = 0.2, b: number = 0.0, a: number = 0.1) {
        this.app = app;
        this.gl = gl;

        this.color = new Float32Array([r, g, b, a]);

        const offset = 0.67;
        this.vertexs = [
            0,          offset ,
            -offset,   -offset ,
            offset,    -offset,
        ];

        this.initShader();
        this.app.scene.geo.push(this);

    }
    public initShader() {
        const vShader = createShader(this.gl, this.gl.VERTEX_SHADER as unknown as WebGLShader, this.v); // '/shader/vsCanvas.glsl');
        const fShader = createShader(this.gl, this.gl.FRAGMENT_SHADER as unknown as WebGLShader, this.f); // '/shader/fsColor.glsl');

        if (vShader && fShader) {
            this.vertexShader = vShader;
            this.fragmentShader = fShader;
            const program = createProgram(this.gl, vShader, fShader);
            if (program) { this.program = program; }
        }
    }
    public render(gl: WebGLRenderingContext) {
        gl.useProgram(this.program);
        this.posBuffer = this.gl.createBuffer() as WebGLBuffer;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.posBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertexs), gl.STATIC_DRAW);

        this.posLocAtt = this.gl.getAttribLocation(this.program, 'a_position');
        this.colLoc = this.gl.getUniformLocation(this.program, 'u_color') as WebGLUniformLocation;

        // tell the attribute how to get data out of posBuffer (ARRAY_BUFFER)
        const size = 2;          // 2 components per iteration
        const type = gl.FLOAT;   // the data is 32bit floats
        const normalize = false; // don't normalize the data
        const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
        let offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(this.posLocAtt, size, type, normalize, stride, offset);
        gl.enableVertexAttribArray(this.posLocAtt);
        gl.uniform4fv(this.colLoc, new Float32Array(this.color));


        this.mouseLoc  = this.gl.getUniformLocation(this.program, 'mouse') as WebGLUniformLocation;
        // with/out remap
        gl.uniform2f(this.mouseLoc, this.remap(this.app.canvas.mouse[0], gl.canvas.width), this.remap(this.app.canvas.mouse[1], gl.canvas.height) * -1);
        // gl.uniform2f(this.mouseLoc, this.app.canvas.mouse[0], this.app.canvas.mouse[1]);

        const primitiveType = gl.TRIANGLE_FAN; // LINE_LOOP; // gl.TRIANGLE_STRIP;
        offset = 0;

        const count = this.vertexs.length * 0.5;
        gl.drawArrays(primitiveType, offset, count);
    }
    private remap(value: number, OldMax: number): number {
        return ((value * 2) / (OldMax)) - 1;
    }
}