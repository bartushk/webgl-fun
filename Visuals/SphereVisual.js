define(["Graphics/Visuals/Visual", "Graphics/Meshes/SphereMesh", "Graphics/Scene/Actor", "Graphics/Math/Vector3"], function (vis, sphereMesh, actor, vec3) {
    var sphereVis = function () {
        this.mesh = sphereMesh;
        this.color = new vec3(1, 0, 0);
        this.scale = new vec3(1, 1, 1);
        this.actor = new actor();
        this.pickColor = new vec3();
        this.visible = true;
    }
    sphereVis.prototype = new vis();
    return sphereVis;
});