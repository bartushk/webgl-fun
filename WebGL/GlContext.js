define([], function () {

    (function () {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelRequestAnimationFrame = window[vendors[x] +
                'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
    }())

    var c = document.getElementById('glCanvas');
    var gl = glCanvas.getContext("webgl");
    if (!gl) {
        gl = glCanvas.getContext("experimental-webgl");
    }
    if (!gl) {
        alert("Your browser does not support WebGL");
        return;
    }
    gl.canvasElement = c;
    gl.canvasWidth = c.width;
    gl.canvasHeight = c.height;
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.clearColor(0.0, 0.0, 0.0, 1);
    return gl;
});