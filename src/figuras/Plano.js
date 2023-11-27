var CG = (function(CG) {
    let g_width, g_length;

    class Plano extends CG.GenericGeometry {

        /**
         * @param {WebGLRenderingContext} gl
         * @param {Number[]} color
         * @param {Number} width
         * @param {Number} length
         * @param {Matrix4} initial_transform
         */
        constructor(gl, color, width, length, initial_transform) {
            g_width = (width || 1);
            g_length = (length || 1);

            super(gl, color, initial_transform);
        }

        /**
         * Función que devuelve el arreglo de vértices del plano
         * @return {[Number]}
         */
        getVerticesW() {
            return [
                 g_width,  0,   g_length,  /*0*/
                 g_width,  0,  -g_length,  /*1*/
                -g_width,  0,   g_length,  /*2*/
                -g_width,  0,  -g_length,  /*3*/
            ];
        }

        /**
         * Función que devuelve los vértices del plano de forma explicita
         * @return {[Number]}
         */
        getVertices() {
            return [
                g_width,  0,  -g_length,  /*1*/
                -g_width,  0,  -g_length,  /*3*/
                -g_width,  0,   g_length,  /*2*/

                g_width,  0,  -g_length,  /*1*/
                -g_width,  0,   g_length,  /*2*/
                g_width,  0,   g_length,  /*0*/
            ];
        }

        /**
         * Función que devuelve las caras del plano
         * @return {[Number]}
         */
        getFaces() {
            return [
                1, 3, 2, 
                1, 2, 0, 
            ];
        }

        /**
         * Función que devuelve las coordenadas para el mapeo uv de la textura
         * @return {[Number]}
         */
        getUV() {
            return [
                // Triángulo 1
                1, 1,
                1, 0,
                0, 0,

                // Triángulo 2
                1, 1,
                0, 0,
                1, 0,
            ];
        }
    }

    CG.Plano = Plano;
    return CG;
}) (CG || {});