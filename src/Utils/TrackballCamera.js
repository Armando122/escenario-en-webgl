var CG = (function(CG) {
    class TrackballCamera {
        /**
         * @param {Vector3} pos Posición de la camára
         * @param {Vector3} coi Centro de Interés
         * @param {Vector3} up Vector hacia arriba
         */
        constructor (pos = new CG.Vector3(0,0,1), coi = new CG.Vector3(0,0,0), up = new CG.Vector3(0,1,0)) {
            this.pos = pos;
            this.coi = coi;
            this.up = up;
        }

        /**
         * Función que devuelve la matriz de la vista
         */
        getMatrix() {
            return CG.Matrix4.lookAt(this.pos, this.coi, this.up);
        }

        /**
         * Función que modifica los parametros de dibujado relacionados con la camára
         * @param {Function} dibujado Función que se usará para dibujar las figuras en cada actualización
         * @param {Number} val_esp Valor del coeficiente especular
         * @param {Number} coef_amb Valor del coeficiente ambiental
         * @param {Material} mat Material que se usará para dibujar las figuras
         * @param {Number} valor_alpha Valor del brillo especular
         */
        setDrawParams(dibujado, val_esp, coef_amb, mat, valor_alpha) {
            this.dibujado = dibujado;
            this.val_esp = val_esp;
            this.coef_amb = coef_amb;
            this.mat = mat;
            this.valor_alpha = valor_alpha;
        }

        /**
         * Función que registra los eventos que ocurren con el teclado
         */
        registerKeyboardEvents() {

            window.addEventListener("keydown", (evt) => {
                if (evt.key == "w") {
                    this.pos = new CG.Vector3(this.pos.x, this.pos.y, this.pos.z-0.5);
                    this.coi = new CG.Vector3(this.coi.x, this.coi.y, this.coi.z-0.5);
                    window.addEventListener("keydown", keymove);
                }
                if (evt.key == "a") {
                    this.pos = new CG.Vector3(this.pos.x-0.5, this.pos.y, this.pos.z);
                    this.coi = new CG.Vector3(this.coi.x-0.5, this.coi.y, this.coi.z);
                    window.addEventListener("keydown", keymove);
                }
                if (evt.key == "s") {
                    this.pos = new CG.Vector3(this.pos.x, this.pos.y, this.pos.z+0.5);
                    this.coi = new CG.Vector3(this.coi.x, this.coi.y, this.coi.z+0.5);
                    window.addEventListener("keydown", keymove);
                }
                if (evt.key == "d") {
                    this.pos = new CG.Vector3(this.pos.x+0.5, this.pos.y, this.pos.z);
                    this.coi = new CG.Vector3(this.coi.x+0.5, this.coi.y, this.coi.z);
                    window.addEventListener("keydown", keymove);
                }
                if (evt.key == "ArrowUp") {
                    this.coi = new CG.Vector3(this.coi.x, this.coi.y+0.5, this.coi.z);
                    window.addEventListener("keydown", keymove);
                }
                if (evt.key == "ArrowDown") {
                    this.coi = new CG.Vector3(this.coi.x, this.coi.y-0.5, this.coi.z);
                    window.addEventListener("keydown", keymove);
                }

                if (evt.key == "ArrowLeft") {
                    let radianes = Math.PI/180;
                    let giro = -5*radianes;
                    let tempCoi = CG.Vector3.substract(this.coi, this.pos);
                    tempCoi = new CG.Vector3(
                        tempCoi.x*Math.cos(giro) - tempCoi.z*Math.sin(giro), 
                        tempCoi.y, 
                        tempCoi.x*Math.sin(giro) + tempCoi.z*Math.cos(giro));
                    this.coi = CG.Vector3.add(tempCoi, this.pos);
                    window.addEventListener("keydown", keymove);
                }

                if (evt.key == "ArrowRight") {
                    let radianes = Math.PI/180;
                    let giro = 5*radianes;
                    let tempCoi = CG.Vector3.substract(this.coi, this.pos);
                    tempCoi = new CG.Vector3(
                        tempCoi.x*Math.cos(giro) - tempCoi.z*Math.sin(giro), 
                        tempCoi.y, 
                        tempCoi.x*Math.sin(giro) + tempCoi.z*Math.cos(giro));
                    this.coi = CG.Vector3.add(tempCoi, this.pos);
                    window.addEventListener("keydown", keymove);
                }
              });

              window.addEventListener("keyup", (evt) => {
                window.removeEventListener("keydown", keymove);
              });

              let keymove = (evt) => {
                let dib = this.dibujado;
                dib(this.val_esp, this.coef_amb, this.mat, this.valor_alpha);
              }
        }
    }

    CG.TrackballCamera = TrackballCamera;
    return CG;
}(CG || {}));