define(["Graphics/WebGl/GlContext", "Graphics/Utils/GlUtils"], function (gl, utils) {
    var shaderString =
        'precision mediump float;' +
        'varying float fragInput;' +
        'uniform float tVal;' +
        'void main() {' +
            'vec4 col = vec4(fragInput,0,0,1);' +
            'gl_FragColor = vec4(1, 1, 1, 1);' +
        '}';
    return utils.createShader(shaderString, gl.FRAGMENT_SHADER);
});