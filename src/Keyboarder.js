//crear eventos para escuchar teclas y verificar si se presiona

let Keyboarder = {
  keyState: {},

  initEvents() {
    window.addEventListener('keydown', (e) => {
      this.keyState[e.keyCode] = true;
    });

    window.addEventListener('keyup', (e) => {
      console.log('up')
      this.keyState[e.keyCode] = false;
    });
  },

  isDown(keyCode) {
    return this.keyState[keyCode] === true;
  }
};

export default Keyboarder;
