const Rectangle = require('./rect.gfx.js');

class Slider extends Rectangle {
  constructor(ctx, callback, options){
    super(ctx, options);
    this.callback = callback;
    this.enabled = true;

    // Draw text in the button if defined
    if(typeof(options) != 'undefined'){
      if(typeof(options.prefix) != 'undefined'){
        this.prefix = options.prefix;
      }
      if(typeof(options.max) != 'undefined'){
        this.max = options.max;
      }
      if(typeof(options.prefix) != 'undefined'){
        this.min = options.min;
      }
      if(typeof(options.val) != 'undefined'){
        this.val = options.val;
      }
    } else {
      this.prefix = "";
      this.max = 1;
      this.min = 0;
      this.val = 0.5;
    }
  }

  test(pos){
    if(pos.x > this.x && pos.x < this.x1){
      if(pos.y > this.y && pos.y < this.y1){
        if(this.enabled){
          this.width = this.x1 - this.x;
          let p = (pos.x - this.x) / this.width;
          this.val = (p * (this.max - this.min));
          this.callback(this.val);
        }
      }
    }
  }

  draw(){
    super.draw();
    let cx = this.x;
    let cy = this.y - 12;
    this.ctx.moveTo(cx, cy);
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText(`${this.prefix}: ${this.val.toFixed(1).toString()}`, cx, cy);
    let p = this.val / this.max;
    this.ctx.moveTo(this.x + (p*(this.x1-this.x)), this.y);
    this.ctx.lineTo(this.x + (p*(this.x1-this.x)), this.y + (this.y1-this.y));
    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = "#fff";
    this.ctx.stroke();
    this.ctx.lineWidth = 1;
  }
}

module.exports = Slider;
