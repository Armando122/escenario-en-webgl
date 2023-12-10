var CG = (function(CG) {
    let g_width;

    class Octaedro extends CG.GenericGeometry {

        /**
         * Constructor de octaedro
         * @param {WebGLRenderingContext} gl contexto de render
         * @param {Number[]} color color del octaedro
         * @param {Number} width ancho del triángulo del octaedro
         * @param {Matrix4} initial_transform posición inicial del octaedro
         * @param {string} imagen imagen que se usará para la textura
         */
        constructor(gl, color, width, initial_transform, imagen) {
            g_width = (width || 1);

            super(gl, color, initial_transform, imagen);
        }

        /**
         * Función que devuelve el arreglo de vértices del octaedro
         * @returns {Number[]}
         */
        getVerticesW() {
            return [
                0,        0,        g_width, /*0*/
                g_width,  0,        0,       /*1*/
               -g_width,  0,        0,       /*2*/
                0,        g_width,  0,       /*3*/
                0,       -g_width,  0,       /*4*/
                0,        0,       -g_width  /*5*/
            ];
        }

        /**
         * Función que devuelve los vértices del octaedro explicitamente
         * @returns {Number[]}
         */
        getVertices() {
            return [
                0, g_width, 0,/*3*/ 0, 0, g_width, /*0*/ g_width, 0, 0, /*1*/
                0, g_width, 0,/*3*/ -g_width, 0, 0, /*2*/ 0, 0, g_width, /*0*/
                0, -g_width, 0, /*4*/ g_width, 0, 0, /*1*/ 0, 0, g_width, /*0*/ 
                0, -g_width, 0, /*4*/ 0, 0, g_width, /*0*/ -g_width, 0, 0, /*2*/
                0, 0, -g_width, /*5*/ 0, g_width, 0,/*3*/  g_width, 0, 0, /*1*/
                0, g_width, 0,/*3*/ 0, 0, -g_width, /*5*/ -g_width, 0, 0, /*2*/
                0, -g_width, 0, /*4*/ 0, 0, -g_width, /*5*/ g_width, 0, 0, /*1*/
                0, 0, -g_width, /*5*/ 0, -g_width, 0, /*4*/ -g_width, 0, 0, /*2*/
            ];
        }

        /**
         * Función que devuelve las caras del octaedro
         * @returns {Number[]}
         */
        getFaces() {
            return [
                3, 0, 1,
                3, 2, 0,
                4, 1, 0,
                4, 0, 2,
                5, 3, 1,
                3, 5, 2,
                4, 5, 1,
                5, 4, 2
            ];
        }

        /**
         * Función que devuelve las coordenadas uv para el mapeo de la textura de la textura
         * @returns {Number[]}
         */
        getUV() {
            let uSum = 4*g_width;
            return [
                // Cara 1
                g_width/uSum, 0.5,
                0, 0.5,
                (g_width/2)/uSum, 1,

                // Cara 2
                (2*g_width)/uSum, 0.5,
                g_width/uSum, 0.5,
                ((g_width/2)+g_width)/uSum, 1,

                // Cara 3
                (3*g_width)/uSum, 0.5,
                (2*g_width)/uSum, 0.5,
                ((2*g_width)+(g_width/2))/uSum, 1,

                // Cara 4
                1, 0.5,
                (3*g_width)/uSum, 0.5,
                ((3*g_width)+(g_width/2))/uSum, 1,

                // Cara 5
                g_width/uSum, 0.5,
                0, 0.5,
                (g_width/2)/uSum, 0,

                // Cara 6
                (2*g_width)/uSum, 0.5,
                g_width/uSum, 0.5,
                ((g_width/2)+g_width)/uSum, 0,

                // Cara 7
                (3*g_width)/uSum, 0.5,
                (2*g_width)/uSum, 0.5,
                ((2*g_width)+(g_width/2))/uSum, 0,

                // Cara 8
                1, 0.5,
                (3*g_width)/uSum, 0.5,
                ((3*g_width)+(g_width/2))/uSum, 0,
            ];
        }
    }

    CG.Octaedro = Octaedro;
    return CG;
}) (CG || {});