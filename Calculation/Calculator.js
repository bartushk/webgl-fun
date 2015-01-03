define(["Graphics/WebGl/GlContext", "Graphics/WebGl/FrameBuffer"], function (gl, frameBuffer) {
    console.log("Calc");
    var calc = function (arraySize) {
        var self = this;
        this.locations = new Float32Array(arraySize);
        this.input = new Float32Array(arraySize);
        this.output = new Float32Array(arraySize);
        this.arraySize = arraySize || 0;
        this.frameSide = Math.ceil(Math.sqrt(arraySize));
        this.outputTex = new Uint8Array(self.frameSide * self.frameSide * 4);
        this.prog = prog;
        this.tVal = 0.0;
        this.calcBuffer = new frameBuffer(this.frameSide, this.frameSide);
        for (var i = 0; i < arraySize; i++) {
            self.locations[i] = i;
        }
        this.inputBuffer = gl.createBuffer();
        this.locationsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, self.locationsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, self.locations, gl.STATIC_DRAW );

        this.RunCalculation = function () {
            gl.bindFramebuffer(gl.FRAMEBUFFER, self.calcBuffer.fb);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.useProgram(self.prog);
            gl.uniform1f(self.prog.tAttr, self.tVal);
            gl.uniform1f(self.prog.calcSizeUniform, self.arraySize);            
            
            gl.enableVertexAttribArray(self.prog.locationAttr);
            gl.bindBuffer(gl.ARRAY_BUFFER, self.locationsBuffer);
            gl.vertexAttribPointer(self.prog.locationAttr, 1, gl.FLOAT, false, 0, 0);

            gl.enableVertexAttribArray(self.prog.dataInputAttr);
            gl.bindBuffer(gl.ARRAY_BUFFER, self.inputBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, self.input, gl.STATIC_DRAW);
            gl.vertexAttribPointer(self.prog.dataInputAttr, 1, gl.FLOAT, false, 0, 0);

            gl.drawArrays(gl.POINTS, 0, 4);
            gl.readPixels(0, 0, self.frameSide, self.frameSide, gl.RGBA, gl.UNSIGNED_BYTE, self.outputTex);
        }
        
    }


    return calc;
});