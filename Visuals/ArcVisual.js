define(["Graphics/WebGl/GlContext", "Graphics/WebGl/GlobalGlMatrixState", "Graphics/Visuals/Visual", "Graphics/Meshes/ArcMesh", "Graphics/Math/Vector3", "Graphics/Scene/Actor", "Graphics/Shaders/ArcProgram", "Graphics/Shaders/ArcPickProgram", "Graphics/Scene/Camera"],
    function (gl, glMats, vis, arcMesh, vec3, actor, arcProg, arcPick, cam) {

    var arcVis = function () {
        this.mesh = arcMesh;
        this.color = new vec3(1, 0, 0);
        this.scale = new vec3(1, 1, 1);
        this.actor = new actor();
        this.pickColor = new vec3();
        this.visible = true;
        this.radius = 0.5;
        this.draw = function () {
            if (this.visible) {
                gl.useProgram(arcProg);
                gl.uniformMatrix4fv(arcProg.mMatrixUniform, false, this.actor.worldMatrix.d);
                gl.uniformMatrix4fv(arcProg.pMatrixUniform, false, glMats.projectionMatrix.d);
                gl.uniformMatrix4fv(arcProg.vMatrixUniform, false, glMats.viewMatrix.d);
                gl.uniform3fv(arcProg.camPosUniform, cam.actor.getLocation().d);
                gl.uniform1f(arcProg.radius, this.radius);
                gl.uniform3fv(arcProg.visColorUniform, this.color.d);
                gl.uniform3fv(arcProg.visScaleUniform, this.scale.d);

                gl.enableVertexAttribArray(arcProg.vertexPosAttr);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);
                gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.vertexPosBuffer);
                gl.vertexAttribPointer(arcProg.vertexPosAttr, 3, gl.FLOAT, false, 0, 0);

                gl.enableVertexAttribArray(arcProg.vertexNormAttr);
                gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.vertexNormBuffer);
                gl.vertexAttribPointer(arcProg.vertexNormAttr, 3, gl.FLOAT, false, 0, 0);

                gl.enableVertexAttribArray(arcProg.offsetAttr);
                gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.offsetBuffer);
                gl.vertexAttribPointer(arcProg.offsetAttr, 3, gl.FLOAT, false, 0, 0);

                gl.drawElements(gl.TRIANGLES, this.mesh.indices.length, gl.UNSIGNED_SHORT, 0);
            }
        }

        this.drawPick = function () {
            {
                if (this.visible) {
                    gl.useProgram(arcPick);
                    gl.uniformMatrix4fv(arcPick.mMatrixUniform, false, this.actor.worldMatrix.d);
                    gl.uniformMatrix4fv(arcPick.pMatrixUniform, false, glMats.projectionMatrix.d);
                    gl.uniformMatrix4fv(arcPick.vMatrixUniform, false, glMats.viewMatrix.d);
                    gl.uniform1f(arcPick.radius, this.radius);
                    gl.uniform3fv(arcPick.visColorUniform, this.pickColor.d);
                    gl.uniform3fv(arcPick.visScaleUniform, this.scale.d);

                    gl.enableVertexAttribArray(arcPick.vertexPosAttr);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.vertexPosBuffer);
                    gl.vertexAttribPointer(arcPick.vertexPosAttr, 3, gl.FLOAT, false, 0, 0);

                    gl.enableVertexAttribArray(arcPick.vertexNormAttr);
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.vertexNormBuffer);
                    gl.vertexAttribPointer(arcPick.vertexNormAttr, 3, gl.FLOAT, false, 0, 0);

                    gl.enableVertexAttribArray(arcPick.offsetAttr);
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.offsetBuffer);
                    gl.vertexAttribPointer(arcPick.offsetAttr, 3, gl.FLOAT, false, 0, 0);

                    gl.drawElements(gl.TRIANGLES, this.mesh.indices.length, gl.UNSIGNED_SHORT, 0);
                }
            }
        }
    }

    arcVis.prototype = new vis();
    return arcVis;
});