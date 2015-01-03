define(["Graphics/WebGl/GlContext","Graphics/Utils/GlUtils"], function (gl, utils) {
    var shaderString =
        'precision mediump float;' +
        'attribute vec3 aVertexPosition;' +
        'attribute vec3 aVertexNormal;' +
        'varying vec4 vWorldSpaceNormal;' +
        'varying vec3 fragPos;'+
        'uniform mat4 uMMatrix;' +
        'uniform mat4 uPMatrix;' +
        'uniform mat4 uVMatrix;' +
        'uniform vec3 visScale;' +
        'void main() {' +
            'vec3 scaledPos = vec3(aVertexPosition.x * visScale.x, aVertexPosition.y * visScale.y, aVertexPosition.z * visScale.z);' +
            'vWorldSpaceNormal = uMMatrix * vec4(aVertexNormal, 0.0);' +
            'gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(scaledPos.x, scaledPos.y, scaledPos.z, 1.0);' +
            'fragPos = vec3(uMMatrix * vec4(scaledPos.x, scaledPos.y, scaledPos.z, 1.0));' +
        '}';
    return utils.createShader(shaderString, gl.VERTEX_SHADER);
});