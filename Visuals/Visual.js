define(["Graphics/WebGl/GlContext", "Graphics/WebGl/GlobalGlMatrixState", "Graphics/Shaders/DrawingProgram", "Graphics/Shaders/PickingProgram", "Graphics/Scene/Camera"], function (gl, glMats, drawProg, pickProg, cam) {
    var vis = function () {

        this.draw = function () {
            if (this.visible) {
                this.loadProgram();
                gl.uniformMatrix4fv(drawProg.mMatrixUniform, false, this.actor.worldMatrix.d);
                gl.uniformMatrix4fv(drawProg.pMatrixUniform, false, glMats.projectionMatrix.d);
                gl.uniformMatrix4fv(drawProg.vMatrixUniform, false, glMats.viewMatrix.d);
                gl.uniform3fv(drawProg.camPosUniform, cam.actor.getLocation().d);
                gl.uniform3fv(drawProg.visColorUniform, this.color.d);
                gl.uniform3fv(drawProg.visScaleUniform, this.scale.d);

                gl.enableVertexAttribArray(drawProg.vertexPosAttr);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);
                gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.vertexPosBuffer);
                gl.vertexAttribPointer(drawProg.vertexPosAttr, 3, gl.FLOAT, false, 0, 0);

                gl.enableVertexAttribArray(drawProg.vertexNormAttr);
                gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.vertexNormBuffer);
                gl.vertexAttribPointer(drawProg.vertexNormAttr, 3, gl.FLOAT, false, 0, 0);

                gl.drawElements(gl.TRIANGLES, this.mesh.indices.length, gl.UNSIGNED_SHORT, 0);
            }
        },

        this.loadProgram = function(){
            gl.useProgram(drawProg);
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

        this.drawPick = function () {
            {
                if (this.visible) {
                    gl.useProgram(pickProg);
                    gl.uniformMatrix4fv(pickProg.mMatrixUniform, false, this.actor.worldMatrix.d);
                    gl.uniformMatrix4fv(pickProg.pMatrixUniform, false, glMats.projectionMatrix.d);
                    gl.uniformMatrix4fv(pickProg.vMatrixUniform, false, glMats.viewMatrix.d);
                    gl.uniform3fv(pickProg.visColorUniform, this.pickColor.d);
                    gl.uniform3fv(pickProg.visScaleUniform, this.scale.d)

                    gl.enableVertexAttribArray(pickProg.vertexPosAttr);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.vertexPosBuffer);
                    gl.vertexAttribPointer(pickProg.vertexPosAttr, 3, gl.FLOAT, false, 0, 0);

                    gl.enableVertexAttribArray(pickProg.vertexNormAttr);
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.vertexNormBuffer);
                    gl.vertexAttribPointer(pickProg.vertexNormAttr, 3, gl.FLOAT, false, 0, 0);

                    gl.drawElements(gl.TRIANGLES, this.mesh.indices.length, gl.UNSIGNED_SHORT, 0);
                }
            }
        }
        
        this.setColor = function (r, g, b) {
            this.color.d[0] = r;
            this.color.d[1] = (g == null) ? r : g;
            this.color.d[2] = (b == null) ? r : b;
        }

        this.setScale = function (x, y, z) {
            this.scale.d[0] = x;
            this.scale.d[1] = (y) ? y : x;
            this.scale.d[2] = (z) ? z : x;
        }

        this.setVisible = function ( isVisible ) {
            this.visible = isVisible;
        }

        this.update = function (dTime) { };
 

    }

    return vis;
});