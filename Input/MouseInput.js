define(["Graphics/WebGl/GlContext","Graphics/Scene/Scene"], function (gl, scene) {
    var cam = scene.camera;
    var prevOver = scene;
    var prevPos = {x:0, y:0}

    function getMousePos(evt) {
        var rect = gl.canvasElement.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    var mouseWheelHandler = function (mouseEvent) {
        var pos = getMousePos(mouseEvent);
    }

    var mouseMoveHandler = function (mouseEvent) {
        var pos = getMousePos(mouseEvent);
        var mousedOver = scene.getVisualByMousePosition(pos.x, pos.y) || scene;
        mousedOver.onMouseOver(pos.x - prevPos.x, pos.y - prevPos.y);
        if (prevOver != mousedOver) {
            prevOver.onMouseOut();
            mousedOver.onMouseIn();
        }
        prevPos = pos;
        prevOver = mousedOver;
    }

    var mouseDownHandler = function (mouseEvent) {
        var pos = getMousePos(mouseEvent);
        var mousedOver = scene.getVisualByMousePosition(pos.x, pos.y) || scene;
        mousedOver.onMouseDown();
    }

    var mouseUpHandler = function (mouseEvent) {
        var pos = getMousePos(mouseEvent);
        var mousedOver = scene.getVisualByMousePosition(pos.x, pos.y) || scene;
        mousedOver.onMouseUp();
    }

    var mouseDblClickHandler = function (mouseEvent) {
        var pos = getMousePos(mouseEvent);
        var mousedOver = scene.getVisualByMousePosition(pos.x, pos.y) || scene;
        mousedOver.onDblClick();
    }

    gl.canvasElement.addEventListener("mousewheel", mouseWheelHandler, false);
    gl.canvasElement.addEventListener("mousemove", mouseMoveHandler, false);
    gl.canvasElement.addEventListener("mousedown", mouseDownHandler, false);
    gl.canvasElement.addEventListener("mouseup", mouseUpHandler, false);
    gl.canvasElement.addEventListener("dblclick", mouseDblClickHandler, false);
    
});