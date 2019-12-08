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

let interface = new Interface(ctx, { root: { x: 0, y: 0 }});

interface.addLine({
  geometry: {
    x: 0, y: 0,
    x1: 100, y1: 100
  }
});

interface.addRect({
  geometry: {
    x: 100, y: 100,
    width: 50, height: 50
  }
});

interface.addButton({
  geometry: {
    x: 200, y: 100,
    width: 50, height: 50
  }, text: "Test!"
});

interface.registerEventListeners(canvas);
interface.on('button', (id) => {
  console.log(id);
});
interface.addStyle('clicked', {
  strokeStyle: '#000',
  fillStyle: '#888',
  weight: 1
});

setInterval(() => {
  interface.draw();
}, 30);
