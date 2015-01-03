define(["Graphics/WebGl/GlContext"], function (gl) {

    var keyboard = {
        keyState : {},
    };

    for (var i = 0; i < 128; i++) {
        keyboard.keyState[i] = 0;
    }

    var handleKeyDown = function(keyEvent){
        keyboard.keyState[keyEvent.keyCode] = 1;
    }

    var handleKeyUp = function (keyEvent) {
        keyboard.keyState[keyEvent.keyCode] = 0;
    }

    gl.canvasElement.addEventListener("keydown", handleKeyDown, false);
    gl.canvasElement.addEventListener("keyup", handleKeyUp, false);

    return keyboard;

});