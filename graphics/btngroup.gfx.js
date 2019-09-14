const Layout = require('./layout.gfx.js');
const Button = require('./button.gfx.js');

class ButtonGroup extends Layout {
  constructor(ctx, config, options){
    super(ctx, options);
    for(let i = 0; i < config.length; i++){
      this.children.push(new Button(this.ctx, config[i].callback, config[i].options));
      this.children[i].dims(config[i].dims);
    }
    this.visible = false;
  }

  style(style){
    for(let i = 0; i < this.children.length; i++){
      this.children[i].style(style);
    }
  }

  enable(state){
    for(let i = 0; i < this.children.length; i++){
      this.children[i].enabled = state;
    }
    this.visible = state;
  }

  test(pos){
    for(let i = 0; i < this.children.length; i++){
      this.children[i].test(pos);
    }
  }

  draw(){
    if(this.visible){
      super.draw();
    }
  }
}

module.exports = ButtonGroup;
