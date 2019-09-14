// General purpose class for drawable objects

class Drawable {
  constructor(ctx, options){
    this.ctx = ctx;

    // Always record a base position
    this.x = 0;
    this.y = 0;

    // Record optionsdata if passed
    if(typeof(options) != 'undefined'){
      this.options = options;
    }
  }

  // This method can be extended to allow for endpoints, radii, and misc.
  dims(dimensions){
    this.x = dimensions.x;
    this.y = dimensions.y;
  }

  // Style will be passed as an object
  style(style){
    if(typeof(style.fill) != 'undefined'){
      this.fillStyle = style.fill;
    }
    if(typeof(style.stroke) != 'undefined'){
      this.strokeStyle = style.stroke;
    }
    if(typeof(style.weight) != 'undefined'){
      this.weight = style.weight;
    }
  }

  // The parent class method should always be called
  draw(){
    if(typeof(this.fillStyle) != 'undefined'){
      this.ctx.fillStyle = this.fillStyle;
    }
    if(typeof(this.strokeStyle) != 'undefined'){
      this.ctx.strokeStyle = this.strokeStyle;
    }
    if(typeof(this.weight) != 'undefined'){
      this.ctx.lineWidth = this.weight;
    }
    this.ctx.moveTo(this.x, this.y);
  }
}

module.exports = Drawable;
