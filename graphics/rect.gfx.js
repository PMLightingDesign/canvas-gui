const Drawable = require('./drawable.gfx.js');

/*
  Geometry object for a rect

  geometry = {
    x: 0,
    y: 0,
    x1: 1,
    y1: 1
  }

*/

class Rectangle extends Drawable {
  constructor(ctx, options){
    super(ctx, options);
  }

  draw(){
    if(this.visible){
      this.ctx.beginPath();
      super.draw();
      if(this.style.fillStyle != 'none'){
        this.ctx.fillRect(this.x+this.root.x, this.y, (this.x1 - this.x), (this.y1 - this.y));
      }
      if(this.style.strokeStyle != 'none'){
        this.ctx.strokeRect(this.x, this.y, (this.x1 - this.x), (this.y1 - this.y));
      }
    }
  }
}

module.exports = Rectangle;
