define(["Graphics/WebGl/GlContext", "Graphics/Utils/GlUtils"], function (gl, utils) {
    var shaderString =
        'attribute float location;' +
        'attribute float dataInput;' +
        'varying float fragInput;' +
        'uniform float calcSize;' +
        'void main() {' +
            'fragInput = dataInput;' +
            'gl_PointSize = location / location;' +
            'gl_Position = vec4(-0.5, -0.5 , 0, 1);' +
        '}';
    return utils.createShader(shaderString, gl.VERTEX_SHADER);
});