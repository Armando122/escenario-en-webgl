var CG = (function(CG) {
      /**
       * 
       */
      function wireframeGeometry() {
        let geometry = [
          
        ];
        return geometry;
      }


      /**
       * Devuelve la definición de los objetos del escenario y la posición de las luces
       * @returns {[GenericGeometry]} geometry
       */
      async function build() {
        let geometry = [
            [// Museo
            new CG.Plano(
              gl,
              [1, 0, 0, 1], 
              60,60,
              CG.Matrix4.translate(new CG.Vector3(0, -1, 0))
            ), 
            new CG.Vector4(0, 20, 0, 1)],

            // Muebles
            /*new CG.PrismaRectangular(
              gl, 
              [0, 1, 1, 1],
              15, 15, 15, 
              CG.Matrix4.translate(new CG.Vector3(0, 4, 0)),
            ),
            new CG.PrismaRectangular(
              gl, 
              [0, 1, 1, 1],
              15, 15, 15, 
              CG.Matrix4.translate(new CG.Vector3(-30, 4, 0)),
            ),
            new CG.PrismaRectangular(
              gl, 
              [0, 1, 1, 1],
              15, 15, 15, 
              CG.Matrix4.translate(new CG.Vector3(30, 4, 0)),
            ),
      
            new CG.PrismaRectangular(
              gl, 
              [0, 1, 1, 1],
              15, 15, 15, 
              CG.Matrix4.translate(new CG.Vector3(0, 4, 30)),
            ),
            new CG.PrismaRectangular(
              gl, 
              [0, 1, 1, 1],
              15, 15, 15, 
              CG.Matrix4.translate(new CG.Vector3(-30, 4, 30)),
            ),*/
            [new CG.Plano(
              gl, 
              [0, 1, 1, 1],
              10, 14,
              CG.Matrix4.multiply(
                CG.Matrix4.translate(new CG.Vector3(30, 13, 30)),
                CG.Matrix4.rotateX(80*Math.PI/180)
              ),
              await CG.loadImage("./texturas/Missing_Texture_JE4.png")
            ),
            new CG.Vector4(30, 20, 32, 1)],
      
            /*new CG.PrismaRectangular(
              gl, 
              [0, 1, 1, 1],
              15, 15, 15, 
              CG.Matrix4.translate(new CG.Vector3(0, 4, -30)),
            ),
            new CG.PrismaRectangular(
              gl, 
              [0, 1, 1, 1],
              15, 15, 15, 
              CG.Matrix4.translate(new CG.Vector3(-30, 4, -30)),
            ),
            new CG.PrismaRectangular(
              gl, 
              [0, 1, 1, 1],
              15, 15, 15, 
              CG.Matrix4.translate(new CG.Vector3(30, 4, -30)),
            ),

            //Terreno
            new CG.Plano(
              gl,
              [0, 1, 1, 1], 
              100,100,
              CG.Matrix4.translate(new CG.Vector3(0, -1.5, 0))
            ),*/
            
            // Ambiente
            /*new CG.PrismaRectangular(
              gl, 
              [1, 0.2, 0.3, 1], 
              200, 100, 200, 
              CG.Matrix4.translate(new CG.Vector3(0, 48, 0)),
            ),*/
      
            // Expo Phong
            /*new CG.Cilindro(
              gl, 
              [1, 0, 0, 1], 
              2, 2, 16, 16, 
              CG.Matrix4.translate(new CG.Vector3(-5, 14.2, 1))
            ),
            new CG.Cono(
              gl, 
              [0, 1, 0, 1], 
              2, 2, 16, 16, 
              CG.Matrix4.translate(new CG.Vector3(0, 14.2, -5))
            ),
            new CG.Dodecaedro(
              gl, 
              [0, 0, 1, 1], 
              2, 
              CG.Matrix4.translate(new CG.Vector3(5, 13, -5))
            ),
            new CG.Icosaedro(gl, 
              [1, 0 , 1, 1], 
              2, 
              CG.Matrix4.translate(new CG.Vector3(-2, 12, 2))
            ),
            new CG.Octaedro(
              gl, 
              [1, 1, 0, 1], 
              2, 
              CG.Matrix4.translate(new CG.Vector3(-2, 14.2, 0))
            ),
            new CG.PrismaRectangular(
              gl, 
              [1, 0.2, 0.3, 1], 
              2, 3, 4, 
              CG.Matrix4.translate(new CG.Vector3(-5, 14.2, 5)),
            ),
            new CG.Tetraedro(
              gl, 
              [0.5, 0.5, 0.5, 1],
              2, 
              CG.Matrix4.translate(new CG.Vector3(-3, 14.2, 5))
            ),
            new CG.Toro(
              gl,
              [0.25, 0.25, 0.25, 1], 
              4, 1, 16, 16,
              CG.Matrix4.multiply(
                CG.Matrix4.translate(new CG.Vector3(0, 14, 5)),
                CG.Matrix4.rotateZ(-45*Math.PI/180)
              )
            ),

            // Expo Difusa
            new CG.Cilindro(
              gl, 
              [1, 0, 0, 1], 
              2, 2, 16, 16, 
              CG.Matrix4.translate(new CG.Vector3(25.5, 14.2, -5))
            ),
            new CG.Cono(
              gl, 
              [0, 1, 0, 1], 
              2, 2, 16, 16, 
              CG.Matrix4.translate(new CG.Vector3(28, 14.2, -5))
            ),
            new CG.Dodecaedro(
              gl, 
              [0, 0, 1, 1], 
              2, 
              CG.Matrix4.translate(new CG.Vector3(32, 13, -5))
            ),
            new CG.Esfera(
              gl, 
              [0, 1, 1, 1],
              2, 8, 8, 
              CG.Matrix4.translate(new CG.Vector3(25.5, 14.2, 0))
            ),
            new CG.Octaedro(
              gl, 
              [1, 1, 0, 1], 
              2,
              CG.Matrix4.multiply(
                CG.Matrix4.translate(new CG.Vector3(30, 14, 0)),
                CG.Matrix4.rotateZ(-45*Math.PI/180)
              )
            ),
            new CG.PrismaRectangular(
              gl, 
              [1, 0.2, 0.3, 1], 
              2, 3, 4, 
              CG.Matrix4.translate(new CG.Vector3(25.5, 14.2, 5)),
            ),
            new CG.Tetraedro(
              gl, 
              [0.5, 0.5, 0.5, 1],
              2, 
              CG.Matrix4.translate(new CG.Vector3(30.5, 14.2, 5))
            ),
            new CG.Toro(
              gl,
              [0.25, 0.25, 0.25, 1], 
              4, 1, 16, 16, 
              CG.Matrix4.translate(new CG.Vector3(35.5, 12, 5))
            ),

            // Expo Texturas
            new CG.Cilindro(
              gl, 
              [1, 0, 0, 1], 
              2, 2, 8, 16, 
              CG.Matrix4.translate(new CG.Vector3(-25.5, 14.2, -5))
            ),
            new CG.Cono(
              gl, 
              [0, 1, 0, 1], 
              2, 2, 16, 16, 
              CG.Matrix4.translate(new CG.Vector3(-30.5, 14.2, -5))
            ),
            new CG.Dodecaedro(
              gl, 
              [0, 0, 1, 1], 
              2, 
              CG.Matrix4.translate(new CG.Vector3(-35, 13, -5))
            ),
            new CG.Esfera(
              gl, 
              [0, 1, 1, 1],
              2, 16, 16, 
              CG.Matrix4.translate(new CG.Vector3(-25.5, 14.2, 0))
            ),
            new CG.Icosaedro(gl, 
              [1, 0 , 1, 1], 
              2, 
              CG.Matrix4.translate(new CG.Vector3(-30.5, 14.2, 0))
            ),
            new CG.Octaedro(
              gl, 
              [1, 1, 0, 1], 
              2, 
              CG.Matrix4.translate(new CG.Vector3(-35, 14.2, 0))
            ),
            new CG.Tetraedro(
              gl, 
              [0.5, 0.5, 0.5, 1],
              2, 
              CG.Matrix4.translate(new CG.Vector3(-30.5, 13, 5))
            ),

            // Expo Espejos
            new CG.Plano(
              gl, 
              [1, 0, 0, 1], 
              2, 3,
              CG.Matrix4.multiply(
                CG.Matrix4.translate(new CG.Vector3(-5, 14.2, -30)),
                CG.Matrix4.rotateX(90*Math.PI/180)
              )
            ),
            new CG.Plano(
              gl, 
              [0, 1, 0, 1], 
              2, 3,
              CG.Matrix4.multiply(
                CG.Matrix4.translate(new CG.Vector3(0, 14.2, -30)),
                CG.Matrix4.rotateX(90*Math.PI/180)
              )
            ),
            new CG.Plano(
              gl, 
              [0, 0, 1, 1], 
              2, 3,
              CG.Matrix4.multiply(
                CG.Matrix4.translate(new CG.Vector3(5, 14.2, -30)),
                CG.Matrix4.rotateX(90*Math.PI/180)
              )
            ),
            
            // Expo Textura Difusa
            
            new CG.Dodecaedro(
              gl, 
              [0, 0, 1, 1], 
              2, 
              CG.Matrix4.translate(new CG.Vector3(35.5, 13, -35))
            ),
            new CG.Esfera(
              gl, 
              [0, 1, 1, 1],
              2, 8, 8, 
              CG.Matrix4.translate(new CG.Vector3(25.5, 14.2, -30))
            ),
            new CG.Octaedro(
              gl, 
              [1, 1, 0, 1], 
              2, 
              CG.Matrix4.translate(new CG.Vector3(35.5, 14.2, -30))
            ),
            new CG.PrismaRectangular(
              gl, 
              [1, 0.2, 0.3, 1], 
              2, 3, 4, 
              CG.Matrix4.translate(new CG.Vector3(25.5, 14.2, -25)),
            ),
            new CG.Toro(
              gl,
              [0.25, 0.25, 0.25, 1], 
              4, 1, 16, 16, 
              CG.Matrix4.translate(new CG.Vector3(35.5, 14.2, -25))
            ),

            // Expo Texturas Phong
            new CG.PrismaRectangular(
              gl, 
              [1, 0.2, 0.3, 1], 
              3, 3, 3, 
              CG.Matrix4.translate(new CG.Vector3(-25.5, 15, -27)),
            ),
            new CG.PrismaRectangular(
              gl, 
              [1, 0.2, 0.3, 1], 
              3, 3, 3, 
              CG.Matrix4.translate(new CG.Vector3(-30.2, 15, -27)),
            ),
            new CG.PrismaRectangular(
              gl, 
              [1, 0.2, 0.3, 1], 
              3, 3, 3, 
              CG.Matrix4.translate(new CG.Vector3(-35, 15, -27)),
            ),
            new CG.PrismaRectangular(
              gl, 
              [1, 0.2, 0.3, 1], 
              3, 3, 3, 
              CG.Matrix4.translate(new CG.Vector3(-25.5, 15, -33)),
            ),
            new CG.PrismaRectangular(
              gl, 
              [1, 0.2, 0.3, 1], 
              3, 3, 3, 
              CG.Matrix4.translate(new CG.Vector3(-30.2, 15, -33)),
            ),
            new CG.PrismaRectangular(
              gl, 
              [1, 0.2, 0.3, 1], 
              3, 3, 3, 
              CG.Matrix4.translate(new CG.Vector3(-35, 15, -33)),
            ),

            // Expo Color Sólido
            new CG.Cilindro(
              gl, 
              [1, 0, 0, 1], 
              2, 2, 16, 16, 
              CG.Matrix4.translate(new CG.Vector3(-35, 14.2, 25))
            ),
            new CG.Cono(
              gl, 
              [0, 1, 0, 1], 
              2, 2, 16, 16, 
              CG.Matrix4.translate(new CG.Vector3(-30, 14.2, 25))
            ),
            new CG.Dodecaedro(
              gl, 
              [0, 0, 1, 1], 
              2, 
              CG.Matrix4.translate(new CG.Vector3(-25, 13, 25))
            ),
            new CG.Esfera(
              gl, 
              [0, 1, 1, 1],
              2, 16, 16, 
              CG.Matrix4.translate(new CG.Vector3(-35, 14.2, 30))
            ),
            new CG.Icosaedro(gl, 
              [1, 0 , 1, 1], 
              2, 
              CG.Matrix4.translate(new CG.Vector3(-30, 14.2, 30))
            ),
            new CG.Octaedro(
              gl, 
              [1, 1, 0, 1], 
              2, 
              CG.Matrix4.translate(new CG.Vector3(-25, 14.2, 30))
            ),
            new CG.PrismaRectangular(
              gl, 
              [1, 0.2, 0.3, 1], 
              2, 3, 4, 
              CG.Matrix4.translate(new CG.Vector3(-35, 14.2, 35)),
            ),
            new CG.Tetraedro(
              gl, 
              [0.5, 0.5, 0.5, 1],
              2, 
              CG.Matrix4.translate(new CG.Vector3(-30, 14.2, 35))
            ),
            new CG.Toro(
              gl,
              [0.25, 0.25, 0.25, 1], 
              4, 1, 16, 16, 
              CG.Matrix4.translate(new CG.Vector3(-25, 14.2, 35))
            ),

            // Expo Wireframe
          new CG.Cilindro(
            gl, 
            [1, 0, 0, 1], 
            2, 2, 16, 16, 
            CG.Matrix4.translate(new CG.Vector3(-5, 14.2, 25))
          ),
          new CG.Cono(
            gl, 
            [0, 1, 0, 1], 
            2, 2, 16, 16, 
            CG.Matrix4.translate(new CG.Vector3(0, 14.2, 25))
          ),
          new CG.Dodecaedro(
            gl, 
            [0, 0, 1, 1], 
            2, 
            CG.Matrix4.translate(new CG.Vector3(5, 13, 25))
          ),
          new CG.Esfera(
            gl, 
            [0, 1, 1, 1],
            2, 16, 16, 
            CG.Matrix4.translate(new CG.Vector3(-5, 14.2, 30))
          ),
          new CG.Icosaedro(gl, 
            [1, 0 , 1, 1], 
            2, 
            CG.Matrix4.translate(new CG.Vector3(0, 14.2, 30))
          ),
          new CG.Octaedro(
            gl, 
            [1, 1, 0, 1], 
            2, 
            CG.Matrix4.translate(new CG.Vector3(5, 14.2, 30))
          ),
          new CG.PrismaRectangular(
            gl, 
            [1, 0.2, 0.3, 1], 
            2, 3, 4, 
            CG.Matrix4.translate(new CG.Vector3(-5, 14.2, 35)),
          ),
          new CG.Tetraedro(
            gl, 
            [0.5, 0.5, 0.5, 1],
            2, 
            CG.Matrix4.translate(new CG.Vector3(0, 14.2, 35))
          ),
          new CG.Toro(
            gl,
            [0.25, 0.25, 0.25, 1], 
            4, 1, 16, 16, 
            CG.Matrix4.translate(new CG.Vector3(5, 14.2, 35))
          ),
            
            
            // Extra
            new CG.Cilindro(
              gl, 
              [1, 0, 0, 1], 
              2, 2, 16, 16, 
              CG.Matrix4.translate(new CG.Vector3(-5, 0, 50))
            ),*/
            ];
        return geometry;
      }
  
      CG.build = build;
      CG.wireframeGeometry = wireframeGeometry;
      return CG;
}(CG || {}));