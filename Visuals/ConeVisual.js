define(["Graphics/Visuals/Visual", "Graphics/Meshes/ConeMesh", "Graphics/Math/Vector3", "Graphics/Scene/Actor"], function (vis, coneMesh, vec3, actor) {
    var coneVis = function () {
        this.mesh = coneMesh;
        this.color = new vec3(1, 0, 0);
        this.scale = new vec3(1, 1, 1);
        this.actor = new actor();
        this.pickColor = new vec3();
        this.visible = true;
    }
    coneVis.prototype = new vis();
    return coneVis;
});