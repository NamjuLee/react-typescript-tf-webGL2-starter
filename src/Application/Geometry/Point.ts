import { GLUtility } from '../GL/GLUtility';

import { Application } from '../';

export class Point{
    app: Application;
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    fragmentShader: WebGLShader;
    vertexShader: WebGLShader;
    matrixLocation: WebGLProgram;
    posBuffer: WebGLBuffer;
    colBuffer: WebGLBuffer;
    vertexs: Float32Array;

    posLocAtt: number;
    colLocAtt: number;
    matLoc: WebGLUniformLocation;
    colLoc: WebGLUniformLocation;
    cVecLoc: WebGLUniformLocation;
    mouseLoc: WebGLUniformLocation;
    timeGL: WebGLUniformLocation;
    // startTime: number;
    // randomSeed: number;

    vShader: WebGLShader;
    fShader: WebGLShader;

    v = `
    attribute vec2 a_position;

    void main() {
      gl_Position = vec4(a_position, 0, 1);
    }
    `;

    f = `
    precision mediump float;

    uniform vec4 u_color;

    void main() {
       gl_FragColor = u_color;
        // gl_FragColor = vec4(1,0,0,0);
    }
    `;

    positionAttribLocation: WebGLProgram;
    colorAttribLocation: WebGLProgram;
    translation: number[];
    color: number[];
    colArray: Float32Array;

    constructor(app: Application, gl: WebGL2RenderingContext, r: number = 0.2, g: number = 0.2, b: number = 0.0, a: number = 0.1) {
        this.app = app;
        this.gl = gl;
        this.color = [r, g, b, a];
        this.InitShader();
        this.app.scene.geo.push(this);

    }
    InitShader() {
        let vShader = GLUtility.CreateShader(this.gl, this.gl.VERTEX_SHADER as unknown as WebGLShader, this.v); // '/shader/vsCanvas.glsl');
        let fShader = GLUtility.CreateShader(this.gl, this.gl.FRAGMENT_SHADER as unknown as WebGLShader, this.f); // '/shader/fsColor.glsl');

        if (vShader && fShader) {
            this.vShader = vShader;
            this.fShader = fShader;
            let program = GLUtility.CreateProgram(this.gl, vShader, fShader);
            if (program) { this.program = program; }
        }
        this.vertexs = new Float32Array([
            // left column
            0, 0,
            -1, -1,
            1, -1,
            // 1, 1,
            // -1, 1,
            // -1, - 1

        ]);
    }
    Render(gl: WebGLRenderingContext) {

        gl.useProgram(this.program);
        this.posBuffer = this.gl.createBuffer() as WebGLBuffer;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.posBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertexs), gl.STATIC_DRAW);

        this.posLocAtt = this.gl.getAttribLocation(this.program, 'a_position');
        this.colLoc = this.gl.getUniformLocation(this.program, 'u_color') as WebGLUniformLocation;

        // Tell the attribute how to get data out of posBuffer (ARRAY_BUFFER)
        let size = 2;          // 2 components per iteration
        let type = gl.FLOAT;   // the data is 32bit floats
        let normalize = false; // don't normalize the data
        let stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
        let offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(this.posLocAtt, size, type, normalize, stride, offset);
        gl.enableVertexAttribArray(this.posLocAtt);
        gl.uniform4fv(this.colLoc, new Float32Array(this.color));

        let primitiveType = gl.TRIANGLE_FAN; // LINE_LOOP; // gl.TRIANGLE_STRIP;
        offset = 0;
        let count = this.vertexs.length * 0.5;
        gl.drawArrays(primitiveType, offset, count);
    }
}