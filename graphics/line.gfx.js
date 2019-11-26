const Drawable = require('./drawable.gfx.js');

/*
  Geometry object for a line

  geometry = {
    x: 0,
    y: 0,
    x1: 1,
    y1: 1
  }

*/

class Line extends Drawable {
  constructor(ctx, options){
    super(ctx, options);
  }

  draw(){
    if(this.visible){
      super.draw();
      this.ctx.lineTo(this.geometry.x1 + this.root.x, this.geometry.y1 + this.root.y);
      this.ctx.stroke();
    }
  }
}

module.exports = Line;
