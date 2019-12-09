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
      if(typeof(options.text) != 'undefined'){
        this.text = options.text;
      } else {
        this.text = "Not Assigned";
      }
    } else {
      this.prefix = "";
      this.max = 1;
      this.min = 0;
      this.val = 0.5;
    }

    this.valueFill = new Rectangle(this.ctx, {
      style: {
        strokeStyle: '#073642',
        fillStyle: '#2aa198'
      },
      styles: {
        default: {
          strokeStyle: '#073642',
          fillStyle: '#2aa198'
        }
      },
      geometry: {
        x: this.geometry.x, y: this.geometry.y+this.geometry.height,
        width: this.geometry.width, height: -this.geometry.height/2
      }, root: this.root
    });

    this.children.push(this.valueFill);
  }

  test(pos){
    let buttonPos = this.getCurrentGeometry();
    if(pos.x > buttonPos.x && pos.x < buttonPos.x1){
      if(pos.y > buttonPos.y && pos.y < buttonPos.y1){
        if(this.enabled && this.visible){
          this.val = (buttonPos.y1 - pos.y) / (buttonPos.y1 - buttonPos.y) * (this.max - this.min)
          //console.log(this.val);
          return true;
        }
      } else if (pos.y >= buttonPos.y1 && pos.y < buttonPos.y1 + 12) {
        this.val = this.min+0;
        return true;
      } else if (pos.y <= buttonPos.y && pos.y > buttonPos.y - 12) {
        this.val = this.max+0;
      }
    }
    return false;
  }

  draw(){
    super.draw();
    this.valueFill.geometry.height = -((this.val / this.max) * this.geometry.height);
    this.drawChildren();
    if(this.text != ''){
      let cx = this.geometry.x + this.root.x + (this.geometry.width / 2);
      let cy = this.geometry.y + this.root.y - 12;
      this.ctx.moveTo(cx, cy);
      this.ctx.textAlign = "center"
      this.ctx.fillStyle = this.style.textColor;
      this.ctx.fillText(this.text, cx, cy);

      cy = this.geometry.y + this.root.y + this.geometry.height + 12;
      this.ctx.moveTo(cx, cy);
      this.ctx.textAlign = "center"
      this.ctx.fillStyle = this.style.textColor;
      this.ctx.fillText(`${parseInt(this.val / this.max * 100)} ${this.prefix}`, cx, cy);
    }
  }
}

module.exports = Slider;
