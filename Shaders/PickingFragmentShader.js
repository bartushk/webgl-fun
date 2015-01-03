define(["Graphics/WebGl/GlContext", "Graphics/Utils/GlUtils"], function (gl, utils) {
    var shaderString =
        'precision mediump float;' +
        'uniform vec3 visColor;' +
        'varying vec4 vWorldSpaceNormal;' +
        'void main() {' +
            'gl_FragColor = vec4(visColor.r, visColor.g, visColor.b, 1.0);' +
        '}';
    return utils.createShader(shaderString, gl.FRAGMENT_SHADER);
});