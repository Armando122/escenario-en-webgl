var CG = (function(CG) {
    let MATERIAL_CACHE = {};

    class Material {
        /**
         * @param {WebGLRenderingContext} gl contexto de render
         * @param {*} vertex_shader_source_code shader de vértices que se usará
         * @param {*} fragment_shader_source_code shader de fragmentos que se usará
         */
        constructor(gl, vertex_shader_source_code, fragment_shader_source_code) {
            if (MATERIAL_CACHE[this.constructor.name]) {
                this.program = MATERIAL_CACHE[this.constructor.name];
            } else {
                this.program = CG.createProgram(
                    gl,
                    CG.createShader(gl, gl.VERTEX_SHADER, vertex_shader_source_code),
                    CG.createShader(gl, gl.FRAGMENT_SHADER, fragment_shader_source_code)
                );
                MATERIAL_CACHE[this.constructor.name] = this.program;
            }

            this.attributes = this.getAttributes(gl);
            this.uniforms = this.getUniforms(gl);
        }

        /**
         * Función que recolecta todos los atributos contenidos en el programa (shader de vértices y de fragmentos)
         * @param {*} gl Contexto de render de WebGL
         * @return Un objeto con todos los atributos de programa
         */
        getAttributes(gl) {
            let attributes = {};
            let tmp_attribute_name;

            for (let i = 0, l = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES); i < l; i++) {
                tmp_attribute_name = gl.getActiveAttrib(this.program, i).name;

                attributes[tmp_attribute_name] = gl.getAttribLocation(this.program, tmp_attribute_name);
            }

            return attributes;
        }

        /**
         * Función que recolecta todos los uniformes contenidos en el programa (shader de vértices y de fragmentos)
         * @param {*} gl Contexto de render de WebGL
         * @return Un objeto con todos los uniformes de programa
         */
        getUniforms(gl) {
            let uniforms = {};
            let tmp_uniform;

            for (let i = 0, l = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS); i < l; i++) {
                tmp_uniform = gl.getActiveUniform(this.program, i);

                uniforms[tmp_uniform.name] = gl.getUniformLocation(this.program, tmp_uniform.name);
                uniforms[tmp_uniform.name].type = tmp_uniform.type;
                uniforms[tmp_uniform.name].size = tmp_uniform.size;
            }

            return uniforms;
        }

        /**
         * Función que asigna un valor a un atributo, relacionando un buffer de datos con el atributo
         * @param {*} gl contexto de render
         * @param {*} name  nombre del atributo
         * @param {*} bufferData  buffer de datos con el que se relaciona el atributo
         * @param {*} size tamaño de elementos que debe tomar el atributo del buffer de datos
         * @param {*} type tipo de datos del buffer de datos
         * @param {*} normalized determina si los datos se normalizan
         * @param {*} stride espaciado entre la extracción de datos
         * @param {*} offset desplazamiento para obtener los datos
         */
        setAttribute(gl, name, bufferData, size, type, normalized, stride, offset) {
            let attr = this.attributes[name];

            if (attr != undefined) {
                gl.bindBuffer(gl.ARRAY_BUFFER, bufferData);
                gl.enableVertexAttribArray(attr);
                gl.vertexAttribPointer(attr, size, type, normalized, stride, offset);
            }
        }

        /**
         * Función que asigna un valor a un uniforme
         * @param {*} gl  El contexto de render de WebGL
         * @param {*} name  Nombre del uniforme
         * @param {*} data  El valor que se quiere asignar al uniforme
         */
        setUniform(gl, name, data) {
            let unif = this.uniforms[name];
  
            if (unif) {
                let type = unif.type;
                let size = unif.size;
  
                if (type === gl.FLOAT && size > 1) {
                  gl.uniform1fv(unif, data);
                }
                else if (type === gl.FLOAT && size == 1) {
                  gl.uniform1f(unif, data);
                }
                else if (type === gl.INT && size > 1) {
                  gl.uniform1iv(unif, data);
                }
                else if (type === gl.INT && size == 1) {
                  gl.uniform1i(unif, data);
                }
                else if (type === gl.SAMPLER_2D) {
                  gl.uniform1i(unif, data);
                }
                else if (type === gl.BOOL) {
                  gl.uniform1iv(unif, data);
                }
                else if (type === gl.FLOAT_VEC2) {
                  gl.uniform2fv(unif, data);
                }
                else if (type === gl.FLOAT_VEC3) {
                  gl.uniform3fv(unif, data);
                }
                else if (type === gl.FLOAT_VEC4) {
                  gl.uniform4fv(unif, data);
                }
                else if (type === gl.INT_VEC2) {
                  gl.uniform2iv(unif, data);
                }
                else if (type === gl.INT_VEC3) {
                  gl.uniform3iv(unif, data);
                }
                else if (type === gl.INT_VEC4) {
                  gl.uniform4iv(unif, data);
                }
                else if (type === gl.BOOL_VEC2) {
                  gl.uniform2iv(unif, data);
                }
                else if (type === gl.BOOL_VEC3) {
                  gl.uniform3iv(unif, data);
                }
                else if (type === gl.BOOL_VEC4) {
                  gl.uniform4iv(unif, data);
                }
                else if (type === gl.FLOAT_MAT2) {
                  gl.uniformMatrix2fv(unif, false, data);
                }
                else if (type === gl.FLOAT_MAT3) {
                  gl.uniformMatrix3fv(unif, false, data);
                }
                else if (type === gl.FLOAT_MAT4) {
                  gl.uniformMatrix4fv(unif, false, data);
                }
            }
        }
    }

    CG.Material = Material;
    return CG;
}(CG || {}));