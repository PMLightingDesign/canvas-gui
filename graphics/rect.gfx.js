const Drawable = require('./drawable.gfx.js');

class Rectangle extends Drawable {
  constructor(ctx, options){
    super(ctx, options);

    // x1 = Second Point X  y1 = Second Point Y
    this.x1 = 1;
    this.y1 = 0;
  }

  dims(dims){
    super.dims(dims);
    // Define endpoint explicitly
    if(typeof(dims.x1) != 'undefined'){
      this.x1 = dims.x1;
    }
    if(typeof(dims.y1) != 'undefined'){
      this.y1 = dims.y1;
    }
    // Define endpoint by offset
    if(typeof(dims.dx) != 'undefined'){
      this.x1 = this.x + dims.dx;
    }
    if(typeof(dims.dy) != 'undefined'){
      this.y1 = this.y + dims.dy;
    }
  }

  draw(){
    this.ctx.beginPath();
    super.draw();
    let didDraw = false;
    if(typeof(this.fillStyle) != 'undefined'){
      this.ctx.fillRect(this.x, this.y, (this.x1 - this.x), (this.y1 - this.y));
      didDraw = true;
    }
    if(typeof(this.strokeStyle) != 'undefined'){
      this.ctx.strokeRect(this.x, this.y, (this.x1 - this.x), (this.y1 - this.y));
      didDraw = true;
    }
    if(!didDraw){
      console.log("Rectangle drew without specific style");
    }
  }
}

module.exports = Rectangle;
