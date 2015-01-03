define(["Graphics/WebGl/GlContext", "Graphics/Scene/Camera", "Graphics/Visuals/VisualDictionary", "Graphics/WebGl/FrameBuffer", "Graphics/Utils/UniqueColorPool", "Graphics/Math/Vector3"],
function (gl, cam, visDict, FrameBuffer, colorPool, vec3) {
    var scene = function () {
        this.visuals = [];
        var self = this;
        this.prevTime = 0;
        this.lastRenderedTexture = new Uint8Array(gl.canvasWidth * gl.canvasHeight * 4);
        this.pickingBuffer = new FrameBuffer(gl.canvasWidth, gl.canvasHeight);
        this.pickingColorPool = new colorPool();
        this.visByColorLookup = {};
        this.cam = cam;
    
        this.resetMousePickBuffers = function(){
            self.lastRenderedTexture = new Uint8Array(gl.canvasWidth * gl.canvasHeight * 4);
            self.pickingBuffer = new FrameBuffer(gl.canvasWidth, gl.canvasHeight);
        }

        this.addVisual = function (vis) {
            var pickColor = this.pickingColorPool.getNewColor();
            vis.pickColor = pickColor;
            this.visByColorLookup[this.pickingColorPool.colorToKey(pickColor)] = vis;
            this.visuals.push(vis);
            return vis;
        }

        this.addVisualType = function (type) {
            return this.addVisual( new visDict[type]());
        }

        this.getVisualByPickColor = function (color) {
            return this.visByColorLookup[this.pickingColorPool.colorToKey(color)];
        }

        this.clear = function () {
            this.visuals = [];
            this.pickingColorPool.freeColor = 0;
        }

        this.getColorByMousePosition = function (x, y) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, self.pickingBuffer.fb);
            self.drawPick();
            gl.readPixels(0, 0, gl.canvasWidth, gl.canvasHeight, gl.RGBA, gl.UNSIGNED_BYTE, self.lastRenderedTexture);
            x = Math.round(x);
            y = Math.round(y);
            var newY = gl.canvasHeight - y;
            var index = (newY * gl.canvasWidth + x) * 4;
            if (x < 5 && y < 5) {
                _.each(self.lastRenderedTexture, function (x, i) { if (x < 255) { console.log(i); } });
                console.log(x);
                console.log(y);
                console.log(index);
            }
            return new vec3(this.lastRenderedTexture[index] / 255, this.lastRenderedTexture[index + 1] / 255, this.lastRenderedTexture[index + 2] / 255);
        }

        this.getVisualByMousePosition = function (x, y) {
            return this.getVisualByPickColor(this.getColorByMousePosition(Math.round(x), Math.round(y)));
        }

        this.update = function (dTime) {
            this.visuals.forEach(function (vis) { vis.update(dTime); });
            cam.update(dTime);
        }

        this.draw = function () {
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            this.visuals.forEach(function (vis) { vis.draw(); })
        }

        this.drawPick = function () {
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            this.visuals.forEach(function (vis) { vis.drawPick(); })
        }

        this.AnimationFrame = function (time) {
            window.requestAnimationFrame(self.AnimationFrame, gl.canvasElement);
            var dTime = time - self.prevTime;
            self.prevTime = time;
            self.update(dTime / 1000);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            self.draw();
        }

        this.StartAnimation = function () {
            this.AnimationFrame(0);
        }

        this.onMouseOver = function (dx, dy) {
        }

        this.onMouseDown = function () {
        }

        this.onMouseUp = function () {
        }

        this.onDblClick = function () {
        }

        this.onMouseIn = function () {
        }

        this.onMouseOut = function () {
        }

    }

    return new scene();
});