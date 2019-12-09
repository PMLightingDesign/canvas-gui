const Line = require('../graphics/line.gfx.js');
const Rect = require('../graphics/rect.gfx.js');
const Button = require('../graphics/button.gfx.js');
const Slider = require('../graphics/slider.gfx.js');
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
          strokeStyle: '#586e75',
          fillStyle: '#657b83',
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

  translateRoot(pos){
    this.root.x += pos.x;
    this.root.y += pos.y;
    for(let i = 0; i < this.children.length; i++){
      this.children[i].translateRoot(pos);
    }
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
      console.log(`${button.ID} clicked`);
      button.clickedStyle();
    }, options);
    this.children.push(button);
    button.ID = this.newID(options, 'button');
    this.buttons[button.ID] = button;
  }

  addSlider(options){
    options = this.addRoot(options);
    let slider = new Slider(this.ctx, () => {
      console.log("Useless doot");
    },options);
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
    for(let button in this.buttons){
      if(button != '_count' && this.buttons[button].test(pos)){
        this.emit('button', this.buttons[button].ID);
      }
    }
  }

  testSlider(pos){
    for(let slider in this.sliders){
      if(slider != '_count'){
        if(this.sliders[slider].test(pos)){
          this.emit('slider', {
            id: this.sliders[slider].ID,
            val: this.sliders[slider].val
          });
        }
      }
    }
  }

  startClick(evt){
    this.clickRunning = true;
    setTimeout(() => {
      if(!this.clickRunning){
        let clickPoint = {
          x: evt.clientX, y: evt.clientY
        }
        this.test(clickPoint);
      } else {
        this.mousePositionUpdater = setInterval(() => {
          this.testSlider(this.mousePos);
        }, 25);
      }
    }, 150);
  }

  registerEventListeners(canvas){
    canvas.addEventListener('mousedown', (evt) => {
      this.startClick(evt);
    });
    canvas.addEventListener('mouseup', (evt) => {
      this.clickRunning = false;
      clearInterval(this.mousePositionUpdater);
    });
    canvas.addEventListener('mousemove', (evt) => {
      this.mousePos = {
        x: evt.clientX, y: evt.clientY
      }
    });
    canvas.addEventListener('wheel', (evt) => {
      console.log(evt);
    });
  }

  draw(){
    for(let i = 0; i < this.children.length; i++){
      this.children[i].draw();
    }
  }
}

module.exports = Interface;
