define(["Graphics/WebGl/GlContext","Graphics/Meshes/Mesh", "Graphics/Utils/GlUtils"], function (gl, mesh, utils) {
    var arc = new mesh();
    //arc.pathFunc = function (x) { return Math.cos(x); };
    //arc.from = -1.4*Math.PI;
    //arc.to = 1.4*Math.PI;
    arc.pathFunc = function (x) { return x*x - 0.25; };
    arc.from = -0.5;
    arc.to = 0.5;
    var bufferObj = utils.calculateBuffersFromFunction(8, 40, 0.5, arc.from, arc.to, arc.pathFunc);
    arc.indices = bufferObj.indices;
    arc.vPos = bufferObj.vertices;
    arc.vNorm = bufferObj.normals;
    arc.offsets = bufferObj.offsets;
    arc.initBuffers();
    arc.offsetBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, arc.offsetBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arc.offsets), gl.STATIC_DRAW);
    return arc;
});