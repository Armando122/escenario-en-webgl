var CG = (function(CG) {
    let g_width, g_width_m;
    var goldenCons = 1.6180339887;

    class Icosaedro extends CG.GenericGeometry {
        /**
         * Constructor de icosaedro
         * @param {WebGLRenderingContext} gl contexto de render
         * @param {Number[]} color color del icosaedro
         * @param {Number} width ancho de cada triángulo del icosaedro
         * @param {Matrix4} initial_transform posición inicial del icosaedro
         * @param {string} imagen dirección de la imagen que se usará como textura
         */
        constructor(gl, color, width, initial_transform, imagen) {
            g_width = (width || 1)/3;
            g_width_m = g_width*goldenCons;

            super(gl, color, initial_transform, imagen);
        }

        /**
         * Función que devuelve los vértices del icosaedro
         * @returns {Number[]}
         */
        getVerticesW() {
            return [
                0,          g_width,    g_width_m, /*0 */
                0,          g_width,   -g_width_m, /*1 */
                0,         -g_width,    g_width_m, /*2 */
                0,         -g_width,   -g_width_m, /*3 */
                g_width,    g_width_m,  0,         /*4 */
                g_width,   -g_width_m,  0,         /*5 */
               -g_width,    g_width_m,  0,         /*6 */
               -g_width,   -g_width_m,  0,         /*7 */
                g_width_m,  0,          g_width,   /*8 */
                g_width_m,  0,         -g_width,   /*9 */
               -g_width_m,  0,          g_width,   /*10*/
               -g_width_m,  0,         -g_width    /*11*/
            ];
        }

        /**
         * Función que devuelve los vértices del icosaedro explicitamente
         * @returns {Number[]}
         */
        getVertices() {
            return [ 
                -g_width_m,0,g_width, /*10*/ 0,-g_width,g_width_m, /*2 */ 0,g_width,g_width_m,  /*0 */    
                0,g_width,g_width_m,  /*0 */ 0,-g_width,g_width_m, /*2 */ g_width_m,  0,g_width,/*8 */    
                g_width_m,  0,g_width,/*8 */ 0,-g_width,g_width_m, /*2 */ g_width,-g_width_m,0, /*5 */    
                g_width,-g_width_m,0, /*5 */ 0,-g_width,g_width_m, /*2 */ -g_width,-g_width_m,0,/*7 */    
                -g_width,-g_width_m,0,/*7 */ 0,-g_width,g_width_m, /*2 */ -g_width_m,0,g_width, /*10*/    
                -g_width,g_width_m,0, /*6 */ -g_width_m,0,g_width, /*10*/ 0,g_width,g_width_m,  /*0 */    
                -g_width_m,0,-g_width,/*11*/ -g_width_m,0,g_width, /*10*/ -g_width,g_width_m,0, /*6 */    
                -g_width,-g_width_m,0,/*7 */ -g_width_m,0,g_width, /*10*/ -g_width_m,0,-g_width,/*11*/    
                -g_width,-g_width_m,0,/*7 */ -g_width_m,0,-g_width,/*11*/ 0,-g_width,-g_width_m,/*3 */    
                g_width,-g_width_m,0, /*5 */ -g_width,-g_width_m,0,/*7 */ 0,-g_width,-g_width_m,/*3 */    
                g_width_m,0,-g_width, /*9 */ g_width,-g_width_m,0, /*5 */ 0,-g_width,-g_width_m,/*3 */    
                g_width_m,  0,g_width,/*8 */ g_width,-g_width_m,0, /*5 */ g_width_m,0,-g_width, /*9 */    
                g_width,g_width_m,0,  /*4 */ g_width_m,  0,g_width,/*8 */ g_width_m,0,-g_width, /*9 */    
                0,g_width,g_width_m,  /*0 */ g_width_m,  0,g_width,/*8 */ g_width,g_width_m,0,  /*4 */    
                -g_width,g_width_m,0, /*6 */ 0,g_width,g_width_m,  /*0 */ g_width,g_width_m,0,  /*4 */    
                -g_width_m,0,-g_width,/*11*/ 0,g_width,-g_width_m, /*1 */ 0,-g_width,-g_width_m,/*3 */    
                -g_width,g_width_m,0, /*6 */ 0,g_width,-g_width_m, /*1 */ -g_width_m,0,-g_width,/*11*/    
                g_width,g_width_m,0,  /*4 */ 0,g_width,-g_width_m, /*1 */  -g_width,g_width_m,0, /*6 */   
                g_width_m,0,-g_width, /*9 */ 0,g_width,-g_width_m, /*1 */ g_width,g_width_m,0,  /*4 */    
                0,-g_width,-g_width_m,/*3 */ 0,g_width,-g_width_m, /*1 */ g_width_m,0,-g_width, /*9 */    
            ];
        }
        

        /**
         * Función que devuelve las caras del icosaedro
         * @returns {Number[]}
         */
        getFaces() {
            return [
                10, 2, 0, 
                0, 2, 8,
                8, 2, 5,
                5, 2, 7,
                7, 2, 10,
                6, 10, 0,
                11, 10, 6,
                7, 10, 11,
                7, 11, 3,
                5, 7, 3,
                9, 5, 3,
                8, 5, 9,
                4, 8, 9,
                0, 8, 4,
                6, 0, 4,
                11, 1, 3,
                6, 1, 11,
                4, 1, 6,
                9, 1, 4,
                3, 1, 9
            ];
        }

        /**
         * Función que devuelve las coordenas uv para el mapeo de la textura
         * @returns {Number[]}
         */
        getUV() {
            return [
                // Cara 1
                3/11, 2/3,
                1/11, 2/3,
                2/11, 1,

                // Cara 2
                2/11, 1/3,
                1/11, 2/3,
                3/11, 2/3,

                // Cara 3
                2/11, 1/3,
                0, 1/3,
                1/11, 2/3,

                // Cara 4
                1/11, 0,
                0, 1/3,
                2/11, 1/3,

                // Cara 5
                5/11, 2/3,
                3/11, 2/3,
                4/11, 1,

                // Cara 6
                4/11, 1/3,
                3/11, 2/3,
                5/11, 2/3,

                // Cara 7
                4/11, 1/3,
                2/11, 1/3,
                3/11, 2/3,

                // Cara 8
                3/11, 0,
                2/11, 1/3,
                4/11, 1/3,

                // Cara 9
                7/11, 2/3,
                5/11, 2/3,
                6/11, 1,

                // Cara 10
                6/11, 1/3,
                5/11, 2/3,
                7/11, 2/3,

                // Cara 11
                6/11, 1/3,
                4/11, 1/3,
                5/11, 2/3,

                // Cara 12
                5/11, 0,
                4/11, 1/3,
                6/11, 1/3,

                // Cara 13
                9/11, 2/3,
                7/11, 2/3,
                8/11, 1,

                // Cara 14
                8/11, 1/3,
                7/11, 2/3,
                9/11, 2/3,

                // Cara 15
                8/11, 1/3,
                6/11, 1/3,
                7/11, 2/3,

                // Cara 16
                7/11, 0,
                6/11, 1/3,
                8/11, 1/3,

                // Cara 17
                1, 2/3,
                9/11, 2/3,
                10/11, 1,

                // Cara 18
                10/11, 1/3,
                9/11, 2/3,
                1, 2/3,

                // Cara 19
                10/11, 1/3,
                8/11, 1/3,
                9/11, 2/3,

                // Cara 20
                9/11, 0,
                8/11, 1/3,
                10/11, 1/3
            ];
        }
    }

    CG.Icosaedro = Icosaedro;
    return CG;
}) (CG || {});