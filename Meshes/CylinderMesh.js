define(["Graphics/Meshes/Mesh", "Graphics/Utils/GlUtils"], function (mesh, utils) {
    var cylinder = new mesh();
    var bufferObj = utils.calculateCylinderBuffers(30);
    cylinder.indices = bufferObj.indices;
    cylinder.vPos = bufferObj.vertices;
    cylinder.vNorm = bufferObj.normals;
    cylinder.initBuffers();
    return cylinder;
});