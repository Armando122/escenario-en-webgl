var CG = (function(CG) {

    class TextureMaterial extends CG.Material {
      /**
       * Material que dibuja las figuras utilizandola textura especificada e iluminación difusa
       */
      constructor(gl) {
        let vertex_shader = `
        precision mediump float;

        attribute vec4 a_position;
        attribute vec2 a_texcoord;
        attribute vec3 a_normal;
        
        uniform mat4 u_PVM_matrix;
        uniform mat4 u_VM_matrix;
        uniform vec3 u_light_position;
        
        varying vec2 v_texcoord;
        varying vec3 v_position;
        varying vec3 v_normal;
    
        void main() {
          v_position = vec3(u_VM_matrix * a_position);
          v_normal = vec3(u_VM_matrix * vec4(a_normal, 0));
          v_texcoord = a_texcoord;

          gl_Position = u_PVM_matrix * a_position;
        }`;
        
        let fragment_shader = `
        precision mediump float;

        uniform vec3 u_light_position;
        uniform sampler2D u_texture;

        varying vec3 v_position;
        varying vec2 v_texcoord;
        varying vec3 v_normal;
    
        void main() {
          vec3 to_light = normalize(u_light_position - v_position);
          vec3 fragment_normal = normalize(v_normal);
          float cos_angle = max(dot(fragment_normal, to_light), 0.0);

          vec3 ambient = vec3(0.05, 0.05, 0.05);
          vec4 color = texture2D(u_texture, v_texcoord);
          gl_FragColor = vec4(ambient + (vec3(color) * cos_angle ), color.a );
        }`;
  
        super(gl, vertex_shader, fragment_shader);
      }
    }
  
    CG.TextureMaterial = TextureMaterial;
    return CG;
  }(CG || {}));