define(["Graphics/WebGl/GlContext", "Graphics/Utils/GlUtils", "Graphics/Shaders/MCMfragment", "Graphics/Shaders/CalculationVertex"], function (gl, utils, fs, vs) {
    var prog = utils.createShaderProgram(vs, fs);
    prog.locationAttr = gl.getAttribLocation(prog, 'location');
    prog.dataInputAttr = gl.getAttribLocation(prog, 'dataInput');
    prog.tAttr = gl.getUniformLocation(prog, 'tVal');
    prog.calcSizeUniform = gl.getUniformLocation(prog, 'calcSize');
    return prog;
});