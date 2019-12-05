const Line = require('../graphics/line.gfx.js');
const Rect = require('../graphics/rect.gfx.js');
const Button = require('../graphics/button.gfx.js');
const EventEmmiter = require('events');

class Interface extends EventEmmiter {
  constructor(ctx, options){
    super();

    this.ctx = ctx;

    // For lines, shapes, etc...
    this.graphics = {
      _count: 0
    };
    // For buttons
    this.buttons = {
      _count: 0
    };
    // For sliders
    this.sliders = {
      _count: 0
    };

    // Will hold refs to all objects
    this.children = [];

    if(typeof(options.styles) != 'undefined'){
      this.styles = options.styles
    } else {
      this.styles = {
        default: {
          strokeStyle: '#000',
          fillStyle: '#FFF',
          weight: 1
        }
      }
    }
    if(typeof(options.root) != 'undefined'){
      this.root = options.root;
    } else {
      this.root = { x: 0, y: 0 };
    }
    console.log(this);
  }

  newID(options, type){
    if(typeof(options.ID) == 'undefined'){
      if (type == 'line'){
        this.graphics._count++;
        return `line_${this.graphics._count}`;
      } else if (type == 'rect'){
        this.graphics._count++;
        return `rect_${this.graphics._count}`;
      } else if (type == 'button'){
        this.buttons._count++;
        return `button_${this.buttons._count}`;
      } else if (type == 'slider'){
        this.sliders._count++;
        return `sliders_${this.sliders._count}`;
      }
    } else {
      return options.ID;
    }
  }

  addRoot(options){
    if(typeof(options.root) != 'undefined'){
      options.root.x += this.root.x;
      options.root.y += this.root.y;
    } else {
      options.root = { x: 0, y: 0 };
    }
    return options;
  }

  addLine(options){
    options = this.addRoot(options);
    let line = new Line(this.ctx, options);
    this.children.push(line);
    line.ID = this.newID(options, 'line');
    this.graphics[line.ID] = line;
  }

  addRect(options){
    options = this.addRoot(options);
    let rect = new Rect(this.ctx, options);
    this.children.push(rect);
    rect.ID = this.newID(options, 'rect');
    this.graphics[rect.ID] = rect;
  }

  addButton(options){
    options = this.addRoot(options);
    let button = new Button(this.ctx, () => {
      console.log("Clicked");
    }, options);
    this.children.push(button);
    button.ID = this.newID(options, 'button');
    this.buttons[button.ID] = button;
  }

  addSlider(options){
    options = this.addRoot(options);
    let slider = new Slider(this.ctx, options);
    this.children.push(slider);
    slider.ID = this.newID(options, 'slider');
    this.sliders[slider.ID] = slider;
  }

  addStyle(styleName, style){
    this.styles[styleName] = style;
    for(let i = 0; i < this.children.length; i++){
      this.children[i].styles[styleName] = style;
    }
  }

  setStyle(styleName){
    for(let i = 0; i < this.children.length; i++){
      this.children[i].setStyle(styleName);
    }
  }

  test(pos){
    console.log(this.buttons);
    for(let button in this.buttons){
      if(button.test(pos)){
        self.emit('button', button.ID);
      }
    }
    for(let slider in this.sliders){
      if(slider.test(pos)){
        self.emit('slider', slider.ID);
      }
    }
  }

  draw(){
    for(let i = 0; i < this.children.length; i++){
      this.children[i].draw();
    }
  }
}

module.exports = Interface;
