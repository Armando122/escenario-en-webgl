let gl;

window.addEventListener("load", async function(evt) {
    let canvas = document.getElementById("the_canvas");
  
    gl = canvas.getContext("webgl");
  
    if (!gl) throw "WebGL no soportado";
  
    // Escenario
    geometry = await CG.build();

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.DEPTH_TEST);
    
    /* ============= Camara ============= */
    let aspect = canvas.width/canvas.height;
    let zNear = 1;
    let zFar = 2000;
    let projectionMatrix = CG.Matrix4.perspective(75*Math.PI/180, aspect, zNear, zFar);
    
    let camera = new CG.TrackballCamera(
      new CG.Vector3(50, 21, 100), //pos
      new CG.Vector3(50, 20, 0),  //coi
      new CG.Vector3(0, 1, 0)   //up
    );
    
    let viewMatrix;
    let lightPosition;
    let lightPosView;
    /* ============= Camara ============= */
      
    /* Función que se encarga de dibujar las figuras 
       Recibe el valor especular, coeficiente ambiental, el material de dibujado y el valor de brillo especular
    */
    function draw(especular, coef_env, material, alpha_s) {
      camera.setDrawParams(draw, especular, coef_env, material, alpha_s);
  
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      
      viewMatrix = camera.getMatrix();
      
      for (let i = 0; i < geometry.length; i++) {
        let objetosDef = geometry[i];
        for (let j = 0; j < objetosDef.length-1; j++) {
          lightPosition = objetosDef[objetosDef.length-1];
          lightPosView = viewMatrix.multiplyVector(lightPosition);

          let figura = objetosDef[j];

          figura.draw(
            gl,
            material,
            projectionMatrix,
            viewMatrix,
            lightPosView,
            coef_env,
            1,
            especular,
            alpha_s
          );
        }
      }
    }
    
    draw(0,0.0685, new CG.TextureMaterial(gl), 0);
    
    camera.registerKeyboardEvents();
  });
