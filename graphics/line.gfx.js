const Drawable = require('./drawable.gfx.js');

class Line extends Drawable {
  constructor(ctx, options){
    super(ctx, options);

    // ex = Endpoint X  ey = Endpoint Y
    this.ex = 1;
    this.ey = 0;
  }

  dims(dims){
    super.dims(dims);
    // Define endpoint explicitly
    if(typeof(dims.ex) != 'undefined'){
      this.ex = dims.ex;
    }
    if(typeof(dims.ey) != 'undefined'){
      this.ey = dims.ey;
    }
    // Define endpoint by offset
    if(typeof(dims.dx) != 'undefined'){
      this.ex = this.x + dims.dx;
    }
    if(typeof(dims.dy) != 'undefined'){
      this.ey = this.y + dims.dy;
    }
  }

  draw(){
    super.draw();
    // Use LineTo Mode
    this.ctx.lineTo(this.ex, this.ey);
    // Stroke only, no fill
    this.ctx.stroke();
  }
}

module.exports = Line;
