class MutexMenu {
  constructor(){
    this.menus = new Array();
    this.last = "none";
  }

  register(name, menu){
    this.menus.push({
      menu: menu,
      name: name
    });
  }

  activate(name){
    if(this.last != name){
      this.last = name;
      for(let i = 0; i < this.menus.length; i++){
        console.log(`name:${name} mname:${this.menus[i].name}`)
        if(name != "none" && name == this.menus[i].name){
          this.menus[i].menu.enable(true);
        } else {
          this.menus[i].menu.enable(false);
        }
      }
    } else {
      this.last = "none";
      this.clear();
    }
  }

  clear(){
    for(let i = 0; i < this.menus.length; i++){
      this.menus[i].menu.enable(false);
    }
    this.cleared = true;
  }
}

module.exports = MutexMenu;
