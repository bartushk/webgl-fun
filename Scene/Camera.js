define(["Graphics/Math/Vector3", "Graphics/Math/Matrix4x3", "Graphics/Scene/Actor", "Graphics/WebGl/GlobalGlMatrixState", "Graphics/Input/KeyboardInput"], function (vec3, mat43, actor, glMats, keyboard) {
    var camera = function () {
        this.actor = new actor();
        var self = this;

        this.strafeSpeed = 4.4;
        this.rotateSpeed = Math.PI / 2.0;



        this.getViewMatrix = function () {
            var wMat = this.actor.worldMatrix;
            var eye = wMat.translation();

            return new mat43(
                    wMat.d[0], wMat.d[1], wMat.d[2],
                    wMat.d[4], wMat.d[5], wMat.d[6],
                    wMat.d[8], wMat.d[9], wMat.d[10],
                    eye.dot(wMat.xAxis()), eye.dot(wMat.yAxis()), eye.dot(wMat.zAxis())
                );
        }
        this.updateView = function () {
            glMats.viewMatrix = this.getViewMatrix();
        }

        this.strafe = function (x, y, z) {
            this.actor.translateLocal(x, y, z);
        }

        this.rotateX = function (rads) {
            this.actor.rotateWorldAxis(1, 0, 0, rads);
        }

        this.rotateY = function (rads) {
            this.actor.rotateWorldAxis(0, 1, 0, rads);
        }

        this.rotateAxis = function (ax, ay, az, rads) {
            this.actor.rotateWorldAxis(ax, ay, az, rads);
        }

        this.reset = function () {
            this.actor.setLocation(0, 0, -30);
            this.orientationToIdentity();
        }

        this.orientationToIdentity = function () {
            this.actor.worldMatrix.setX(new vec3(1, 0, 0));
            this.actor.worldMatrix.setY(new vec3(0, 1, 0));
            this.actor.worldMatrix.setZ(new vec3(0, 0, 1));
        }

        this.update = function (dTime) {

            if (keyboard.keyState[87]) self.strafe(0, 0, self.strafeSpeed * dTime);//w
            if (keyboard.keyState[83]) self.strafe(0, 0, -self.strafeSpeed * dTime);//s
            if (keyboard.keyState[65]) self.strafe(self.strafeSpeed * dTime, 0, 0);//a
            if (keyboard.keyState[68]) self.strafe(-self.strafeSpeed * dTime, 0, 0);//d
            if (keyboard.keyState[81]) self.rotateY(-self.rotateSpeed * dTime);//q
            if (keyboard.keyState[69]) self.rotateY(self.rotateSpeed * dTime);//e
            if (keyboard.keyState[82]) self.strafe(0, -self.strafeSpeed * dTime, 0);;//r
            if (keyboard.keyState[70]) self.strafe(0, self.strafeSpeed * dTime, 0);//f
            //if (keyboard.keyState[82]) self.rotateX(-self.rotateSpeed * dTime);//r
            //if (keyboard.keyState[70]) self.rotateX(self.rotateSpeed * dTime);//f
            if (keyboard.keyState[90]) self.reset();//z
            self.updateView();
        };

    }

    var retCam = new camera();
    retCam.strafe(0, 0, -30);
    //retCam.strafe(0, 0, -5);
    return retCam;

});