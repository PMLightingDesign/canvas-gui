const fs = require('fs');

let sdl_window_opts = fs.readFileSync('../node_modules/native-canvas/dist/engine/sdl/sdl-window/');
let options = fs.readFileSync('../sdl-window-options.conf');
