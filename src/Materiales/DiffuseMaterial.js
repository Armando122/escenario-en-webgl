var CG = (function(CG) {

    class DiffuseMaterial extends CG.Material {
      /**
       * Material que dibuja las figuras utilizando el color especificado y el modelo de iluminación difusa
       */
      constructor(gl) {
        let vertex_shader = `
          attribute vec4 a_position;
          attribute vec3 a_normal;
      
          uniform mat4 u_VM_matrix;
          uniform mat4 u_PVM_matrix;
      
          varying vec3 v_position;
          varying vec3 v_normal;
          
          void main() {
            v_normal = vec3( u_VM_matrix * vec4(a_normal, 0) );
            v_position = vec3( u_VM_matrix * a_position );
          
            gl_Position = u_PVM_matrix * a_position;
          }`;
        let fragment_shader = `
          precision mediump float;
  
          varying vec3 v_position;
          varying vec3 v_normal;
        
          uniform vec3 u_light_position;
          uniform vec4 u_color;
          uniform vec3 l_a;
          uniform float k_a;
          uniform vec3 l_d;
          uniform float k_d;
        
          void main() {
            vec3 to_light = normalize( u_light_position - v_position );
            vec3 fragment_normal = normalize(v_normal);
        
            vec3 env_ip = k_a * l_a;
        
            float cos_angle = max(dot(fragment_normal, to_light), 0.0);
            vec3 dif_ip = k_d * l_d * cos_angle;
        
            vec3 ip = env_ip + dif_ip;
        
            // Calculo de reflexión difusa
            gl_FragColor = vec4(ip, u_color.a);
          }`;
  
        super(gl, vertex_shader, fragment_shader);
      }
    }
  
    CG.DiffuseMaterial = DiffuseMaterial;
    return CG;
  }(CG || {}));