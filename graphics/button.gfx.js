const Rectangle = require('./rect.gfx.js');

class Button extends Rectangle {
  constructor(ctx, callback, options){
    super(ctx, options);
    this.callback = callback;
    this.enabled = true;

    // Draw text in the button if defined
    if(typeof(options) != 'undefined'){
      if(typeof(options.text) != 'undefined'){
        this.text = options.text;
      }
    }
  }

  test(pos){
    if(pos.x > this.x && pos.x < this.x1){
      if(pos.y > this.y && pos.y < this.y1){
        if(this.enabled){
          this.callback(this);
        }
      }
    }
  }

  draw(){
    super.draw();
    let cx = this.x + 8;
    let cy = this.y + ((this.y1-this.y) / 2);
    this.ctx.moveTo(cx, cy);
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText(this.text, cx, cy);
  }
}

module.exports = Button;
