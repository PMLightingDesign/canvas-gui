global.GLOAL_WINDOW_OPTS = { title: '',
     width: 1280,
     height: 720,
     x: 805240832,
     y: 805240832,
     closable: true,
     fullscreen: false,
     show: true,
     resizable: false,
     borderless: true,
     minimized: false,
     allowHighDPI: false,
     grabInputFocus: false,
     fitCanvasInWindow: true,
     scaleCanvasToWindowSize: true }


// Load the library
require('native-canvas');

const Interface = require('./interface.js');

// Title the title attribute
document.title = 'Test for Drawables';

// Provides the current running canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext("2d");

let styles = {
  default: {
    strokeStyle: '#073642',
    fillStyle: '#93a1a1',
    textColor: '#fdf6e3',
    weight: 1
  }, clicked: {
    strokeStyle: '#073642',
    fillStyle: '#fdf6e3',
    textColor: '#073642',
    weight: 2
  }
}

let style = {
  strokeStyle: '#073642',
  fillStyle: '#93a1a1',
  weight: 1
}

let interface = new Interface(ctx, {
  style: style,
  styles: styles,
  root: { x: 0, y: 0 }
});

interface.addLine({
  geometry: {
    x: 0, y: 0,
    x1: 100, y1: 100
  }, style: style, styles: styles
});

interface.addRect({
  geometry: {
    x: 100, y: 100,
    width: 50, height: 50
  }, style: style, styles: styles
});

interface.addButton({
  geometry: {
    x: 200, y: 100,
    width: 50, height: 50
  }, text: "Test!",
  style: style, styles: styles
});

interface.addSlider({
  geometry: {
    x: 300, y: 100,
    width: 50, height: 200
  }, text: "Test!",
  style: style, styles: styles,
  prefix: "%",
  max: 1,
  min: 0,
  val: 0.5,
  text: 'Zone 1'
});

interface.registerEventListeners(canvas);
interface.on('button', (id) => {
  if(id == 'button_1'){
    console.log('doot');
    interface.translateRoot({x: 5, y: 0});
  }
});
interface.on('slider', (info) => {
  console.log(info);
});
interface.setStyle('default');

setInterval(() => {
  ctx.fillStyle = '#002b36'
  ctx.fillRect(0,0, canvas.width, canvas.height);
  interface.draw();
}, 30);
