define(["Graphics/Visuals/SphereVisual", "Graphics/Visuals/BoxVisual", "Graphics/Visuals/PyramidVisual", "Graphics/Visuals/CylinderVisual", "Graphics/Visuals/ConeVisual", "Graphics/Visuals/ArcVisual"],
    function (sphereVis, boxVis, pyrVis, cylVis, coneVis, arcVis) {
        var dictionary = {};
        dictionary.box = boxVis;
        dictionary.sphere = sphereVis;
        dictionary.pyramid = pyrVis;
        dictionary.cylinder = cylVis;
        dictionary.cone = coneVis;
        dictionary.arc = arcVis;
        return dictionary;
});