let gl, program, programW;

window.addEventListener("load", async function(evt) {
    // se obtiene una referencia al canvas
    let canvas = document.getElementById("the_canvas");
  
    // se obtiene una referencia al contexto de render de WebGL
    gl = canvas.getContext("webgl");
  
    // si el navegador no soporta WebGL la variable gl no está definida y se lanza una excepción
    if (!gl) throw "WebGL no soportado";
  
    // Escenario
    geometry = await CG.build();
    
    
    // se determina el color con el que se limpia la pantalla, en este caso un color negro transparente
    gl.clearColor(0, 0, 0, 0);
    // se activa la prueba de profundidad, esto hace que se utilice el buffer de profundidad para determinar que píxeles se dibujan y cuales se descartan
    gl.enable(gl.DEPTH_TEST);
    
    /* ============= Camara ============= */
    let aspect = canvas.width/canvas.height;
    let zNear = 1;
    let zFar = 2000;
    let projectionMatrix = CG.Matrix4.perspective(75*Math.PI/180, aspect, zNear, zFar);
    // Se construye la camára
    let camera = new CG.TrackballCamera(
      new CG.Vector3(50, 21, 100), //pos
      new CG.Vector3(50, 20, 0),  //coi
      new CG.Vector3(0, 1, 0)   //up
      );
      
      let viewMatrix;
      let lightPosition;
      let lightPosView;
      
      
      /* ============= Camara ============= */
      
      // se encapsula el código de dibujo en una función
    function draw(especular, coef_env, material, alpha_s) {
      camera.setDrawParams(draw, especular, coef_env, material, alpha_s);
  
      // se le indica a WebGL cual es el tamaño de la ventana donde se despliegan los gráficos
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      
      // se limpian tanto el buffer de color, como el buffer de profundidad
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
    
    // se dibujan los objetos
    draw(0,0.0685, new CG.TextureMaterial(gl), 0);
    
    camera.registerKeyboardEvents();
    
    /*=== Eventos para dibujar las figuras en diferentes modos ===*/
    /*checkboWire.addEventListener("change", function() {
      if (checkboWire.checked) {
        checkboEspec.disabled = true;
        checkboTexture.disabled = true;
        wireframe();
      } else {
        checkboEspec.disabled = false;
        checkboTexture.disabled = false;
        // Se regresa al estado seleccionado
        if (checkboEspec.checked) {
          draw(1, 0.0685, new CG.PhongMaterial(gl), 5.0);  // Dibujado difuso y especular
        } else {
          if (checkboTexture.checked) {
            draw(0,0.0685, new CG.TextureMaterial(gl), 0);  // texturas
          } else {
            draw(0, 0.0685, new CG.DiffuseMaterial(gl));  // Dibujado solo difuso
          }
        }
      }
    });*/
    
    /*checkboEspec.addEventListener("change", function() {
      if (checkboEspec.checked) {
        draw(1, 0.0685, new CG.PhongMaterial(gl), 5.0);  // Dibujado difuso y especular
      } else {
        draw(0, 0.0685, new CG.DiffuseMaterial(gl));  // Dibujado solo difuso
      }
    });

    checkboTexture.addEventListener("change", function() {
      if (checkboTexture.checked) {
        checkboEspec.disabled = true;
        draw(0,0.0685, new CG.TextureMaterial(gl), 0);  // texturas
      } else {
        checkboEspec.disabled = false;
        if (checkboEspec.checked) {
          draw(1, 0.0685, new CG.PhongMaterial(gl), 5.0);  // Dibujado difuso y especular
        } else {
          draw(0, 0.0685, new CG.DiffuseMaterial(gl));  // Dibujado solo difuso
        }
      }
    });*/
    
  });
