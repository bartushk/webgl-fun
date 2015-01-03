define(["Graphics/Visuals/Visual", "Graphics/Meshes/BoxMesh", "Graphics/Math/Vector3", "Graphics/Scene/Actor"], function (vis, boxMesh, vec3, actor) {
    var boxVis = function () {
        this.mesh = boxMesh;
        this.color = new vec3(1, 0, 0);
        this.scale = new vec3(1, 1, 1);
        this.actor = new actor();
        this.pickColor = new vec3();
        this.visible = true;
    }
    boxVis.prototype = new vis();
    return boxVis;    
});