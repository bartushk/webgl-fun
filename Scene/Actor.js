define(["Graphics/Math/Matrix4x3", "Graphics/Math/Vector3"], function (mat43, vec3) {
    var actor = function () {
        this.worldMatrix = new mat43();

        this.translateWorld = function (x,y,z) {
            this.worldMatrix.d[12] += x || 0;
            this.worldMatrix.d[13] += y || 0;
            this.worldMatrix.d[14] += z || 0;
        }

        this.translateLocal = function (x, y, z) {
            var mat = this.worldMatrix;
            var toTranslate = mat.xAxis().scale(x || 0).add(mat.yAxis().scale(y || 0)).add(mat.zAxis().scale(z || 0));
            this.translateWorld(toTranslate.d[0], toTranslate.d[1], toTranslate.d[2]);
        }

        this.setLocation = function (x, y, z) {
            this.worldMatrix.d[12] = x;
            this.worldMatrix.d[13] = y;
            this.worldMatrix.d[14] = z;
        }

        this.getLocation = function () {
            return new vec3(this.worldMatrix.d[12], this.worldMatrix.d[13], this.worldMatrix.d[14]);
        }

        this.rotateLocalX = function (rads) {
            this.worldMatrix = this.worldMatrix.multiply(mat43.rotationX(rads));
        }


        this.rotateLocalY = function (rads) {
            this.worldMatrix = this.worldMatrix.multiply(mat43.rotationY(rads));
        }


        this.rotateLocalZ = function (rads) {
            this.worldMatrix = this.worldMatrix.multiply(mat43.rotationZ(rads));
        }

        this.rotateLocalAxis = function (ax, ay, az, rads) {
            this.worldMatrix = this.worldMatrix.multiply(mat43.rotationAxis(ax, ay, az, rads));
        }

        this.rotateWorldX = function (rads) {
            this.worldMatrix = mat43.rotationX(rads).multiply(this.worldMatrix);
        }


        this.rotateWorldY = function (rads) {
            this.worldMatrix = mat43.rotationY(rads).multiply(this.worldMatrix);
        }


        this.rotateWorldZ = function (rads) {
            this.worldMatrix = mat43.rotationZ(rads).multiply(this.worldMatrix);
        }

        this.rotateWorldAxis = function (ax, ay, az, rads) {
            this.worldMatrix = mat43.rotationAxis(ax,ay,az,rads).multiply(this.worldMatrix);
        }

    }

    return actor;
});