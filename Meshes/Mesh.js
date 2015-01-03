define(["Graphics/WebGl/GlContext"], function (gl) {
    function Mesh() {
        this.indices = [];
        this.vPos = [];
        this.vNorm = [];
        this.vertexPosBuffer = -1;
        this.vertexNormBuffer = -1;
        this.indexBuffer = -1;

        this.initVertexBuffer= function () {
            this.vertexPosBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPosBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vPos), gl.STATIC_DRAW);
        }

        this.initNormalBuffer = function () {
            this.vertexNormBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vNorm), gl.STATIC_DRAW);
        }

        this.initIndexBuffer = function () {
            this.indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
        }

        this.initBuffers = function () {
            this.initNormalBuffer();
            this.initVertexBuffer();
            this.initIndexBuffer();
        }
    }

    return Mesh;
});