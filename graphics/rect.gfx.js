const Drawable = require('./drawable.gfx.js');

/*
  Geometry object for a rect

  geometry = {
    x: 0,
    y: 0,
    width: 1,
    height: 1
  }

*/

class Rectangle extends Drawable {
  constructor(ctx, options){
    super(ctx, options);
  }

  getCurrentGeometry(){
    return {
      x: this.geometry.x + this.root.x,
      y: this.geometry.y + this.root.y,
      x1: this.geometry.x + this.root.x + this.geometry.width,
      y1: this.geometry.y + this.root.y + this.geometry.height
    }
  }

  draw(){
    if(this.visible){
      super.draw();
      this.ctx.beginPath();
      if(this.style.fillStyle != 'none'){
        this.ctx.fillRect(this.geometry.x+this.root.x, this.geometry.y+this.root.y, this.geometry.width, this.geometry.height);
      }
      if(this.style.strokeStyle != 'none'){
        this.ctx.strokeRect(this.geometry.x+this.root.x, this.geometry.y+this.root.y, this.geometry.width, this.geometry.height);
      }
      this.ctx.closePath();
    }
  }
}

module.exports = Rectangle;
