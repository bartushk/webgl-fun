define(["Graphics/Math/Matrix4x4", "Graphics/Math/Matrix4x3", "Graphics/WebGl/GlContext"], function (mat44, mat43, gl) {
    var perMat = new mat44();
    perMat.makePerspective( 45 , gl.canvasWidth/ gl.canvasHeight, 0.01, 100);
    var globalGLMatrixState = {
        projectionMatrix: perMat,
        viewMatrix: new mat43()
    }

    return globalGLMatrixState;
});