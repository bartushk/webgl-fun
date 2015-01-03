define(["Graphics/Math/Vector3"], function (vec3) {
    function Matrix4x3(x1, x2, x3, y1, y2, y3, z1, z2, z3, t1, t2, t3) {
        this.d = new Float32Array(16);
        this.d[0] = (x1 != undefined)? x1 : 1;
        this.d[1] = (x2 != undefined)? x2 : 0;
        this.d[2] = (x3 != undefined)? x3 : 0;
        this.d[4] = (y1 != undefined)? y1 : 0;
        this.d[5] = (y2 != undefined)? y2 : 1;
        this.d[6] = (y3 != undefined)? y3 : 0;
        this.d[8] = (z1 != undefined)? z1 : 0;
        this.d[9] = (z2 != undefined)? z2 : 0;
        this.d[10] = (z3 != undefined)? z3 : 1;
        this.d[12] = (t1 != undefined)? t1 : 0;
        this.d[13] = (t2 != undefined)? t2 : 0;
        this.d[14] = (t3 != undefined) ? t3 : 0;
        this.d[15] = 1;

        this.translation = function () {
            return new vec3(this.d[12], this.d[13], this.d[14]);
        }

        this.zAxis = function () {
            return new vec3(this.d[8], this.d[9], this.d[10]);
        }

        this.yAxis = function () {
            return new vec3(this.d[4], this.d[5], this.d[6]);
        }

        this.xAxis = function () {
            return new vec3(this.d[0], this.d[1], this.d[2]);
        }

        this.setX = function (vec3) {
            this.d[0] = vec3.d[0];
            this.d[1] = vec3.d[1];
            this.d[2] = vec3.d[2];
        }

        this.setY = function (vec3) {
            this.d[4] = vec3.d[0];
            this.d[5] = vec3.d[1];
            this.d[6] = vec3.d[2];
        }

        this.setZ = function (vec3) {
            this.d[8] = vec3.d[0];
            this.d[9] = vec3.d[1];
            this.d[10] = vec3.d[2];
        }

        this.orthoNormalAxes = function () {
            var x = this.xAxis().normalize();
            var y = this.yAxis().normalize();
            var z = x.cross(y);
            this.setX(x);
            this.setY(y);
            this.setZ(z);
        }

        this.multiply = function (m) {
            return new Matrix4x3(   this.d[0] * m.d[0] + this.d[4] * m.d[1] + this.d[8] * m.d[2],
                                    this.d[1] * m.d[0] + this.d[5] * m.d[1] + this.d[9] * m.d[2],
                                    this.d[2] * m.d[0] + this.d[6] * m.d[1] + this.d[10] * m.d[2],

                                    this.d[0] * m.d[4] + this.d[4] * m.d[5] + this.d[8] * m.d[6],
                                    this.d[1] * m.d[4] + this.d[5] * m.d[5] + this.d[9] * m.d[6],
                                    this.d[2] * m.d[4] + this.d[6] * m.d[5] + this.d[10] * m.d[6],

                                    this.d[0] * m.d[8] + this.d[4] * m.d[9] + this.d[8] * m.d[10],
                                    this.d[1] * m.d[8] + this.d[5] * m.d[9] + this.d[9] * m.d[10],
                                    this.d[2] * m.d[8] + this.d[6] * m.d[9] + this.d[10] * m.d[10],

                                    this.d[0] * m.d[12] + this.d[4] * m.d[13] + this.d[8] * m.d[14] + this.d[12],
                                    this.d[1] * m.d[12] + this.d[5] * m.d[13] + this.d[9] * m.d[14] + this.d[13],
                                    this.d[2] * m.d[12] + this.d[6] * m.d[13] + this.d[10] * m.d[14] + this.d[14]);
        }

        this.vec3Mult = function (v) {
            return new vec3(
                    this.d[0] * v.d[0] + this.d[4] * v.d[1] + this.d[8] *  v.d[2],
                    this.d[1] * v.d[0] + this.d[5] * v.d[1] + this.d[9] *  v.d[2],
                    this.d[2] * v.d[0] + this.d[6] * v.d[1] + this.d[10] * v.d[2] 
                );
        }

        this.inverse = function () {
            var m = this.d;
            var retMat = new Matrix4x3();
            var inv = retMat.d;

            inv[0] = m[5] * m[10] * m[15] -
                         m[5] * m[11] * m[14] -
                         m[9] * m[6] * m[15] +
                         m[9] * m[7] * m[14] +
                         m[13] * m[6] * m[11] -
                         m[13] * m[7] * m[10];

            inv[4] = -m[4] * m[10] * m[15] +
                      m[4] * m[11] * m[14] +
                      m[8] * m[6] * m[15] -
                      m[8] * m[7] * m[14] -
                      m[12] * m[6] * m[11] +
                      m[12] * m[7] * m[10];

            inv[8] = m[4] * m[9] * m[15] -
                     m[4] * m[11] * m[13] -
                     m[8] * m[5] * m[15] +
                     m[8] * m[7] * m[13] +
                     m[12] * m[5] * m[11] -
                     m[12] * m[7] * m[9];

            inv[12] = -m[4] * m[9] * m[14] +
                       m[4] * m[10] * m[13] +
                       m[8] * m[5] * m[14] -
                       m[8] * m[6] * m[13] -
                       m[12] * m[5] * m[10] +
                       m[12] * m[6] * m[9];

            inv[1] = -m[1] * m[10] * m[15] +
                      m[1] * m[11] * m[14] +
                      m[9] * m[2] * m[15] -
                      m[9] * m[3] * m[14] -
                      m[13] * m[2] * m[11] +
                      m[13] * m[3] * m[10];

            inv[5] = m[0] * m[10] * m[15] -
                     m[0] * m[11] * m[14] -
                     m[8] * m[2] * m[15] +
                     m[8] * m[3] * m[14] +
                     m[12] * m[2] * m[11] -
                     m[12] * m[3] * m[10];

            inv[9] = -m[0] * m[9] * m[15] +
                      m[0] * m[11] * m[13] +
                      m[8] * m[1] * m[15] -
                      m[8] * m[3] * m[13] -
                      m[12] * m[1] * m[11] +
                      m[12] * m[3] * m[9];

            inv[13] = m[0] * m[9] * m[14] -
                      m[0] * m[10] * m[13] -
                      m[8] * m[1] * m[14] +
                      m[8] * m[2] * m[13] +
                      m[12] * m[1] * m[10] -
                      m[12] * m[2] * m[9];

            inv[2] = m[1] * m[6] * m[15] -
                     m[1] * m[7] * m[14] -
                     m[5] * m[2] * m[15] +
                     m[5] * m[3] * m[14] +
                     m[13] * m[2] * m[7] -
                     m[13] * m[3] * m[6];

            inv[6] = -m[0] * m[6] * m[15] +
                      m[0] * m[7] * m[14] +
                      m[4] * m[2] * m[15] -
                      m[4] * m[3] * m[14] -
                      m[12] * m[2] * m[7] +
                      m[12] * m[3] * m[6];

            inv[10] = m[0] * m[5] * m[15] -
                      m[0] * m[7] * m[13] -
                      m[4] * m[1] * m[15] +
                      m[4] * m[3] * m[13] +
                      m[12] * m[1] * m[7] -
                      m[12] * m[3] * m[5];

            inv[14] = -m[0] * m[5] * m[14] +
                       m[0] * m[6] * m[13] +
                       m[4] * m[1] * m[14] -
                       m[4] * m[2] * m[13] -
                       m[12] * m[1] * m[6] +
                       m[12] * m[2] * m[5];

            inv[3] = -m[1] * m[6] * m[11] +
                      m[1] * m[7] * m[10] +
                      m[5] * m[2] * m[11] -
                      m[5] * m[3] * m[10] -
                      m[9] * m[2] * m[7] +
                      m[9] * m[3] * m[6];

            inv[7] = m[0] * m[6] * m[11] -
                     m[0] * m[7] * m[10] -
                     m[4] * m[2] * m[11] +
                     m[4] * m[3] * m[10] +
                     m[8] * m[2] * m[7] -
                     m[8] * m[3] * m[6];

            inv[11] = -m[0] * m[5] * m[11] +
                       m[0] * m[7] * m[9] +
                       m[4] * m[1] * m[11] -
                       m[4] * m[3] * m[9] -
                       m[8] * m[1] * m[7] +
                       m[8] * m[3] * m[5];

            inv[15] = m[0] * m[5] * m[10] -
                      m[0] * m[6] * m[9] -
                      m[4] * m[1] * m[10] +
                      m[4] * m[2] * m[9] +
                      m[8] * m[1] * m[6] -
                      m[8] * m[2] * m[5];

            det = m[0] * inv[0] + m[1] * inv[4] + m[2] * inv[8] + m[3] * inv[12];

            if (det == 0)
                return new Matrix4x3();

            det = 1.0 / det;
            for (var i = 0; i < 16; i++) {
                inv[i] = inv[i] * det;
            }
            return retMat;
        }

    };


    Matrix4x3.determinant3x3 = function(a,b,c,d,e,f,g,h,i){
        return a*(e*i - f*h) - b*(d*i - f*g) + c*( d * h - e * g);
    }

    Matrix4x3.rotationX = function (rads) {
        return new Matrix4x3(
                1,0,0,
                0,Math.cos(rads), -Math.sin(rads),
                0, Math.sin(rads), Math.cos(rads),
                0,0,0
            );
    };


    Matrix4x3.rotationY = function (rads) {
        return new Matrix4x3(
                Math.cos(rads),0, Math.sin(rads),
                0, 1, 0,
                -Math.sin(rads),0, Math.cos(rads),
                0,0,0
            );
    };

    Matrix4x3.rotationZ = function (rads) {
        return new Matrix4x3(
                Math.cos(rads), -Math.sin(rads), 0,
                Math.sin(rads), Math.cos(rads), 0,
                0, 0, 1,
                0, 0, 0
            );
    };

    Matrix4x3.rotationAxis = function (ax, ay, az, rads) {
        var axis = new vec3(ax, ay, az).normalize();
        var ux = axis.d[0];
        var uy = axis.d[1];
        var uz = axis.d[2];

        return new Matrix4x3(
                Math.cos(rads) + ux * ux * ( 1- Math.cos(rads) ), ux * uy * ( 1- Math.cos(rads)) - uz * Math.sin(rads), ux*uz*(1- Math.cos(rads)) + uy * Math.sin(rads),
                uy*ux*(1- Math.cos(rads)) + uz * Math.sin(rads), Math.cos(rads) + uy*uy*(1-Math.cos(rads)), uy*uz * (1-Math.cos(rads)) - ux * Math.sin(rads),
                uz*ux*(1-Math.cos(rads)) - uy*Math.sin(rads), uz*uy*(1-Math.cos(rads)) + ux * Math.sin(rads), Math.cos(rads) + uz*uz*( 1 - Math.cos(rads) )
            );

    }

    return Matrix4x3;
});