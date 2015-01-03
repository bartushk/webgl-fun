define(["Graphics/WebGl/GlContext", "Graphics/Utils/GlUtils", "Graphics/Shaders/PickingFragmentShader", "Graphics/Shaders/VertexShader"], function (gl, utils, fs, vs) {
    var prog = utils.createShaderProgram(vs, fs);
    prog.vertexPosAttr = gl.getAttribLocation(prog, 'aVertexPosition');
    prog.vertexNormAttr = gl.getAttribLocation(prog, 'aVertexNormal');
    prog.mMatrixUniform = gl.getUniformLocation(prog, 'uMMatrix');
    prog.pMatrixUniform = gl.getUniformLocation(prog, 'uPMatrix');
    prog.vMatrixUniform = gl.getUniformLocation(prog, 'uVMatrix');
    prog.visColorUniform = gl.getUniformLocation(prog, 'visColor');
    prog.visScaleUniform = gl.getUniformLocation(prog, 'visScale');
    return prog;
});