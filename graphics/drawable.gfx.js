/* General purpose class for drawable objects

  This original system does not allow for the properties of drawable objects to
  easily be swapped. Ultimately, this library is meant for creating user
  interfaces, so having easily switchable states is important.

  Additionally, geometry data needs to be made more generic

*/

class Drawable {
  constructor(ctx, options){
    this.ctx = ctx;

    // This default will contain all of the possible style properties
    this.style = {
      fillStyle: '#000000',
      strokeStyle: '#FFFFFF',
      weight: '1px'
    }
    // This object will hold all of the possible styles
    this.styles = { default: this.style };

    // We are going to make geometry an object in itself
    this.geometry = {
      x: 0,
      y: 0
    }

    // We assign a root object for positioning
    this.root = {
      x: 0,
      y: 0
    }

    // Visibility, defaults to true
    this.visible = true;

    // Load the basic data about the object
    if(typeof(options) != 'undefined'){
      if(typeof(options.styles != 'undefined')){
        this.styles = options.styles;
      }
      if(typeof(options.geometry) != 'undefined'){
        this.geometry = options.geometry;
      }
      if(typeof(options.root) != 'undefined'){
        this.root = options.root;
      }
    }
  }

  // Sets style by key
  setStyle(style){
    this.style = this.styles[style];
  }

  // Useful for getting the prototypical geometry for this type
  getGeometry(){
    return JSON.parse(JSON.stringify(this.geometry))
  }

  // The parent class method should always be called
  draw(callback){
    this.ctx.fillStyle = this.style.fillStyle;
    this.ctx.strokeStyle = this.style.strokeStyle;
    this.ctx.lineWidth = this.style.weight;
    this.ctx.moveTo(this.geometry.x + this.root.x, this.geometry.y + this.root.y);
  }
}

module.exports = Drawable;
