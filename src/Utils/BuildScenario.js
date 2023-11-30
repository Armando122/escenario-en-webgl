var CG = (function(CG) {
    
      /**
       * Devuelve la definición de los objetos del escenario 
       */
      function build() {
        let geometry = [
            // Museo
            new CG.Plano(
              gl,
              [1, 0, 0, 1], 
              60,60,
              CG.Matrix4.translate(new CG.Vector3(0, -1, 0))
            ),

            // Muebles
            new CG.PrismaRectangular(
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
            ),
            new CG.PrismaRectangular(
              gl, 
              [0, 1, 1, 1],
              15, 15, 15, 
              CG.Matrix4.translate(new CG.Vector3(30, 4, 30)),
            ),
      
            new CG.PrismaRectangular(
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
            ),
            
            // Ambiente
            /*new CG.PrismaRectangular(
              gl, 
              [1, 0.2, 0.3, 1], 
              200, 100, 200, 
              CG.Matrix4.translate(new CG.Vector3(0, 48, 0)),
            ),*/
      
            new CG.Cilindro(
              gl, 
              [1, 0, 0, 1], 
              2, 2, 16, 16, 
              CG.Matrix4.translate(new CG.Vector3(-5, 0, -5))
            ),
            new CG.Cilindro(
              gl, 
              [1, 0, 0, 1], 
              2, 2, 16, 16, 
              CG.Matrix4.translate(new CG.Vector3(-5, 0, 50))
            ),
            new CG.Cono(
              gl, 
              [0, 1, 0, 1], 
              2, 2, 16, 16, 
              CG.Matrix4.translate(new CG.Vector3(0, 0, -5))
            ),
            new CG.Dodecaedro(
              gl, 
              [0, 0, 1, 1], 
              2, 
              CG.Matrix4.translate(new CG.Vector3(5, 0, -5))
            ),
            new CG.Esfera(
              gl, 
              [0, 1, 1, 1],
              2, 16, 16, 
              CG.Matrix4.translate(new CG.Vector3(-5, 0, 0))
            ),
            new CG.Icosaedro(gl, 
              [1, 0 , 1, 1], 
              2, 
              CG.Matrix4.translate(new CG.Vector3(0, 0, 0))
            ),
            new CG.Icosaedro(gl, 
              [1, 0 , 1, 1], 
              2, 
              CG.Matrix4.translate(new CG.Vector3(0, -7, 10))
            ),
            new CG.Octaedro(
              gl, 
              [1, 1, 0, 1], 
              2, 
              CG.Matrix4.translate(new CG.Vector3(5, 0, 0))
            ),
            new CG.PrismaRectangular(
              gl, 
              [1, 0.2, 0.3, 1], 
              2, 3, 4, 
              CG.Matrix4.translate(new CG.Vector3(-5, 0, 5)),
            ),
            new CG.Tetraedro(
              gl, 
              [0.5, 0.5, 0.5, 1],
              2, 
              CG.Matrix4.translate(new CG.Vector3(0, 0, 5))
            ),
            new CG.Toro(
              gl,
              [0.25, 0.25, 0.25, 1], 
              4, 1, 16, 16, 
              CG.Matrix4.translate(new CG.Vector3(5, 0, 5))
            ),
          ];
        return geometry;
      }
  
      CG.build = build;
      return CG;
}(CG || {}));