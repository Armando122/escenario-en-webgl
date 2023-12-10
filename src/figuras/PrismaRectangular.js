var CG = (function(CG) {
    let g_width, g_height, g_length;
  
    class PrismaRectangular extends CG.GenericGeometry {
      /**
       * Constructor de prisma rectangular
       * @param {WebGLRenderingContext} gl Contexto de render
       * @param {Number[]} color Color del prisma rectangular
       * @param {Number} width ancho del prisma
       * @param {Number} height alto del prisma
       * @param {Number} length largo del prisma
       * @param {Matrix4} initial_transform posición inicial del prisma
       * @param {string} imagen textura del prisma
       */
      constructor(gl, color, width, height, length, initial_transform, imagen) {
        g_width  = (width  || 1)/2;
        g_height = (height || 1)/2;
        g_length = (length || 1)/2;

        super(gl, color, initial_transform, imagen);
      }

      /**
       * Función que devuelve los vértices
       * @returns {Number[]}
       */
      getVerticesW() {
        return [
            g_width,  g_height,  g_length, //0
            g_width, -g_height,  g_length, //1
            g_width,  g_height, -g_length, //2
            g_width, -g_height, -g_length, //3
           -g_width,  g_height,  g_length, //4
           -g_width, -g_height,  g_length, //5
           -g_width,  g_height, -g_length, //6
           -g_width, -g_height, -g_length  //7
        ];
      }
  
      /**
       * Función que devuelve un arreglo con los vértices explicitamente
       * @returns {Number[]}
       */
      getVertices() {
        return [
           g_width,  g_height, -g_length,/*2*/   g_width, -g_height,  g_length,/*1*/   g_width, -g_height, -g_length,/*3*/
           g_width,  g_height, -g_length,/*2*/   g_width,  g_height,  g_length,/*0*/   g_width, -g_height,  g_length,/*1*/
   
           g_width, -g_height,  g_length,/*1*/  -g_width,  g_height,  g_length,/*4*/  -g_width, -g_height,  g_length,/*5*/
           g_width, -g_height,  g_length,/*1*/   g_width,  g_height,  g_length,/*0*/  -g_width,  g_height,  g_length,/*4*/
  
          -g_width, -g_height,  g_length,/*5*/  -g_width,  g_height, -g_length,/*6*/  -g_width, -g_height, -g_length,/*7*/
          -g_width, -g_height,  g_length,/*5*/  -g_width,  g_height,  g_length,/*4*/  -g_width,  g_height, -g_length,/*6*/
  
          -g_width,  g_height, -g_length,/*6*/   g_width, -g_height, -g_length,/*3*/  -g_width, -g_height, -g_length,/*7*/
          -g_width,  g_height, -g_length,/*6*/   g_width,  g_height, -g_length,/*2*/   g_width, -g_height, -g_length,/*3*/
   
          -g_width,  g_height,  g_length,/*4*/   g_width,  g_height, -g_length,/*2*/  -g_width,  g_height, -g_length,/*6*/
          -g_width,  g_height,  g_length,/*4*/   g_width,  g_height,  g_length,/*0*/   g_width,  g_height, -g_length,/*2*/
  
           g_width, -g_height, -g_length,/*3*/  -g_width, -g_height,  g_length,/*5*/  -g_width, -g_height, -g_length,/*7*/
           g_width, -g_height, -g_length,/*3*/   g_width, -g_height,  g_length,/*1*/  -g_width, -g_height,  g_length,/*5*/
        ];
      }
      
      /**
       * Función que devuelve el arreglo de caras de la figura.
       * @returns {Number[]}
       */
      getFaces() {
        return [
          2, 1, 3,
          2, 0, 1,
  
          1, 4, 5,
          1, 0, 4,
  
          5, 6, 7,
          5, 4, 6,
  
          6, 3, 7,
          6, 2, 3,
  
          4, 2, 6,
          4, 0, 2,
  
          3, 5, 7,
          3, 1, 5,
        ];
      }

      /**
       * Función para obtener las coordenadas de mapeo UV
       * @returns {Number[]}
       */
      getUV() {
        let uSum = (2*g_length) + 2*g_width;
        let uPartUno = (g_length/uSum);
        let uPartDos = (g_length+g_width)/uSum;
        let uPartTres = (2*g_length+g_width)/uSum;
        let vSum = 2*g_length + g_height;
        let vPartUno = g_length/vSum;
        let vPartDos = (g_length+g_height)/vSum;
        return [
          // vista frontal
          uPartDos, vPartUno,
          uPartUno, vPartDos,
          uPartDos, vPartDos,
          uPartDos, vPartUno,
          uPartUno, vPartUno,
          uPartUno, vPartDos,

          // vista lateral izquierda
          uPartTres, vPartUno,
          uPartDos,  vPartDos,
          uPartDos,  vPartUno,
          uPartTres, vPartUno,
          uPartTres, vPartDos,
          uPartDos,  vPartDos,

          // vista trasera
          1,         vPartDos,
          uPartTres, vPartUno,
          uPartTres, vPartDos,
          1,         vPartDos,
          1,         vPartUno,
          uPartTres, vPartUno,

          // vista lateral derecha
          uPartUno, vPartUno,
          0,        vPartDos,
          uPartUno, vPartDos,
          uPartUno, vPartUno,
          0,        vPartUno,
          0,        vPartDos,
          
          // vista superior
          uPartDos, vPartUno,
          uPartUno, 0,
          uPartUno, vPartUno,
          uPartDos, vPartUno,
          uPartDos, 0,
          uPartUno, 0,

          // vista inferior
          uPartDos, 1,
          uPartUno, vPartDos,
          uPartDos, vPartDos,
          uPartDos, 1,
          uPartUno, 1,
          uPartUno, vPartDos,
        ];
      }
    }
  
    CG.PrismaRectangular = PrismaRectangular;
    return CG;
  })(CG || {});