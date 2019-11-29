// Load the library
require('native-canvas');

const Line = require('./line.gfx.js');
const Rect = require('./rect.gfx.js');
const Button = require('./button.gfx.js');

// Title the title attribute
document.title = 'Test for Drawables';

// Provides the current running canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext("2d");

let line = new Line(ctx, {
  styles: {
    default: {
      strokeStyle: '#000000',
      weight: 5
    }
  },
  geometry: {
    x: 0, y: 0, x1: 50, y1: 50
  },
  root: {
    x: 0, y: 0
  }
});

let rect = new Rect(ctx, {
  styles: {
    default: {
      strokeStyle: '#000000',
      fillStyle: '#FF00FF',
      weight: 5
    }
  },
  geometry: {
    x: 0, y: 0, width: 50, height: 50
  },
  root: {
    x: 0, y: 0
  }
});

let button = new Button(ctx, () => {
  console.log("Doot!");
}, {
  styles: {
    default: {
      strokeStyle: '#000000',
      fillStyle: '#FF00FF',
      weight: 5
    }
  },
  geometry: {
    x: 0, y: 0, width: 50, height: 50
  },
  root: {
    x: 75, y: 75
  },
  text: "Test!"
});

rect.setStyle('default');
rect.draw();

line.setStyle('default');
line.draw();

button.setStyle('default');
button.draw();

canvas.addEventListener('click', (evt) => {
  let clickPoint = {
    x: evt.clientX, y: evt.clientY
  }
  button.test(clickPoint);
});
