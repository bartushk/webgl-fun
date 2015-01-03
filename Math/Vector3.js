define([], function () {
    function Vector3(x, y, z) {
        this.d = new Float32Array(3);
        this.d[0] = x || 0;
        this.d[1] = y || 0;
        this.d[2] = z || 0;

        this.add = function(vec3) {
            return new Vector3(this.d[0] + vec3.d[0], this.d[1] + vec3.d[1], this.d[2] + vec3.d[2]);
        }

        this.subtract = function (vec3) {
            return new Vector3(this.d[0] - vec3.d[0], this.d[1] - vec3.d[1], this.d[2] - vec3.d[2]);
        }

        this.cross = function (vec3) {
            return new Vector3(
                    this.d[1] * vec3.d[2] - this.d[2] * vec3.d[1],
                    this.d[2] * vec3.d[0] - this.d[0] * vec3.d[2],
                    this.d[0] * vec3.d[1] - this.d[1] * vec3.d[0]
                );
        }

        this.scale = function (scale) {
            return new Vector3(this.d[0] * scale, this.d[1] * scale, this.d[2] * scale);
        }

        this.length = function () {
            return Math.sqrt(this.d[0] * this.d[0] + this.d[1] * this.d[1] + this.d[2] * this.d[2]);
        }

        this.normalize = function () {
            return new Vector3(this.d[0]/this.length(), this.d[1]/this.length(), this.d[2]/this.length());
        }

        this.dot = function (vec3) {
            return vec3.d[0] * this.d[0] + vec3.d[1] * this.d[1] + vec3.d[2] * this.d[2];
        }

        this.key = function () {
            return this.d[0].toFixed(2) + this.d[1].toFixed(2) + this.d[2].toFixed(2);
        }


    };

    return Vector3;
});