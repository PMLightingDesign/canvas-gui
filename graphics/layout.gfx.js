// Superclass for object layout engine

class Layout {
  constructor(ctx, options){
    this.options = options;
    this.ctx = ctx;
    this.children = new Array();
  }

  style(style){
    for(let i = 0; i < this.children.length; i++){
      this.children[i].style(style);
    }
  }

  draw(){
    for(let i = 0; i < this.children.length; i++){
      this.children[i].draw();
    }
  }
}

module.exports = Layout;
