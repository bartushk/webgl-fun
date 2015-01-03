//define(["Graphics/WebGl/GlContext", "Graphics/Utils/GlUtils"], function (gl, utils) {
//    var shaderString =
//        'precision mediump float;' +
//        'uniform vec3 visColor;'+
//        'varying vec4 vWorldSpaceNormal;' +
//        'void main() {' +
//            'vec4 col = vec4(visColor,1);'+
//            'vec3 lightDir = normalize(vec3(0.0,0.0,1.0));' +
//            'float diffuse = dot(vec3(vWorldSpaceNormal.x,vWorldSpaceNormal.y,vWorldSpaceNormal.z), lightDir);' +
//            'if(diffuse < 0.0) diffuse = 0.0;'+
//            'float ambient = 0.3;' +
//            'float light = ambient + diffuse;' +
//            'if( light > 1.0) light = 1.0;' + 
//            'gl_FragColor = vec4(col.r*light, col.g*light, col.b*light, 1);' +
//        '}';
//    return utils.createShader(shaderString, gl.FRAGMENT_SHADER);
//});

define(["Graphics/WebGl/GlContext", "Graphics/Utils/GlUtils"], function (gl, utils) {
    var shaderString =
        'precision mediump float;' +
        'uniform vec3 visColor;' +
        'uniform vec3 camPos;' +
        'varying vec4 vWorldSpaceNormal;' +
        'varying vec3 fragPos;' +
        'void main() {' +
            'vec3 surfaceToCamera = normalize(vec3(-camPos.x,camPos.y,camPos.z) - fragPos);' +
            'float diffuse = dot(vec3(vWorldSpaceNormal.x,vWorldSpaceNormal.y,vWorldSpaceNormal.z), -surfaceToCamera);' +
            'if(diffuse < 0.0) diffuse = 0.0;' +
            'float ambient = 0.3;' +
            'float specularCoe = 0.0;' +
            //'if(diffuse > 0.0)' +
            //'   specularCoe = pow(max(0.0, dot(surfaceToCamera,reflect(-surfaceToCamera,vec3(vWorldSpaceNormal)))), 5.0);' +
            'vec3 specular = specularCoe * vec3(1.0,1.0,1.0);'+
            'float light = ambient + diffuse;' +
            'if( light > 1.0) light = 1.0;' +
            'vec4 color = vec4(visColor.r*light + specular.r, visColor.g*light + specular.g, visColor.b*light + specular.b, 1);' +
            'if(color.r > 1.0) color.r = 1.0;' +
            'if(color.g > 1.0) color.g = 1.0;' +
            'if(color.b > 1.0) color.b = 1.0;' +
            'gl_FragColor = color;' +
        '}';
    return utils.createShader(shaderString, gl.FRAGMENT_SHADER);
});
