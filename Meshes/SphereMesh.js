define(["Graphics/Meshes/Mesh", "Graphics/Utils/GlUtils"], function (mesh, utils) {
    var sphere = new mesh();
    var bufferObj = utils.calculateSphereBuffers(20,20);
    sphere.indices = bufferObj.indices;
    sphere.vPos = bufferObj.vertices;
    sphere.vNorm = bufferObj.normals;
    sphere.initBuffers();
    return sphere;
});