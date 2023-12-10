var CG = (function(CG) {
    let g_width, g_length;

    class Plano extends CG.GenericGeometry {

        /**
         * Coinstructor de plano
         * @param {WebGLRenderingContext} gl contexto de render
         * @param {Number[]} color color del plano
         * @param {Number} width ancho del plano
         * @param {Number} length largo del plano
         * @param {Matrix4} initial_transform posicion inicial del plano
         * @param {string} imagen textura del plano
         */
        constructor(gl, color, width, length, initial_transform, imagen) {
            g_width = (width || 1);
            g_length = (length || 1);

            super(gl, color, initial_transform, imagen);
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
                0, 1,
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