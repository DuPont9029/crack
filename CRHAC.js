const dino = {
    jump: 12,
    invincibility: false,
    original: Runner.prototype.gameOver,
    intervalId: null,

    auto() {
        function dispatchKey(type, key) {
            document.dispatchEvent(new KeyboardEvent(type, { keyCode: key }));
        }

        this.intervalId = setInterval(() => {
            const KEY_CODE_SPACE_BAR = 32;
            const KEY_CODE_ARROW_DOWN = 40;
            const CANVAS_HEIGHT = Runner.instance_.dimensions.HEIGHT;
            const DINO_HEIGHT = Runner.instance_.tRex.config.HEIGHT;

            const obstacle = Runner.instance_.horizon.obstacles[0];
            const speed = Runner.instance_.currentSpeed;

            if (obstacle) {
                const w = obstacle.width;
                const x = obstacle.xPos; // misurato dalla sinistra del canvas
                const y = obstacle.yPos; // misurato dall'alto del canvas
                const yFromBottom =
                    CANVAS_HEIGHT - y - obstacle.typeConfig.height;
                const isObstacleNearby = x < 25 * speed - w / 2;

                if (isObstacleNearby) {
                    if (yFromBottom > DINO_HEIGHT) {
                        // Il pterodattilo arriva dall'alto, non fare niente
                    } else if (y > CANVAS_HEIGHT / 2) {
                        // Salto
                        dispatchKey("keyup", KEY_CODE_ARROW_DOWN);
                        dispatchKey("keydown", KEY_CODE_SPACE_BAR);
                    } else {
                        // Duck
                        dispatchKey("keydown", KEY_CODE_ARROW_DOWN);
                    }
                }
            }
        }, Runner.instance_.msPerFrame);
    },

    
    stop() {
        // Cancella l'intervallo
        clearInterval(this.intervalId);
    },

    setjump(jump) {
        Runner.instance_.tRex.setJumpVelocity(jump);
    },

    invincibility(bool) {
        
        if (bool === true) {
            Runner.prototype.gameOver = function () {};
        } else if (bool === false) {
            Runner.prototype.gameOver = dino.original;
        }
    },

    createControls() {

        const autoCheckbox = document.createElement('input');
        autoCheckbox.type = 'checkbox';
        autoCheckbox.addEventListener('change', () => {
            if (autoCheckbox.checked) {
                this.auto();
            }
            else {
                this.stop();
            }
        });



        const autoLabel = document.createElement('label');
        autoLabel.innerHTML = '<span>Auto: </span>';
        autoLabel.appendChild(autoCheckbox);


        // Crea gli elementi di input per il salto
        const jumpInput = document.createElement("input");
        jumpInput.type = "number";
        jumpInput.value = this.jump;
        jumpInput.addEventListener("input", () => {
            this.setjump(jumpInput.value);
        });




        const jumpLabel = document.createElement('label');
        jumpLabel.innerHTML = '<span>Jump: </span>';
        jumpLabel.appendChild(jumpInput);



        // Crea un elemento checkbox per l'invincibilità
        const invincibilityCheckbox = document.createElement("input");
        invincibilityCheckbox.type = "checkbox";
        invincibilityCheckbox.addEventListener("change", () => {
            this.invincibility(invincibilityCheckbox.checked);
        });



        const invincibilityLabel = document.createElement('label');
        invincibilityLabel.innerHTML = '<span>  GodMode: </span>';
        invincibilityLabel.appendChild(invincibilityCheckbox);


        // Crea un elemento header
        const header = document.createElement("header");
    

        // Aggiunge gli elementi di input e etichetta all'header
        header.appendChild(autoLabel);
        header.appendChild(jumpLabel);
        header.appendChild(invincibilityLabel);

        // Aggiunge l'header all'inizio del corpo del documento
        document.body.insertBefore(header, document.body.firstChild);






        autoCheckbox.addEventListener('change', () => {
            if (autoCheckbox.checked) {
                autoLabel.querySelector('span').style.color = 'green';
            } else {
                autoLabel.querySelector('span').style.color = 'red';
            }
        });
        
        jumpInput.addEventListener('input', () => {
            if (jumpInput.value !== '') {
                jumpLabel.querySelector('span').style.color = 'green';
            } else {
                jumpLabel.querySelector('span').style.color = 'red';
            }
        });
        
        invincibilityCheckbox.addEventListener('change', () => {
            if (invincibilityCheckbox.checked) {
                invincibilityLabel.querySelector('span').style.color = 'green';
            } else {
                invincibilityLabel.querySelector('span').style.color = 'red';
            }
        });
        
    },
};


dino.createControls();
