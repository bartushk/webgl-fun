define(["Graphics/Math/Vector3"], function (vec3) {
    function Matrix4x4(x1, x2, x3, x4, y1, y2, y3, y4, z1, z2, z3, z4, t1, t2, t3, t4) {
        this.d = new Float32Array(16);
        this.d[0] = x1 || 1;
        this.d[1] = x2 || 0;
        this.d[2] = x3 || 0;
        this.d[3] = x4 || 0;
        this.d[4] = y1 || 0;
        this.d[5] = y2 || 1;
        this.d[6] = y3 || 0;
        this.d[7] = y4 || 0;
        this.d[8] = z1 || 0;
        this.d[9] = z2 || 0;
        this.d[10] = z3 || 1;
        this.d[11] = z4 || 0;
        this.d[12] = t1 || 0;
        this.d[13] = t2 || 0;
        this.d[14] = t3 || 0;
        this.d[15] = t4 || 1;

        this.makePerspective = function (fovy, aspect, znear, zfar) {
            var top = znear * Math.tan(fovy * Math.PI / 360.0);
            var bottom = -top;
            var left = bottom * aspect;
            var right = top * aspect;

            var X = 2 * znear / (right - left);
            var Y = 2 * znear / (top - bottom);
            var A = (right + left) / (right - left);
            var B = (top + bottom) / (top - bottom);
            var C = -(zfar + znear) / (zfar - znear);
            var D = -2 * zfar * znear / (zfar - znear);

            this.d[0] = X || 1;
            this.d[1] = 0;
            this.d[2] = 0;
            this.d[3] = 0;
            this.d[4] = 0;
            this.d[5] = Y;
            this.d[6] = 0;
            this.d[7] =  0;
            this.d[8] = A;
            this.d[9] = B;
            this.d[10] = C;
            this.d[11] = -1;
            this.d[12] = 0;
            this.d[13] = 0;
            this.d[14] = D;
            this.d[15] = 0;
        },

        this.multiply = function (m) {
            return new Matrix4x4(   this.d[0] * m.d[0] + this.d[4] * m.d[1] + this.d[8] * m.d[2] + this.d[12] * m.d[3],
                                    this.d[1] * m.d[0] + this.d[5] * m.d[1] + this.d[9] * m.d[2] + this.d[13] * m.d[3],
                                    this.d[2] * m.d[0] + this.d[6] * m.d[1] + this.d[10] * m.d[2] + this.d[14] * m.d[3],
                                    this.d[3] * m.d[0] + this.d[7] * m.d[1] + this.d[11] * m.d[2] + this.d[15] * m.d[3],

                                    this.d[0] * m.d[4] + this.d[4] * m.d[5] + this.d[8] * m.d[6] + this.d[12] * m.d[7],
                                    this.d[1] * m.d[4] + this.d[5] * m.d[5] + this.d[9] * m.d[6] + this.d[13] * m.d[7],
                                    this.d[2] * m.d[4] + this.d[6] * m.d[5] + this.d[10] * m.d[6] + this.d[14] * m.d[7],
                                    this.d[3] * m.d[4] + this.d[7] * m.d[5] + this.d[11] * m.d[6] + this.d[15] * m.d[7],

                                    this.d[0] * m.d[8] + this.d[4] * m.d[9] + this.d[8] * m.d[10] + this.d[12] * m.d[11],
                                    this.d[1] * m.d[8] + this.d[5] * m.d[9] + this.d[9] * m.d[10] + this.d[13] * m.d[11],
                                    this.d[2] * m.d[8] + this.d[6] * m.d[9] + this.d[10] * m.d[10] + this.d[14] * m.d[11],
                                    this.d[3] * m.d[8] + this.d[7] * m.d[9] + this.d[11] * m.d[10] + this.d[15] * m.d[11],

                                    this.d[0] * m.d[12] + this.d[4] * m.d[13] + this.d[8] * m.d[14] + this.d[12] * m.d[15],
                                    this.d[1] * m.d[12] + this.d[5] * m.d[13] + this.d[9] * m.d[14] + this.d[13] * m.d[15],
                                    this.d[2] * m.d[12] + this.d[6] * m.d[13] + this.d[10] * m.d[14] + this.d[14] * m.d[15],
                                    this.d[3] * m.d[12] + this.d[7] * m.d[13] + this.d[11] * m.d[14] + this.d[15] * m.d[15]
                );
        },

        this.multiplyVec3 = function(v){
                return new vec3(
                        this.d[0] * v.d[0] + this.d[4] * v.d[1] + this.d[8]  * v.d[2] + this.d[12] * 1.0,
                        this.d[1] * v.d[0] + this.d[5] * v.d[1] + this.d[9]  * v.d[2] + this.d[13] * 1.0,
                        this.d[2] * v.d[0] + this.d[6] * v.d[1] + this.d[10] * v.d[2] + this.d[14] * 1.0
                    );
        }
    };

    return Matrix4x4;
})