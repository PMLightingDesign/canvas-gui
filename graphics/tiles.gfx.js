const Layout = require('./layout.gfx.js');
const Rectangle = require('./rect.gfx.js');

class TileLayout extends Layout {
  constructor(ctx, config, options){
    super(ctx, options);

    this.size = {};
    this.tile = {};

    this.padding = config.padding;
    this.size.width = config.width;
    this.size.height = config.height;
    this.size.baseY = config.height / 2;

    this.runs = config.runs;

    this.tile.width = this.getTileWidth();
    this.tile.height = Math.min(this.getTileHeight(), Math.floor(this.tile.width * 0.75));

    console.log(`Tile width:${this.tile.width} height:${this.tile.height}`);

    for(let i = 0; i < this.runs.length; i++){
      this.getRectangles(this.runs[i])
    }

  }

  getRectangles(run){
    let dx = this.tile.width;
    let dy = this.tile.height * run.direction;

    if(run.direction > 0){
      let x = this.padding + (run.id - 1) * this.tile.width;

      for(let i = 0; i < run.tiles; i++){
        let rect = new Rectangle(this.ctx, {
          id: `${run.id}:${i+1}`
        });
        let y = this.size.baseY + i * this.tile.height * run.direction;
        rect.dims({ x: x, y: y, dx: dx, dy: dy });
        this.children.push(rect);
      }

    } else {
      let x = this.padding + (run.id - 1 - this.widthTiles) * this.tile.width;

      for(let i = 0; i < run.tiles; i++){
        let rect = new Rectangle(this.ctx,{
          id: `${run.id}:${i+1}`
        });
        let y = this.size.baseY + i * this.tile.height * run.direction;
        rect.dims({ x: x, y: y, dx: dx, dy: dy });
        this.children.push(rect);
      }
    }
  }

  getTileHeight(){
    let halfY = this.size.baseY;

    let tallest = 0;

    for(let i = 0; i < this.runs.length; i++){
      if(this.runs[i].tiles > tallest){
        tallest = this.runs[i].tiles;
      }
    }

    console.log(`Tallest run is ${tallest} tiles`);

    return Math.round((halfY - this.padding) / tallest);
  }

  getTileWidth(){
    let wallCount = 0;
    let ceilingCount = 0;

    for(let i = 0; i < this.runs.length; i++){
      if(this.runs[i].direction > 0){
        wallCount++;
      } else {
        ceilingCount++;
      }
    }

    this.widthTiles = Math.max(wallCount, ceilingCount);
    console.log(`The system is ${this.widthTiles} wide`)

    return Math.abs(Math.round((this.size.width - this.padding*2) / Math.max(wallCount, ceilingCount)));
  }
}

module.exports = TileLayout;
