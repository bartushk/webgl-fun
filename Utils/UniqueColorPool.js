define(["Graphics/Math/Vector3"], function (vec3) {
    var pool = function () {
        this.freeColor = 0;

        this.getNewColor = function () {
            this.freeColor++;
            return new vec3((this.freeColor % 256) / 255, ((this.freeColor >> 8) % 256) / 255, ((this.freeColor >> 16) % 256) / 255);
        }

        this.colorToKey = function (color) {
            return Math.round( color.d[0] * 255 + (color.d[1] * 255 << 8) + (color.d[2] * 255 << 16));
        }
    }
    return pool;
});