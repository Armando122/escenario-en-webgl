/**
 * Abstracción para las figuras utilizadas
 */
var CG = (function(CG) {

    class GenericGeometry {
        
        /**
         * Constructor
         * @param {WebGLRenderingContext} gl contexto de render
         * @param {Number[]} color color de la figura
         * @param {Matrix4} initial_transform posición inicial de la figura
         * @param {string} imagen Dirección de la imagen que se usará para el mapeo de textura
         */
        constructor(gl, color = [0,0,0,1], initial_transform = new CG.Matrix4(), imagen) {
            this.smooth = false;
            this.color = color;
            this.initial_transform = initial_transform;
            this.flatNumElems = 0;
            this.smoothNumElems = 0;
            let pixeles = new Uint8Array([this.color[0]*255, this.color[1]*255, this.color[2]*255, 255]);
            this.imagen = imagen;          
            
            this.texture = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            
            gl.texImage2D(
              gl.TEXTURE_2D, 
              0,
              gl.RGBA,
              1,
              1,
              0,
              gl.RGBA, gl.UNSIGNED_BYTE, pixeles
            );
            
            if (this.imagen) {
              gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.imagen);
              gl.generateMipmap(gl.TEXTURE_2D);
            }

            // Cálculo de buffers
            let smooth_vertices = this.getVerticesW();

            let faces = this.getFaces();
            let flat_vertices = this.getVertices();
            let uVMap = this.getUV();

            // triángulos ordenados en el buffer
            this.flatPositionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.flatPositionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(flat_vertices), gl.STATIC_DRAW);
        
            // triángulos indexados
            this.smoothPositionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.smoothPositionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(smooth_vertices), gl.STATIC_DRAW);

            /* Coordenadas UV */
            this.UVBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.UVBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uVMap), gl.STATIC_DRAW);
        
            // Índices correspondientes
            this.indicesBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faces), gl.STATIC_DRAW);
        
            // normales para drawArray
            let flat_normals = this.getFlatNormals(flat_vertices);
            this.flatNormalBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.flatNormalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(flat_normals), gl.STATIC_DRAW);
        
            // normales para drawElements
            let smooth_normals = this.getSmoothNormals(smooth_vertices, faces);
            this.smoothNormalBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.smoothNormalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(smooth_normals), gl.STATIC_DRAW);
        
            this.flatNumElements = flat_vertices.length/3;
            this.smoothNumElements = faces.length;
        }
        
        /**
         * Función de dibujado de la figura
         * @param {gl} gl  El contexto de render
         * @param {Material} material Material que se utilizará para dibujar el objeto
         * @param {Matrix4} projectionMatrix  Matriz de transformación de proyección
         * @param {Matrix4} viewMatrix  Matriz de transformación de la vista
         * @param {Vector4} light_pos Posición de la luz
         * @param {Number} coef_env valor del coeficiente ambiental
         * @param {Number} coef_dif valor del coeficiente difuso
         * @param {Number} alpha_s valor alfa de brillo especular
         */
        draw(gl, material = new CG.DiffuseMaterial(gl), projectionMatrix, viewMatrix, light_pos, coef_env, coef_dif, coef_espec, alpha_s) {

          this.material = material;
          gl.useProgram(this.material.program);

          // Coordenadas UV
          this.material.setAttribute(gl, "a_texcoord", this.UVBuffer, 2, gl.FLOAT, false, 0, 0);

          this.material.setUniform(gl, "l_a", [this.color[0],this.color[1], this.color[2]]);
          this.material.setUniform(gl, "k_a", coef_env);

          this.material.setUniform(gl, "l_d", [this.color[0], this.color[1], this.color[2]]);
          this.material.setUniform(gl, "k_d", coef_dif)
      
          this.material.setUniform(gl, "u_color", this.color);

          this.material.setUniform(gl, "u_light_position", [light_pos.x, light_pos.y, light_pos.z]);

          // el color de la luz
          this.material.setUniform(gl, "l_s", [1,1,1]);
          this.material.setUniform(gl, "alpha_s", alpha_s);
          this.material.setUniform(gl, "k_s", coef_espec);

          let viewModelMatrix = CG.Matrix4.multiply(viewMatrix, this.initial_transform);
          this.material.setUniform(gl, "u_VM_matrix", viewModelMatrix.toArray());

          let projectionViewModelMatrix = CG.Matrix4.multiply(projectionMatrix, viewModelMatrix);
          this.material.setUniform(gl, "u_PVM_matrix", projectionViewModelMatrix.toArray());

          
          gl.bindTexture(gl.TEXTURE_2D, this.texture);
          this.material.setUniform(gl, "u_texture", 0);

          if (this.smooth && (this.smoothNumElements>0)) {
            this.material.setAttribute(gl, "a_position", this.smoothPositionBuffer, 3, gl.FLOAT, false, 0, 0);
            
            this.material.setAttribute(gl, "a_normal", this.smoothNormalBuffer, 3, gl.FLOAT, false, 0, 0);
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
            gl.drawElements(gl.TRIANGLES, this.smoothNumElements, gl.UNSIGNED_SHORT, 0);
          } else {
            this.material.setAttribute(gl, "a_position", this.flatPositionBuffer, 3, gl.FLOAT, false, 0, 0);
          
            this.material.setAttribute(gl, "a_normal", this.flatNormalBuffer, 3, gl.FLOAT, false, 0, 0);
          
            gl.drawArrays(gl.TRIANGLES, 0, this.flatNumElements);
          }
        }

        /**
         * Función que dibuja la figura utilizando el modo wireframe
         * @param {gl} gl  El contexto de render
         * @param {Matrix4} projectionViewMatrix  Matriz de transformación de proyección y la vista
         */
        drawWireframe(gl, projectionViewMatrix) {
          let vertices = this.getVerticesW();
          let faces = this.getFaces();
          
          let wMaterial = new CG.WireframeMaterial(gl);
          gl.useProgram(wMaterial.program);

          // triángulos ordenados en el buffer
          let positionBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

          // los índices correspondientes
          let indexBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faces), gl.STATIC_DRAW);

          let num_elementsL = faces.length;

          wMaterial.setAttribute(gl, "a_position_w", positionBuffer, 3, gl.FLOAT, false, 0, 0);
          
          let projectionViewModelMatrix = CG.Matrix4.multiply(projectionViewMatrix, this.initial_transform);
          wMaterial.setUniform(gl, "u_PVM_matrix_w", projectionViewModelMatrix.toArray());
          
          wMaterial.setUniform(gl, "u_color_w", [0,0,0,1]);

          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
          gl.drawElements(gl.LINE_STRIP, num_elementsL, gl.UNSIGNED_SHORT, 0);
        }
        
        /**
         * Función que devuelve las normales del objeto para una representación plana
         * @param {*} vertices 
         * @returns {Number[]}
         */
        getFlatNormals(vertices) {
          let normals = [];
          let v1 = new CG.Vector3();
          let v2 = new CG.Vector3();
          let v3 = new CG.Vector3();
          let n;

          // Se reconstruyen los vértices a partir del arreglo recibido
          for (let i = 0; i < vertices.length; i+=9) {
            v1.set(vertices[i  ], vertices[i+1], vertices[i+2]);
            v2.set(vertices[i+3], vertices[i+4], vertices[i+5]);
            v3.set(vertices[i+6], vertices[i+7], vertices[i+8]);
            // Se calcula la normal
            n = CG.Vector3.cross(CG.Vector3.substract(v1, v2), CG.Vector3.substract(v2, v3)).normalize();
            normals.push(
              n.x, n.y, n.z,
              n.x, n.y, n.z,
              n.x, n.y, n.z
            );
          }

          return normals;
        }

        /**
         * Función para obtener las normales para la representación suavizada
         * @param {*} vertices 
         * @param {*} faces 
         * @returns {Number[]}
         */
        getSmoothNormals(vertices, faces) {
          let normals = [];
          let v1 = new CG.Vector3();
          let v2 = new CG.Vector3();
          let v3 = new CG.Vector3();
          let i1, i2, i3;
          let tmp = new CG.Vector3();
          let n;
        
          for (let i=0; i<faces.length; i+=3) {
            // Se obtienen los vértices de cada triángulo y se cálcula la normal
            i1 = faces[i  ]*3;
            i2 = faces[i+1]*3;
            i3 = faces[i+2]*3;
        
            v1.set( vertices[i1], vertices[i1 + 1], vertices[i1 + 2] );
            v2.set( vertices[i2], vertices[i2 + 1], vertices[i2 + 2] );
            v3.set( vertices[i3], vertices[i3 + 1], vertices[i3 + 2] );
            n = CG.Vector3.cross(CG.Vector3.substract(v1, v2), CG.Vector3.substract(v2, v3)).normalize();
            
            // Se obtiene un vector temporal que contiene la normal de cada vértice y se suma a la normal obtenida
            // para que apunte en la misma dirección
            tmp.set( normals[i1], normals[i1+1], normals[i1+2] );
            tmp = CG.Vector3.add(tmp, n);
            normals[i1  ] = tmp.x;
            normals[i1+1] = tmp.y;
            normals[i1+2] = tmp.z;
        
            tmp.set( normals[i2], normals[i2+1], normals[i2+2] );
            tmp = CG.Vector3.add(tmp, n);
            normals[i2  ] = tmp.x;
            normals[i2+1] = tmp.y;
            normals[i2+2] = tmp.z;
        
            tmp.set( normals[i3], normals[i3+1], normals[i3+2] );
            tmp = CG.Vector3.add(tmp, n);
            normals[i3  ] = tmp.x;
            normals[i3+1] = tmp.y;
            normals[i3+2] = tmp.z;
          }
        
          // Se normalizan las normales para que sean unitarias
          for (let i=0; i<normals.length; i+=3) {
            tmp.set(normals[i], normals[i+1], normals[i+2]);
            tmp = tmp.normalize();
            normals[i  ] = tmp.x;
            normals[i+1] = tmp.y;
            normals[i+2] = tmp.z;
          }
        
          return normals;
        }
    }

    CG.GenericGeometry = GenericGeometry;
    return CG;
}(CG || {}));