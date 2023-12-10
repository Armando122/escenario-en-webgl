var CG = (function(CG) {
    let g_radius, g_height, g_Nu, g_Nv;

    class Cilindro extends CG.GenericGeometry {
        /**
         * Constructor de cilindro
         * @param {WebGLRenderingContext} gl Contexto de render
         * @param {Number[]} color color del cilindro
         * @param {Number} radius radio del cilindro
         * @param {Number} height altura del cilindro
         * @param {Number} Nu Número de divisiones horizontales
         * @param {Number} Nv Número de divisiones verticales
         * @param {Matrix4} initial_transform Posición inicial del cilindro
         * @param {string} imagen Dirección de la imagen que se usará como textura
         */
        constructor(gl, color, radius, height, Nu, Nv, initial_transform, imagen) {
            g_radius = (radius || 1);
            g_height = (height || 1);
            g_Nu = Nu || 2;
            g_Nv = Nv || 2;

            super(gl, color, initial_transform, imagen);
        }

        /**
         * Función que devuelve los vértices del cilindro
         * @return {Number[]}
         */
        getVerticesW() {
            let vertices = [];

            for (let i = 0; i < g_Nv+1; i++) {
                for (let j = 0; j < g_Nu; j++) {
                  vertices.push(
                    g_radius * Math.cos(j*2*Math.PI/g_Nu),
                    -g_height + i*2*g_height/g_Nv,
                    g_radius * Math.sin(j*2*Math.PI/g_Nu));
                }
            }
            
            return vertices;
        }

        /**
         * Función que devuelve los vértices del cilindro explicitamente
         * @return {Number[]}
         */
        getVertices() {
            let verticesW = this.getVerticesW();
            let faces = this.getFaces();
            let vertices = [];

            for (let i = 0; i < faces.length; i++) {
                let cara = faces[i];
                // Construimos la cara
                let j = 3 * cara;
                vertices.push(
                    verticesW[j  ],
                    verticesW[j+1],
                    verticesW[j+2]
                    );
            }

            return vertices;
        }

        /**
         * Función que devuelve las caras del cilindro
         * @return {Number[]}
         */
        getFaces() {
            let faces = [];

            for (let i = 0; i < g_Nv-1; i++) {
                for (let j = 0; j < g_Nu; j++) {
                  faces.push(
                    // Triángulo 1
                    j +i*g_Nu,  
                    (j+1)%g_Nu +(i+1)*g_Nu,
                    (j+1)%g_Nu +i*g_Nu,

                    // Triángulo 2
                    j +(i+1)*g_Nu,
                    (j+1)%g_Nu +(i+1)*g_Nu,
                    j +i*g_Nu
                    );
                }
            }
            
            return faces;
        }

        /**
         * Función que devuelve las coordenas uv para el mapeo de texturas
         * @return {Number[]}
         */
        getUV() {
            let mapeo = [];
  
            for (let i = 0; i < g_Nv; i++) {
                for (let j = 0; j < g_Nu; j++) {
                    mapeo.push(
                        // Coordenadas UV triángulo 1
                        j/g_Nu, 1-((i+1)/g_Nv),
                        (j+1)/g_Nu, 1-(i/g_Nv),
                        (j+1)/g_Nu, 1-(i+1)/g_Nv,

                        // Coordenadas UV triángulo 2
                        j/g_Nu, 1-(i/g_Nv),
                        (j+1)/g_Nu, 1-(i/g_Nv),
                        j/g_Nu, 1-((i+1)/g_Nv),
                    );
                }
            }
  
            return mapeo;
        }
    }

    CG.Cilindro = Cilindro;
    return CG;
}) (CG || {});