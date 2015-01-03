define(["Graphics/Visuals/Visual", "Graphics/Meshes/PyramidMesh", "Graphics/Math/Vector3", "Graphics/Scene/Actor"], function (vis, pyrMesh, vec3, actor) {
    var pyrVis = function () {
        this.mesh = pyrMesh;
        this.color = new vec3(1, 0, 0);
        this.scale = new vec3(1, 1, 1);
        this.actor = new actor();
        this.pickColor = new vec3();
        this.visible = true;
    }
    pyrVis.prototype = new vis();
    return pyrVis;
});