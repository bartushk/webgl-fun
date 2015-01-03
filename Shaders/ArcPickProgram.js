define(["Graphics/WebGl/GlContext", "Graphics/Utils/GlUtils", "Graphics/Shaders/PickingFragmentShader", "Graphics/Shaders/ArcVertex"], function (gl, utils, fs, vs) {
    var prog = utils.createShaderProgram(vs, fs);
    prog.vertexPosAttr = gl.getAttribLocation(prog, 'aVertexPosition');
    prog.vertexNormAttr = gl.getAttribLocation(prog, 'aVertexNormal');
    prog.offsetAttr = gl.getAttribLocation(prog, 'circleOffset');
    prog.camPosUniform = gl.getUniformLocation(prog, 'camPos');
    prog.mMatrixUniform = gl.getUniformLocation(prog, 'uMMatrix');
    prog.pMatrixUniform = gl.getUniformLocation(prog, 'uPMatrix');
    prog.vMatrixUniform = gl.getUniformLocation(prog, 'uVMatrix');
    prog.visColorUniform = gl.getUniformLocation(prog, 'visColor');
    prog.visScaleUniform = gl.getUniformLocation(prog, 'visScale');
    prog.radius = gl.getUniformLocation(prog, 'radius');
    return prog;
});