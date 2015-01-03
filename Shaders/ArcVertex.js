define(["Graphics/WebGl/GlContext", "Graphics/Utils/GlUtils"], function (gl, utils) {
    var shaderString =
        'precision mediump float;' +
        'attribute vec3 aVertexPosition;' +
        'attribute vec3 aVertexNormal;' +
        'attribute vec3 circleOffset;' +
        'varying vec4 vWorldSpaceNormal;' +
        'varying vec3 fragPos;' +
        'uniform mat4 uMMatrix;' +
        'uniform mat4 uPMatrix;' +
        'uniform mat4 uVMatrix;' +
        'uniform vec3 visScale;' +
        'uniform float radius;'+
        'void main() {' +
            'vec3 scaledPos = vec3(aVertexPosition.x * visScale.x, aVertexPosition.y* visScale.y, aVertexPosition.z* visScale.z);' +
            'scaledPos.x = scaledPos.x + radius * circleOffset.x;' +
            'scaledPos.y = scaledPos.y + radius * circleOffset.y;' +
            'scaledPos.z = scaledPos.z + radius * circleOffset.z;' +
            'vWorldSpaceNormal = uMMatrix * vec4(aVertexNormal, 0.0);' +
            'vec4 pos = uPMatrix * uVMatrix * uMMatrix * vec4(scaledPos.x, scaledPos.y, scaledPos.z, 1.0);' +
            'gl_Position = pos;' +
            'fragPos = vec3(pos);'+
        '}';
    return utils.createShader(shaderString, gl.VERTEX_SHADER);
});