
export class GLUtility{
    static CreateShader(gl: WebGL2RenderingContext, type: WebGLShader, shaderString: string) {
        const shader = gl.createShader(type as unknown as number);
        if (shader === null) {return null; }
        gl.shaderSource(shader, shaderString);
        gl.compileShader(shader);
        const suc = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (suc) { return shader; }
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    static CreateProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader, needValidate: boolean = true): WebGLProgram | null {
        const program = gl.createProgram();
        if (program === null ) {return null; }
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        // Check that shader program was able to link to WebGL
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const error = gl.getProgramInfoLog(program);
            console.log('Failed to link program: ' + error);
            gl.deleteProgram(program);
            gl.deleteShader(fragmentShader);
            gl.deleteShader(vertexShader);
            return null;
        }
        if (needValidate) {
            gl.validateProgram(program);
            if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
                console.error('Failed to validate program', gl.getProgramInfoLog(program));
                gl.deleteProgram(program);
                gl.deleteShader(fragmentShader);
                gl.deleteShader(vertexShader);
                return null;
            }
        }
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        return program;
    }
}