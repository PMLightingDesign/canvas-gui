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
    let buttonPos = this.getCurrentGeometry();
    if(pos.x > buttonPos.x && pos.x < buttonPos.x1){
      if(pos.y > buttonPos.y && pos.y < buttonPos.y1){
        if(this.enabled && this.visible){
          this.callback(this);
        }
      }
    }
  }

  draw(){
    super.draw();
    let cx = this.geometry.x + this.root.x + (this.geometry.height / 2);
    let cy = this.geometry.y + this.root.y + (this.geometry.height / 2);
    this.ctx.moveTo(cx, cy);
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText(this.text, cx, cy);
    console.log(this);
  }
}

module.exports = Button;
