define(["Graphics/WebGl/GlContext", "Graphics/Math/Vector3", "Graphics/Math/Matrix4x3", "Graphics/Math/Matrix4x4", "Graphics/WebGl/GlobalGlMatrixState"], function (gl, vec3, mat43, mat44, glMats) {
    var utils = {
        resizeScreen : function(width, height)
        {
            var perMat = new mat44();
            perMat.makePerspective(45, width / height, 0.01, 100);
            glMats.PerspectiveMatrix = perMat;
            var c = document.getElementById('glCanvas');
            var gl = glCanvas.getContext("webgl");
            if (!gl) {
                gl = glCanvas.getContext("experimental-webgl");
            }
            if (!gl) {
                alert("Your browser does not support WebGL");
                return;
            }
            gl.canvasElement = c;
            gl.canvasWidth = c.width;
            gl.canvasHeight = c.height;
            gl.enable(gl.DEPTH_TEST);
            gl.enable(gl.CULL_FACE);
            gl.clearColor(0.0, 0.0, 0.0, 1);
            gl.viewport(0, 0, width, height);
        },
        createShader : function(str, type){
            var shader = gl.createShader(type);
            gl.shaderSource(shader, str);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                throw gl.getShaderInfoLog(shader);
            }
            return shader;
        },

        createShaderProgram : function(vertexShader, fragmentShader){
            var program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                throw gl.getProgramInfoLog(program);
            }
            return program;
        },

        getNormalizedScreenCoords: function (actor) {
            var tmpVec = glMats.projectionMatrix.multiply(glMats.viewMatrix).multiply(actor.worldMatrix).multiplyVec3(new vec3(0, 0, 0));
            return {x: tmpVec.d[0]/tmpVec.d[2], y:tmpVec.d[1]/tmpVec.d[2]};
        },

        calculateSphereBuffers : function(rings, sectors){

            var R = 1 / (rings - 1);
            var S = 1 / (sectors - 1);

            var indices = [];
            var normals = [];
            var vertices = [];

            var pitwo = Math.PI / 2.0;
            var twopi = Math.PI * 2;
            var negpitwo = pitwo * -1;

            for (var r = 0; r < rings; r++) for (var s = 0; s < sectors; s++) {
                var y = Math.sin(negpitwo + Math.PI * r * R);
                var x = Math.cos(twopi * s * S) * Math.sin( Math.PI * r * R);
                var z = Math.sin(twopi * s * S) * Math.sin( Math.PI * r * R);

                vertices.push(x * 0.5);
                vertices.push(y * 0.5);
                vertices.push(z * 0.5);

                normals.push(x);
                normals.push(y);
                normals.push(z);

            }

            for (var r = 0; r < rings - 1; r++) for (s = 0; s < sectors - 1; s++) {
                indices.push(r * sectors + s);
                indices.push((r + 1) * sectors + s);
                indices.push(r * sectors + (s + 1));

                indices.push(r * sectors + (s + 1));
                indices.push((r + 1) * sectors + s);
                indices.push((r + 1) * sectors + (s + 1));
            }

            return { 'indices': indices, 'vertices': vertices, 'normals': normals };
        },

        calculateCylinderBuffers: function (r) {
            var indices = [];
            var normals = [];
            var vertices = [];
            var twopi = Math.PI * 2;

            //push top center
            vertices.push(0);
            vertices.push(0.5);
            vertices.push(0);
            normals.push(0);
            normals.push(1);
            normals.push(0);
            //push bottom center
            vertices.push(0);
            vertices.push(-0.5);
            vertices.push(0);
            normals.push(0);
            normals.push(-1);
            normals.push(0);
            //push vertices and indices
            //TODO: This is trash
            for (var i = 0; i < r; i++) {
                var p1Val = i;
                var p2Val = (i+1) % r;
                var p1x = Math.cos((p1Val / r) * twopi) / 2;
                var p1z = Math.sin((p1Val / r) * twopi) / 2;
                var p2x = Math.cos((p2Val / r) * twopi) / 2;
                var p2z = Math.sin((p2Val / r) * twopi) / 2;

                //push cylinder top fragment
                vertices.push(p1x);
                vertices.push(0.5);
                vertices.push(p1z);
                vertices.push(p2x);
                vertices.push(0.5);
                vertices.push(p2z);

                normals.push(0);
                normals.push(1);
                normals.push(0);
                normals.push(0);
                normals.push(1);
                normals.push(0);

                indices.push(0);
                indices.push(i * 8 + 3);
                indices.push(i * 8 + 2);

                //push cylinder bottom fragment
                vertices.push(p1x);
                vertices.push(-0.5);
                vertices.push(p1z);
                vertices.push(p2x);
                vertices.push(-0.5);
                vertices.push(p2z);

                normals.push(0);
                normals.push(-1);
                normals.push(0);
                normals.push(0);
                normals.push(-1);
                normals.push(0);

                indices.push(1);
                indices.push(i * 8 + 4);
                indices.push(i * 8 + 5);

                //push cylinder side fragment
                vertices.push(p1x);
                vertices.push(0.5);
                vertices.push(p1z);
                vertices.push(p2x);
                vertices.push(0.5);
                vertices.push(p2z);
                vertices.push(p1x);
                vertices.push(-0.5);
                vertices.push(p1z);
                vertices.push(p2x);
                vertices.push(-0.5);
                vertices.push(p2z);

                normals.push(p1x);
                normals.push(0);
                normals.push(p1z);
                normals.push(p2x);
                normals.push(0);
                normals.push(p2z);
                normals.push(p1x);
                normals.push(0);
                normals.push(p2z);
                normals.push(p2x);
                normals.push(0);
                normals.push(p2z);

                indices.push(i * 8 + 6);
                indices.push(i * 8 + 7);
                indices.push(i * 8 + 8);
                indices.push(i * 8 + 8);
                indices.push(i * 8 + 7);
                indices.push(i * 8 + 9);

            }

            return { 'indices': indices, 'vertices': vertices, 'normals': normals };
        },


        calculateConeBuffers: function (r) {
            var indices = [];
            var normals = [];
            var vertices = [];
            var twopi = Math.PI * 2;

            //push bottom center
            vertices.push(0);
            vertices.push(0);
            vertices.push(0);
            normals.push(0);
            normals.push(-1);
            normals.push(0);
            //push top center
            vertices.push(0);
            vertices.push(1);
            vertices.push(0);
            normals.push(0);
            normals.push(1);
            normals.push(0);
            //push vertices and indices
            //TODO: This is trash too
            for (var i = 0; i < r; i++) {
                var p1Val = i;
                var p2Val = (i + 1) % r;
                var p1x = Math.cos((p1Val / r) * twopi) / 2;
                var p1z = Math.sin((p1Val / r) * twopi) / 2;
                var p2x = Math.cos((p2Val / r) * twopi) / 2;
                var p2z = Math.sin((p2Val / r) * twopi) / 2;

                //push cone bottom fragment
                vertices.push(p1x);
                vertices.push(0);
                vertices.push(p1z);
                vertices.push(p2x);
                vertices.push(0);
                vertices.push(p2z);

                normals.push(0);
                normals.push(-1);
                normals.push(0);
                normals.push(0);
                normals.push(-1);
                normals.push(0);

                indices.push(0);
                indices.push(i * 4 + 2);
                indices.push(i * 4 + 3);

                //push cone side fragment
                vertices.push(p1x);
                vertices.push(0);
                vertices.push(p1z);
                vertices.push(p2x);
                vertices.push(0);
                vertices.push(p2z);

                normals.push(p1x);
                normals.push(0);
                normals.push(p2z);
                normals.push(p2x);
                normals.push(0);
                normals.push(p2z);

                indices.push(1);
                indices.push(i * 4 + 5);
                indices.push(i * 4 + 4);

            }

            return { 'indices': indices, 'vertices': vertices, 'normals': normals };
        },


        //TODO: This is the trashest
        calculateBuffersFromFunction: function (slices, segments, r, from, to, func) {
            var self = this;
            var indices = [];
            var normals = [];
            var vertices = [];
            var offsets = [];
            var twopi = Math.PI * 2;
            var circleOffsets = [];

            for (var i = 0; i < slices; i++) {
                circleOffsets.push(Math.cos((i / slices) * twopi) * r);
                circleOffsets.push(Math.sin((i / slices) * twopi) * r);
            }

            var itr = 0
            var indexCount = 0;
            var vertexMap = {};
            var range = to - from;
            for (var i = 0; i < segments; i++) {
                var xVal1 = from + (i / segments) * range;
                var xVal2 = from + (((i + 1) % (segments + 1)) / segments) * range;

                var rot1 = mat43.rotationZ(-Math.atan2(this.derivative(func, xVal1), 1) );
                var rot2 = mat43.rotationZ(-Math.atan2(this.derivative(func, xVal2), 1) );

                for (var j = 0; j < slices; j++) {
                    var p1Val = j;
                    var p2Val = (j + 1) % slices;
                    var yOff1 = func(xVal1);
                    var yOff2 = func(xVal2);
                    var vert1 = new vec3();
                    var vert2 = new vec3();
                    var vert3 = new vec3();
                    var vert4 = new vec3();
                    var o1 = rot1.vec3Mult(new vec3(0, circleOffsets[p1Val * 2], circleOffsets[p1Val * 2 + 1]));
                    var o2 = rot1.vec3Mult(new vec3(0, circleOffsets[p2Val * 2], circleOffsets[p2Val * 2 + 1]));
                    var o3 = rot2.vec3Mult(new vec3(0, circleOffsets[p1Val * 2], circleOffsets[p1Val * 2 + 1]));
                    var o4 = rot2.vec3Mult(new vec3(0, circleOffsets[p2Val * 2], circleOffsets[p2Val * 2 + 1]));

                    vert1.d[0] = o1.d[0] + xVal1;
                    vert1.d[1] = o1.d[1] + yOff1;
                    vert1.d[2] = o1.d[2];

                    vert2.d[0] = o2.d[0] + xVal1;
                    vert2.d[1] = o2.d[1] + yOff1;
                    vert2.d[2] = o2.d[2];

                    vert3.d[0] = o3.d[0] + xVal2;
                    vert3.d[1] = o3.d[1] + yOff2;
                    vert3.d[2] = o3.d[2];

                    vert4.d[0] = o4.d[0] + xVal2;
                    vert4.d[1] = o4.d[1] + yOff2;
                    vert4.d[2] = o4.d[2];

                    var norm1 = vert2.subtract(vert1).cross(vert3.subtract(vert1)).normalize();
                    var norm2 = vert4.subtract(vert2).cross(vert1.subtract(vert2)).normalize();
                    var norm3 = vert1.subtract(vert3).cross(vert4.subtract(vert3)).normalize();
                    var norm4 = vert3.subtract(vert4).cross(vert2.subtract(vert4)).normalize();


                    //Should be combining these different normals.
                    if (!vertexMap[vert1.key()]) {
                        vertices.push(xVal1);
                        vertices.push(yOff1);
                        vertices.push(0);
                        normals.push(norm1.d[0]);
                        normals.push(norm1.d[1]);
                        normals.push(norm1.d[2]);
                        offsets.push(o1.d[0]);
                        offsets.push(o1.d[1]);
                        offsets.push(o1.d[2]);
                        vertexMap[vert1.key()] = indexCount;
                        indexCount++;
                    }
                    if (!vertexMap[vert2.key()]) {
                        vertices.push(xVal1);
                        vertices.push(yOff1);
                        vertices.push(0);
                        normals.push(norm2.d[0]);
                        normals.push(norm2.d[1]);
                        normals.push(norm2.d[2]);
                        offsets.push(o2.d[0]);
                        offsets.push(o2.d[1]);
                        offsets.push(o2.d[2]);
                        vertexMap[vert2.key()] = indexCount;
                        indexCount++;
                    }
                    if (!vertexMap[vert3.key()]) {
                        vertices.push(xVal2);
                        vertices.push(yOff2);
                        vertices.push(0);
                        normals.push(norm3.d[0]);
                        normals.push(norm3.d[1]);
                        normals.push(norm3.d[2]);
                        offsets.push(o3.d[0]);
                        offsets.push(o3.d[1]);
                        offsets.push(o3.d[2]);
                        vertexMap[vert3.key()] = indexCount;
                        indexCount++;
                    }
                    if (!vertexMap[vert4.key()]) {
                        vertices.push(xVal2);
                        vertices.push(yOff2);
                        vertices.push(0);
                        normals.push(norm4.d[0]);
                        normals.push(norm4.d[1]);
                        normals.push(norm4.d[2]);
                        offsets.push(o4.d[0]);
                        offsets.push(o4.d[1]);
                        offsets.push(o4.d[2]);
                        vertexMap[vert4.key()] = indexCount;
                        indexCount++;
                    }

                    indices.push(vertexMap[vert1.key()]);
                    indices.push(vertexMap[vert2.key()]);
                    indices.push(vertexMap[vert3.key()]);
                    indices.push(vertexMap[vert3.key()]);
                    indices.push(vertexMap[vert2.key()]);
                    indices.push(vertexMap[vert4.key()]);
                    itr++;
                }
            }

            return { 'indices': indices, 'vertices': vertices, 'normals': normals, 'offsets':offsets };
        },
        derivative: function (func, x) {
            var x2 = x + 0.0001;
            var y1 = func(x);
            var y2 = func(x2);
            return (y2 - y1)/(x2 - x);
        }


        
    }


    return utils;
});