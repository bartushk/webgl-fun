define(["Graphics/Meshes/Mesh", "Graphics/Utils/GlUtils"], function (mesh, utils) {
    var cone = new mesh();
    var bufferObj = utils.calculateConeBuffers(20);
    cone.indices = bufferObj.indices;
    cone.vPos = bufferObj.vertices;
    cone.vNorm = bufferObj.normals;
    cone.initBuffers();
    return cone;
});